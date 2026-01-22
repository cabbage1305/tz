<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const rules = [(value) => checkApi(value)];
const rulesc = [(value) => checkApiC(value)];
const loading = ref(false);
const articleName = ref("");
const articleContent = ref("");
const router = useRouter();

async function submit(event) {
  try {
    loading.value = true;
    const results = await event;

    if (results.valid) {
      const response = await axios.post("http://localhost:3000/article", {
        name: articleName.value,
        content: articleContent.value,
      });
      router.push(`/article/${response.data.id}`);
    }
  } finally {
    loading.value = false;
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
  <v-card height="50">
    <v-toolbar
      class="text-white"
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title>
        <v-btn variant="plain" :ripple="false" to="/">Articles</v-btn>
      </v-toolbar-title>
    </v-toolbar>
  </v-card>
  <v-sheet class="mx-auto" max-width="300">
    <v-form validate-on="submit lazy" @submit.prevent="submit">
      <v-text-field
        :rules="rules"
        v-model="articleName"
        label="Article name"
      ></v-text-field>

      <v-text-field
        v-model="articleContent"
        :rules="rulesc"
        label="Article content"
      ></v-text-field>

      <v-btn
        :loading="loading"
        class="mt-2"
        text="Submit"
        type="submit"
        block
      ></v-btn>
    </v-form>
  </v-sheet>
</template>
