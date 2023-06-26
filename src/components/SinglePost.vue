<script setup lang="ts">
import { getSingleArticle } from "@/api/requests/blogs";
import { ArticleInterface } from "@/types";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "./Loader.vue";
const article = ref<ArticleInterface>({} as ArticleInterface);
const loading = ref<boolean>(true);
const router = useRouter();
const slug = router.currentRoute.value.params.slug;
const error = ref<boolean>(false);

const getArticle = async () => {
  try {
    loading.value = true;
    const data = (await getSingleArticle(slug as string)) as any;
    article.value = data;
    loading.value = false;
  } catch (error: any) {
    console.log(error);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getArticle();
});
</script>

<template>
  <main>
    <loader :is-loading="loading" />
    <div
      v-if="!loading && error"
      class="flex flex-col items-center justify-center h-screen"
    >
      <h1 class="text-2xl font-bold">Something went wrong</h1>
      <button
        @click="getArticle"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Try again
      </button>
    </div>
    <div v-if="!loading && !error" class="p-2">
      <div class="flex flex-col rounded-lg overflow-hidden shadow-lg">
        <img
          alt="gallery"
          class="w-full h-96 object-contain object-center"
          :src="article.featured_image!"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ article.article_title }}</div>
          <div
            class="text-gray-700 text-base"
            v-html="article.article_body"
          ></div>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            v-for="(tag, index) in article.tags"
            :key="index"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
/* style almost like markdown */
h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
}
h4 {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
h5 {
  font-size: 0.75rem;
  font-weight: 300;
  margin-bottom: 1rem;
}
h6 {
  font-size: 0.5rem;
  font-weight: 200;
  margin-bottom: 1rem;
}
p {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

/* style for code block */
pre {
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
code {
  font-size: 0.75rem;
  font-weight: 300;
  margin-bottom: 1rem;
}

/* style for inline code */
.inline-code {
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-bottom: 1rem;
}

/* style for blockquote */
blockquote {
  border-left: 0.25rem solid #f5f5f5;
  padding-left: 1rem;
  margin-bottom: 1rem;
}

/* style for image */
img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  /* border-collapse: collapse; */
  margin-bottom: 1rem;
  border: 2px solid #f5f5f5;
}
p {
  color: red;
}
</style>
