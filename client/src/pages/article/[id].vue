<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
let prevController = null;
const article = ref() //{title: 'Article123', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat nemo eveniet odit laborum, illum reprehenderit officia a et corporis esse commodi sapiente veritatis aliquid ipsum sint nihil eius quam veniam.'}
const route = useRoute()
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (prevController != null){
      prevController.abort();
    }
    prevController = new AbortController();
    article.value = null;
    console.log(newId)
    const response = await axios.get(`http://localhost:3000/article/${newId}`, {
      signal: prevController.signal,
    })
    console.log(response)
    article.value = response.data
  },
  {immediate: true}
)
//onMounted(async () => {
/*setTimeout(async() => {
           console.log(route.params.id);
            const response = await axios.get('http://localhost:3000/article/123')
        console.log(response);
        article.value = response.data;
        }, 5000)*/
//})
</script>

<template>
  <div>{{ route.params.id }}</div>
  <div class="about" v-if="article">
    <h1>{{ article.title }}</h1>
    <p>{{ article.text }}</p>
  </div>
  <div v-else>
    <p>WHAT ARE YOU WAITING FOR????</p>
  </div>
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
