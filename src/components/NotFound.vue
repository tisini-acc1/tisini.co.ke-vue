<template>
    <main>
      <!-- Error page for any page not matching -->
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold text-gray-800">404</h1>
        <h2 class="text-2xl font-bold text-gray-600">Page not found</h2>
        <p class="text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <router-link
          :to="{ name: 'landing' }"
          class="mt-4 px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700"
          >Go back home</router-link
        >
      </div>
    </main>
  </template>
  