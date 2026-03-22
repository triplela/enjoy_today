<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <div class="px-8 pt-12 pb-6">
      <div class="flex items-center gap-2 mb-4">
        <span class="font-body text-gray-400 text-sm">{{ subtitle }}</span>
      </div>
      <h2 class="font-display text-3xl font-bold text-gray-900">{{ title }}</h2>
    </div>

    <!-- Candidates List -->
    <div class="flex-1 px-8 overflow-y-auto">
      <div class="space-y-3 mb-6">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 min-w-0"
        >
          <CategoryIcon
            :icon-name="item.icon"
            :size="24"
            class="text-gray-900 flex-shrink-0"
          />
          <div class="flex flex-col min-w-0">
            <span class="font-body text-base text-gray-900 truncate">{{ item.name }}</span>
            <span v-if="item.subtitle" class="font-body text-sm text-gray-500 truncate">{{ item.subtitle }}</span>
          </div>
        </div>
      </div>

      <button
        @click="refresh"
        class="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-body text-sm mb-8"
      >
        <RefreshCw class="w-4 h-4" />
        换一批
      </button>
    </div>

    <!-- Action Area -->
    <div class="px-8 pb-8 pt-4 border-t border-gray-100">
      <button
        @click="startCountdown"
        :disabled="counting"
        class="w-full py-5 rounded-xl font-body font-medium text-lg"
        :class="counting ? 'bg-gray-100 text-gray-400' : 'bg-[#c9b8a8] text-white'"
      >
        <template v-if="!counting">
          <span class="flex items-center justify-center gap-2">
            <Timer class="w-5 h-5" />
            {{ actionText }}
          </span>
        </template>
        <template v-else>
          <span class="font-display text-3xl font-bold">{{ countdown }}</span>
        </template>
      </button>

      <button
        @click="router.push('/options')"
        class="w-full mt-3 py-3 text-gray-400 hover:text-gray-900 transition-colors font-body text-sm"
      >
        重新选择条件
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../store/game';
import {
  RefreshCw,
  Timer
} from 'lucide-vue-next';
import CategoryIcon from '../components/CategoryIcon.vue';

const router = useRouter();
const store = useGameStore();

const counting = ref(false);
const countdown = ref(3);
let countdownTimer: ReturnType<typeof setInterval> | null = null;

const isCategoryStage = computed(() => store.rollStage === 'idle');

const title = computed(() => isCategoryStage.value ? '想玩哪类？' : '具体做点啥？');
const subtitle = computed(() => isCategoryStage.value ? '第一步' : '第二步');
const actionText = computed(() => isCategoryStage.value ? '就这样，开始选' : '锁定，准备揭晓');

const items = computed(() => {
  if (isCategoryStage.value) {
    return store.candidateCategories.map(category => ({
      name: category.name,
      subtitle: category.subtitle,
      icon: category.icon
    }));
  }
  return store.candidateActivities.map(activity => ({
    name: activity.name,
    subtitle: '',
    icon: activity.icon || 'sparkles'
  }));
});

const refresh = () => {
  if (isCategoryStage.value) {
    store.refreshCandidateCategories();
  } else {
    store.refreshCandidateActivities();
  }
};

const startCountdown = () => {
  counting.value = true;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
      router.push('/rolling');
    }
  }, 1000);
};

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
});

onMounted(() => {
  if (isCategoryStage.value && store.candidateCategories.length === 0) {
    store.refreshCandidateCategories();
  } else if (!isCategoryStage.value && store.candidateActivities.length === 0) {
    store.refreshCandidateActivities();
  }
});
</script>
