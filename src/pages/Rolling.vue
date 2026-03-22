<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <div class="px-8 pt-12 pb-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="font-body text-gray-400 text-sm">{{ rollStepText }}</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col items-center justify-center px-8">
      <!-- Dice Visualization -->
      <div class="relative mb-12">
        <Dice :isRolling="store.rolling" :face="store.currentDiceFace" />
      </div>

      <!-- Status Display -->
      <div class="w-full max-w-xs">
        <transition name="scale" mode="out-in">
          <!-- Category Revealed -->
          <div
            v-if="!store.rolling && store.rollStage === 'category'"
            class="text-center"
          >
            <div class="clay-card rounded-2xl p-6 mb-4">
              <CategoryIcon
                :icon-name="store.currentCategory?.icon || 'sparkles'"
                :size="48"
                class="mx-auto mb-3 text-gray-900"
              />
              <p class="font-body text-gray-900 text-sm mb-1">已选定</p>
              <p class="font-display text-2xl text-gray-900 font-bold">{{ store.currentCategory?.name }}</p>
            </div>
            <p class="font-body text-gray-400 text-sm">准备揭晓具体活动...</p>
          </div>

          <!-- Activity Revealed -->
          <div
            v-else-if="!store.rolling && store.rollStage === 'activity'"
            class="text-center"
          >
            <div class="clay-card rounded-2xl p-6 mb-4">
              <div class="flex items-center justify-center gap-3 mb-3">
                <CategoryIcon
                  :icon-name="store.currentCategory?.icon || 'sparkles'"
                  :size="32"
                  class="text-gray-500"
                />
                <span class="text-gray-300">→</span>
                <CategoryIcon
                  :icon-name="store.currentActivity?.icon || 'sparkles'"
                  :size="40"
                  class="text-gray-900"
                />
              </div>
              <p class="font-body text-gray-500 text-sm mb-1">{{ store.currentCategory?.name }}</p>
              <p class="font-display text-2xl text-gray-900 font-bold">{{ store.currentActivity?.name }}</p>
            </div>
            <p class="font-body text-gray-900 text-sm">即将揭晓最终结果...</p>
          </div>

          <!-- Rolling State -->
          <div v-else class="text-center py-8">
            <p class="font-display text-2xl text-gray-900 font-bold">
              {{ currentLoadingText }}
            </p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="px-8 pb-8 pt-4">
      <transition name="fade">
        <div v-if="!store.rolling && store.rollStage === 'category'" class="space-y-3">
          <div class="flex gap-3">
            <button
              @click="store.rollCategory()"
              class="flex-1 btn-secondary py-4 rounded-xl font-body font-medium"
            >
              <span class="flex items-center justify-center gap-2">
                <RefreshCw class="w-4 h-4" />
                重新掷
              </span>
            </button>
            <button
              @click="goToPreview"
              class="flex-1 py-4 rounded-xl font-body font-medium bg-[#c9b8a8] text-white"
            >
              继续
            </button>
          </div>
        </div>

        <div v-else-if="!store.rolling && store.rollStage === 'activity'" class="space-y-3">
          <div class="flex gap-3">
            <button
              @click="store.rollActivity()"
              class="flex-1 btn-secondary py-4 rounded-xl font-body font-medium"
            >
              <span class="flex items-center justify-center gap-2">
                <RefreshCw class="w-4 h-4" />
                重新掷
              </span>
            </button>
            <button
              @click="router.push('/result')"
              class="flex-1 py-4 rounded-xl font-body font-medium bg-[#c9b8a8] text-white"
            >
              查看结果
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../store/game';
import { loadingTexts } from '../data/activities';
import { RefreshCw } from 'lucide-vue-next';
import Dice from '../components/Dice.vue';
import CategoryIcon from '../components/CategoryIcon.vue';

const router = useRouter();
const store = useGameStore();
const currentLoadingText = ref(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);

const goToPreview = () => {
  router.push('/preview');
};

const rollStepText = computed(() => {
  if (store.rollStage === 'category') return '第一步：选大类';
  if (store.rollStage === 'activity') return '第二步：选活动';
  return '正在准备...';
});

onMounted(() => {
  if (store.rollStage === 'idle') {
    store.rollCategory();
  } else if (store.rollStage === 'category' && store.currentCategory && !store.rolling) {
    store.rollActivity();
  }
});

watch(() => store.rolling, (isRolling) => {
  if (!isRolling) {
    currentLoadingText.value = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
  }
});
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
