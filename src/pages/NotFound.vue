<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 text-center">
    <h1 class="font-display text-8xl font-bold text-gray-200 mb-4">404</h1>
    <h2 class="font-display text-2xl font-bold text-gray-900 mb-2">页面不存在</h2>
    <p class="font-body text-gray-500 mb-6">你找的页面好像去流浪了...</p>
    <router-link
      to="/"
      class="px-6 py-3 bg-accent text-white rounded-xl font-body font-medium hover:bg-[#b5a598] transition-colors"
    >
      返回首页
    </router-link>
  </div>
</template>

<script setup lang="ts">
</script>