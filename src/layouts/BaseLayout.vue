<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const {hasBg} = defineProps({
  hasBg: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
    <main
      :class="{
        'bg-gray-100': hasBg,
        'bg-white': !hasBg
      }"
    >
      <Header />
      <div class="max-w-7xl mx-auto min-h-screen ">
        <router-view />
      </div>
      <Footer />
    </main>
  </template>