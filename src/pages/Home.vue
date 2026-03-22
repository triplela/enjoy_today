<template>
  <div class="min-h-screen px-8 py-12 relative bg-white flex flex-col">
    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <div class="mb-16">
        <h1 class="font-display text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          今天<br />玩啥？
        </h1>
      </div>

      <!-- Value Prop -->
      <div class="mb-12 max-w-xs">
        <p class="font-body text-gray-600 text-lg leading-relaxed">
          好不容易休息一天<br />
          <span class="text-gray-900 font-medium">做点有意思的吧</span>
        </p>
      </div>

      <!-- CTA Button -->
      <div class="animate-fade-in-up opacity-0">
        <button
          @click="$router.push('/options')"
          class="py-5 px-10 rounded-xl text-lg bg-[#c9b8a8] text-white font-medium"
        >
          <span class="flex items-center gap-3">
            <Compass class="w-6 h-6" />
            找找灵感
          </span>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="pt-8">
      <p class="font-body text-gray-400 text-xs">放松一天 · 享受生活</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Compass } from 'lucide-vue-next';
import { useGameStore } from '../store/game';
import { onMounted } from 'vue';

const store = useGameStore();
onMounted(() => {
  store.reset();
});
</script>
