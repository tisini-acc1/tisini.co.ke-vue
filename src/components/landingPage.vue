<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { ArticleInterface } from "@/types";
const router = useRouter();
const fImage = (id: number) => {
  return id
    ? `https://picsum.photos/id/${id}/600/600`
    : "https://picsum.photos/id/30/600/600";
};
const posts = ref<ArticleInterface[]>([
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
  {
    article_title: "Article Title",
    featured_image: "https://picsum.photos/id/7/600/600",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    article_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    id: 1,
    author: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      author_email: "some@gmail.com",
    },
    publish: "2021-09-09T12:00:00.000000Z",
    tags: ["tag1", "tag2"],
    is_editors_pick: true,
    is_featured: true,
    is_sponsored: true,
    slug: "article-title",
    article_category: {
      id: 1,
      article_category: "category1",
    },
  },
]);
const readMore = (id: number) => {
  router.push({ path: `/article/${id}` });
};
</script>

<template>
  <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-2 p-2">
    <div v-for="(article, index) in posts" :key="article.id" class="p-2">
      <div class="flex flex-col rounded-lg overflow-hidden shadow-lg">
        <img
          alt="gallery"
          class="w-full h-64 object-cover object-center"
          :src="fImage(index*1+10)!"
        />
        <div class="px-6 py-4">
          <h2
            class="tracking-widest text-xs title-font font-medium text-blue-700 mb-1"
          >
            {{ article.article_title }}
          </h2>
          <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
            {{ article.excerpt }}
          </h1>
          <!-- <p class="leading-relaxed">{{ article.article_body }}</p> -->
          <a
            class="flex items-center mt-2 text-blue-500"
            @click="readMore(article.id)"
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
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
