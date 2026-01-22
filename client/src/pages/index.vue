<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const articles = ref();
onMounted(async () => {
  const response = await axios.get("http://localhost:3000/articles");
  console.log(response.data.result);
  articles.value = response.data.result;
});
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
  <div class="d-flex flex-column ga-2">
    <v-card
      v-for="item in articles"
      :to="`/article/${item.id}`"
      class="mx"
      max-width="1200"
      link
    >
      <v-card-item>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-subtitle>
          {{ item.createdAt }}
        </v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>
