<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const articles = ref();
const articleWithComments = ref();
const dateFrom = ref();
const dateTo = ref();

onMounted(async () => {
  const response = await axios.get("http://localhost:3000/articles");
  console.log(response.data.result);
  articles.value = response.data.result;
});

async function getcomments() {
  const response = await axios.get("http://localhost:3000/analytic/comments/", {
    params: {
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
    },
  });
  articleWithComments.value = response.data.result;
}
</script>

<template>
  <v-toolbar
    height="50"
    class="text-white"
    image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-toolbar-title>
      <v-btn variant="plain" :ripple="false" to="/">Articles</v-btn>
    </v-toolbar-title>

    <v-btn to="/article/create">Создать статью</v-btn>
  </v-toolbar>

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

  <div class="d-flex ga-4 pa-4">
    Отобразить комментарии за период
    <input type="date" v-model="dateFrom" />
    <input type="date" v-model="dateTo" />
    <v-btn @click="getcomments">Показать комментарии</v-btn>
  </div>
  <div class="d-flex flex-column ga-4">
    <v-card v-for="item in articleWithComments">
      <v-card-title>{{ item.name }}</v-card-title>
      <v-list lines="one">
        <v-list-item class="ml-6" v-for="comment in item.comments">
          <template v-slot:prepend>
            <v-icon icon="mdi-account"></v-icon>
          </template>
          <v-list-item-title>
            {{ comment.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
