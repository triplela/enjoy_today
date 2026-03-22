<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <div class="px-8 pt-12 pb-4">
      <div class="flex items-center gap-2">
        <span class="font-body text-gray-400 text-sm">今天的主意</span>
      </div>
    </div>

    <!-- Result Content -->
    <div class="flex-1 px-8 flex flex-col">
      <!-- Category -->
      <div class="mb-8">
        <p class="font-body text-gray-400 text-sm mb-3">类别</p>
        <div class="flex items-center gap-3">
          <CategoryIcon
            :icon-name="store.currentCategory?.icon || 'sparkles'"
            :size="32"
            class="text-gray-900"
          />
          <h1 class="font-display text-4xl text-gray-900 font-bold leading-tight break-words">
            {{ store.currentCategory?.name }}
          </h1>
        </div>
      </div>

      <!-- Activity -->
      <div class="flex-1 flex flex-col">
        <p class="font-body text-gray-400 text-sm mb-3">具体活动</p>
        <div class="flex items-center gap-3 mb-6 animate-pop">
          <CategoryIcon
            :icon-name="store.currentActivity?.icon || 'sparkles'"
            :size="32"
            class="text-gray-900"
          />
          <h1 class="font-display text-4xl text-gray-900 font-bold leading-tight break-words">
            {{ store.currentActivity?.name }}
          </h1>
        </div>

        <!-- Apps -->
        <div v-if="store.currentActivity?.apps" class="flex flex-wrap gap-2">
          <span
            v-for="app in store.currentActivity?.apps"
            :key="app"
            class="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-body text-sm truncate max-w-[150px]"
          >
            {{ app }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="px-8 pb-8 pt-4 border-t border-gray-100">
      <button
        @click="home"
        class="w-full py-5 rounded-xl font-body font-medium text-lg mb-3 bg-accent text-white"
      >
        <span class="flex items-center justify-center gap-2">
          <Check class="w-5 h-5" />
          就这么定了
        </span>
      </button>

      <div class="flex gap-3">
        <button
          @click="reroll"
          class="flex-1 btn-secondary py-4 rounded-xl font-body font-medium"
        >
          <span class="flex items-center justify-center gap-2">
            <RefreshCw class="w-4 h-4" />
            再看看
          </span>
        </button>
        <button
          @click="router.push('/options')"
          class="flex-1 btn-secondary py-4 rounded-xl font-body font-medium"
        >
          <span class="flex items-center justify-center gap-2">
            <ArrowLeft class="w-4 h-4" />
            换个方向
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../store/game';
import { Check, RefreshCw, ArrowLeft } from 'lucide-vue-next';
import CategoryIcon from '../components/CategoryIcon.vue';

const router = useRouter();
const store = useGameStore();

// Guard: Redirect if no activity is selected
onMounted(() => {
  if (!store.currentActivity || !store.currentCategory) {
    router.replace('/');
  }
});

const reroll = () => {
  store.refreshCandidateActivities();
  router.push('/preview');
};

const home = () => {
  router.push('/');
};
</script>
