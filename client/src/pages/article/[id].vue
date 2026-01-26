<script setup>
import axios from "axios";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
let articleController = null;
let commentsController = null;
/**@type {import('vue').Ref<{name: string; content: string}>} */ //to do learn jsdoc
const article = ref();
const route = useRoute();
const router = useRouter();
const reveal = ref(false);
const articleName = ref("");
const articleContent = ref("");
const rules = [(value) => validateName(value)];
const rulesc = [(value) => validateContent(value)];
const loading = ref(false);
/**@type {import('vue').Ref<{text: string; createdAt: string}[]>}*/
const comments = ref([]);
const commentText = ref("");
const commentTextr = ref("");
const commentId = ref();
const commentsort = computed(() =>
  comments.value.toSorted(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  ),
);
// запрос на вывод одной статьи по id
watch(
  () => route.params.id,
  (newId, oldId) => {
    getArticle(newId);
    getComments(newId);
  },
  { immediate: true },
);
async function getArticle(newId) {
  if (articleController != null) {
    articleController.abort();
  }
  articleController = new AbortController();
  article.value = null;

  try {
    loading.value = true;

    const response = await axios.get(`http://localhost:3000/article/${newId}`, {
      signal: articleController.signal,
    });
    article.value = response.data;
  } finally {
    loading.value = false;
  }
}
async function getComments(newId) {
  if (commentsController != null) {
    commentsController.abort();
  }
  commentsController = new AbortController();
  comments.value = [];

  try {
    loading.value = true;

    const response = await axios.get(
      `http://localhost:3000/article/${newId}/comments`,
      {
        signal: commentsController.signal,
      },
    );
    comments.value = response.data.result;
  } finally {
    loading.value = false;
  }
}

// запрос на удаление
async function deleteArticle() {
  await axios.delete(`http://localhost:3000/article/${route.params.id}`);
  router.push(`/`);
}

async function deleteComment(id) {
  await axios.delete(
    `http://localhost:3000/article/${route.params.id}/comment/${id}`,
  );
  getComments(route.params.id);
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
async function updateComment(event, id) {
  const results = await event;
  if (results.valid) {
    await axios.patch(
      `http://localhost:3000/article/${route.params.id}/comment/${id}`,
      {
        text: commentTextr.value,
      },
    );
    commentId.value = null;
    getComments(route.params.id);
  }
}

function validateName(articleName) {
  if (!articleName) return "Please enter article name.";
  return true;
}

function validateContent(articleContent) {
  if (!articleContent) return "Please enter article content.";
  return true;
}

async function createComment(event) {
  const results = await event;

  if (results.valid) {
    await axios.post(
      `http://localhost:3000/article/${route.params.id}/comment`,
      {
        text: commentText.value,
      },
    );
    getComments(route.params.id);
    commentText.value = "";
  }
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

  <v-list>
    <v-list-item v-for="item in commentsort">
      <template v-slot:prepend>
        <v-icon icon="mdi-account"></v-icon>
      </template>

      <v-list-item-title v-text="item.text"></v-list-item-title>

      <template v-slot:append>
        <v-btn
          @click="
            commentId = item.id;
            commentTextr = item.text;
          "
          icon="mdi-comment-edit"
        ></v-btn>
        <v-btn @click="deleteComment(item.id)" icon="mdi-trash-can"></v-btn>
      </template>

      <v-form
        v-if="commentId == item.id"
        @submit.prevent="updateComment($event, item.id)"
      >
        <v-text-field v-model="commentTextr" label="Изменить комментарий">
        </v-text-field>

        <v-btn @click="commentId = null" text="Закрыть" variant="text"></v-btn>
        <v-btn
          :disabled="commentTextr == ''"
          type="submit"
          text="Сохранить изменения"
        ></v-btn>
      </v-form>
    </v-list-item>
  </v-list>
  <v-sheet class="mx-auto" width="100%">
    <v-form @submit.prevent="createComment">
      <v-textarea v-model="commentText" label="Комментировать"></v-textarea>

      <div class="d-flex justify-end">
        <v-btn :disabled="commentText == ''" type="submit"
          >Оставить комментарий</v-btn
        >
      </div>
    </v-form>
  </v-sheet>
</template>
