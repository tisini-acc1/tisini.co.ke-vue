<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ArticleInterface } from "@/types";
import { getArticles } from "@/api/requests/blogs";
import { useToast } from "vue-toast-notification";
import articles from "@/data/articles";
import Loader from "@/components/Loader.vue";
import stripHtmlTags from "@/utils/stripHtmlTags";
const router = useRouter();
const toast = useToast();
const fImage = (id: number) => {
  return id
    ? `https://picsum.photos/id/${id}/600/600`
    : "https://picsum.photos/id/30/600/600";
};
const posts = ref<ArticleInterface[]>([]);
const readMore = (id: number) => {
  router.push({ path: `/article/${id}` });
};
const isLoading = ref<boolean>(false);

onMounted(() => {
  const loadArticles = () => {
    isLoading.value = true;
    getArticles((data: any, err: any) => {
      if (err) {
        // console.log({ err });
        toast.error("Something went wrong", {
          position: "top-right",
        });
        isLoading.value = false;
        posts.value = articles;
        return;
      } else {
        // console.log({ data });
        posts.value =
          (data as ArticleInterface[]).length > 0
            ? (data as ArticleInterface[])
            : articles;
      }
      isLoading.value = false;
    });
  };
  Promise.allSettled([loadArticles()]);
});
</script>

<template>
  <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-2 p-2">
    <Loader :is-loading="isLoading" />
    <div v-for="(article, index) in posts" :key="article.id" class="p-2">
      <div class="flex flex-col rounded-lg overflow-hidden shadow-lg">
        <img
          alt="gallery"
          class="w-full h-64 object-cover object-center"
          :src="article.featured_image?? fImage(index*1+10)!"
        />
        <div class="px-6 py-4">
          <h2
            class="tracking-widest text-xs title-font font-medium text-blue-700 mb-1"
          >
            {{ article.article_title }}
          </h2>
          <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
            {{ stripHtmlTags(article.excerpt!) }}
          </h1>
          <!-- <p class="leading-relaxed">{{ article.article_body }}</p> -->
          <router-link :to="{name:'single-blog',params:{slug:article.slug}}"
            class="flex items-center mt-2 text-blue-500"
          >
            Read More
            <span class="w-4 h-4 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
