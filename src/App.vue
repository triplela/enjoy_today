<template>
  <div class="app-container">
    <!-- Error State -->
    <div v-if="hasError" class="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div class="text-6xl mb-4">😵</div>
      <h1 class="font-display text-2xl font-bold text-gray-900 mb-2">哎呀，出了点问题</h1>
      <p class="font-body text-gray-500 mb-6">应用程序遇到了意外错误</p>
      <button
        @click="resetError"
        class="px-6 py-3 bg-gray-900 text-white rounded-xl font-body font-medium hover:bg-gray-800 transition-colors"
      >
        重新开始
      </button>
    </div>
    <!-- Main Content -->
    <div v-else class="relative z-10 min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, onMounted } from 'vue';

const hasError = ref(false);

onErrorCaptured((error: Error) => {
  console.error('Application error:', error);
  hasError.value = true;
  return false; // Prevent the error from propagating further
});

const resetError = () => {
  hasError.value = false;
  window.location.href = '/';
};

// Hide loading spinner once Vue is mounted
onMounted(() => {
  const loader = document.getElementById('app-loading');
  if (loader) loader.style.display = 'none';
});
</script>

<style>
/* App Container - Minimalist */
.app-container {
  max-width: 448px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  background: #ffffff;
  overflow: hidden;
}

/* Tablet and larger: Center with breathing room */
@media (min-width: 768px) {
  .app-container {
    max-width: 480px;
    margin: 24px auto;
    min-height: calc(100vh - 48px);
    border-radius: 16px;
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
}

/* Desktop: More polish */
@media (min-width: 1024px) {
  .app-container {
    max-width: 480px;
    margin: 32px auto;
    min-height: calc(100vh - 64px);
    border-radius: 20px;
  }
}

/* Landscape mobile: Full width */
@media (max-height: 500px) and (orientation: landscape) {
  .app-container {
    margin: 0 auto;
    min-height: 100vh;
    border-radius: 0;
    max-width: 100%;
  }
}

/* Fade Transition - Clean and minimal */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Global Styles */
body {
  background: #f3f4f6;
  -webkit-tap-highlight-color: transparent;
}

/* Touch-friendly improvements */
@media (hover: none) and (pointer: coarse) {
  .btn-primary,
  .btn-secondary,
  .btn-select {
    min-height: 48px;
  }
}

/* Desktop hover states */
@media (hover: hover) and (pointer: fine) {
  .clay-card:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
}

/* Scrollbar - Minimal */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}

/* Hide scrollbar on mobile */
@media (max-width: 767px) {
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}
</style>
