<script setup></script>
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
  <div
    class="mx-auto d-flex flex-column ga-6 justify-center align-center text-h2 font-weight-bold"
    style="height: 370px; width: 940px"
  >
    404, Страница не найдена
    <v-btn to="/">Вернуться на главную</v-btn>
  </div>
</template>
