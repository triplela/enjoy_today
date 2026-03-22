<template>
  <div class="scene w-36 h-36 mx-auto perspective-1000">
    <div
      :class="['dice w-full h-full relative transition-transform duration-[1.5s] cubic-bezier(0.4, 0, 0.2, 1) transform-style-3d', isRolling ? 'animate-roll' : '']"
      :style="diceStyle"
    >
      <div
        v-for="face in faces"
        :key="face.id"
        :class="['face absolute w-full h-full flex items-center justify-center overflow-hidden', face.class]"
      >
        <!-- Simple Face -->
        <div class="absolute inset-0 dice-face rounded-2xl"></div>

        <!-- Number -->
        <span class="relative z-10 text-[#c9b8a8] text-7xl font-bold">{{ face.id }}</span>
      </div>
    </div>

    <!-- Shadow -->
    <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900/10 rounded-full blur-xl animate-shadow"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  isRolling: boolean;
  face: number;
}>();

const faces = [
  { id: 1, class: 'front' },
  { id: 2, class: 'back' },
  { id: 3, class: 'right' },
  { id: 4, class: 'left' },
  { id: 5, class: 'top' },
  { id: 6, class: 'bottom' },
];

const diceStyle = computed(() => {
  if (props.isRolling) return {};

  const rotations: Record<number, string> = {
    1: 'rotateY(0deg)',
    2: 'rotateY(180deg)',
    3: 'rotateY(-90deg)',
    4: 'rotateY(90deg)',
    5: 'rotateX(-90deg)',
    6: 'rotateX(90deg)'
  };

  return {
    transform: rotations[props.face] || 'rotateY(0deg)'
  };
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.dice-face {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.face {
  backface-visibility: hidden;
}

.face.front  { transform: rotateY(0deg) translateZ(4.5rem); }
.face.back   { transform: rotateY(180deg) translateZ(4.5rem); }
.face.right  { transform: rotateY(90deg) translateZ(4.5rem); }
.face.left   { transform: rotateY(-90deg) translateZ(4.5rem); }
.face.top    { transform: rotateX(90deg) translateZ(4.5rem); }
.face.bottom { transform: rotateX(-90deg) translateZ(4.5rem); }

@keyframes roll {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(720deg) rotateY(1080deg) rotateZ(360deg); }
}

@keyframes shadow-pulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0.05;
  }
}

.animate-roll {
  animation: roll 1.5s infinite linear;
}

.animate-shadow {
  animation: shadow-pulse 1.5s ease-in-out;
}

.animate-roll ~ .animate-shadow {
  animation: shadow-pulse 1.5s ease-in-out;
}
</style>
