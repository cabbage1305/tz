<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
let prevController = null;
/**@type {import('vue').Ref<{name: string; content: string}>} */ //to do learn jsdoc
const article = ref();
const route = useRoute();
const router = useRouter();
const reveal = ref(false);
const articleName = ref("");
const articleContent = ref("");
const rules = [(value) => checkApi(value)];
const rulesc = [(value) => checkApiC(value)];
const loading = ref(false);

// запрос на вывод одной статьи по id
watch(
  () => route.params.id,
  async (newId, oldId) => {
    await getArticle(newId);
  },
  { immediate: true },
);
async function getArticle(newId) {
  if (prevController != null) {
    prevController.abort();
  }
  prevController = new AbortController();
  article.value = null;
  console.log(newId);
  try {
    loading.value = true;

    const response = await axios.get(`http://localhost:3000/article/${newId}`, {
      signal: prevController.signal,
    });
    article.value = response.data;
  } finally {
    loading.value = false;
  }
}

// запрос на удаление
async function deleteArticle() {
  await axios.delete(`http://localhost:3000/article/${route.params.id}`);
  router.push(`/`);
}
// запрос на редактирование
async function updateArticle(event) {
  const results = await event;
  if (results.valid) {
    await axios.patch(`http://localhost:3000/article/${route.params.id}`, {
      name: articleName.value,
      content: articleContent.value,
    });
    reveal.value = false;
    getArticle(route.params.id);
  }
}

function checkApi(articleName) {
  if (!articleName) return "Please enter article name.";
  return true;
}

function checkApiC(articleContent) {
  if (!articleContent) return "Please enter article content.";
  return true;
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

  <v-card v-if="article && loading == false" height="200">
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
      <v-btn
        @click="
          reveal = true;
          articleName = article.name;
          articleContent = article.content;
        "
        text="Редактировать"
        variant="text"
      ></v-btn>
      <v-btn> Комментарии</v-btn>
      <v-btn @click="deleteArticle"> Удалить статью</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-form validate-on="submit lazy" @submit.prevent="updateArticle($event)">
        <v-card
          v-if="reveal"
          class="position-absolute w-100"
          height="200"
          style="bottom: 0"
        >
          <div>
            <v-text-field
              v-model="articleName"
              :rules="rules"
              hide-details="auto"
              label="Изменить название"
            ></v-text-field>
            <v-text-field
              v-model="articleContent"
              :rules="rulesc"
              label="Изменить содержание"
            ></v-text-field>
          </div>
          <v-card-actions class="pt-0">
            <v-btn
              @click="reveal = false"
              text="Закрыть"
              variant="text"
            ></v-btn>
            <v-btn type="submit" text="Сохранить изменения"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-expand-transition>
  </v-card>
  <div v-else-if="loading == true">loading...</div>
  <div v-else>
    <div
      class="mx-auto d-flex flex-column ga-6 justify-center align-center text-h2 font-weight-bold"
      style="height: 370px; width: 940px"
    >
      404, Статья не найдена
      <v-btn to="/">Вернуться на главную</v-btn>
    </div>
  </div>
</template>
