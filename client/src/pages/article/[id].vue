<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
let prevController = null;
const article = ref(); //{title: 'Article123', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat nemo eveniet odit laborum, illum reprehenderit officia a et corporis esse commodi sapiente veritatis aliquid ipsum sint nihil eius quam veniam.'}
const route = useRoute();
const router = useRouter();
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (prevController != null) {
      prevController.abort();
    }
    prevController = new AbortController();
    article.value = null;
    console.log(newId);
    const response = await axios.get(`http://localhost:3000/article/${newId}`, {
      signal: prevController.signal,
    });
    console.log(response);
    article.value = response.data;
  },
  { immediate: true },
);

async function deleteArticle() {
  await axios.delete(`http://localhost:3000/article/${route.params.id}`);
  router.push(`/`);
}
</script>

<template>
  <v-card height="50">
    <v-toolbar
      class="text-white"
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title>
        <v-btn variant="plain" :ripple="false" to="/">Articles</v-btn>
      </v-toolbar-title>

      <v-btn to="/article/create">Создать статью</v-btn>
    </v-toolbar>
  </v-card>

  <v-card v-if="article" height="200">
    <v-card-item>
      <v-card-title>
        {{ article.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ article.createdAt }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ article.content }}
    </v-card-text>
    <v-card-actions>
      <v-btn> Редактировать статью </v-btn>
      <v-btn> Комментарии</v-btn>
      <v-btn @click="deleteArticle"> Удалить статью</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
