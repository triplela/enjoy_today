<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <div class="px-8 pt-12 pb-6">
      <button
        @click="$router.push('/')"
        class="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-body text-sm mb-6"
      >
        <ArrowLeft class="w-4 h-4" />
        返回
      </button>

      <h2 class="font-display text-3xl font-bold text-gray-900 mb-2">
        今天什么安排？
      </h2>
      <p class="font-body text-gray-500 text-sm">
        选一下基本情况，我帮你想想
      </p>
    </div>

    <!-- Questions Container -->
    <div class="flex-1 px-8 space-y-8">
      <!-- Question 1: People -->
      <div class="animate-fade-in-up opacity-0">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <Users class="w-5 h-5 text-gray-900" />
          </div>
          <p class="font-body text-gray-900 text-lg font-medium">几个人玩？</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="opt in peopleOptions"
            :key="opt.id"
            @click="people = opt.id"
            :class="[
              'btn-select p-4 rounded-xl text-base font-body transition-all duration-200',
              people === opt.id ? 'active' : ''
            ]"
          >
            <div class="flex flex-col items-center gap-2">
              <component :is="opt.iconComponent" class="w-6 h-6" />
              <span>{{ opt.label }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Question 2: Location -->
      <div class="animate-fade-in-up opacity-0 stagger-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <MapPin class="w-5 h-5 text-gray-900" />
          </div>
          <p class="font-body text-gray-900 text-lg font-medium">想出门吗？</p>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="opt in goOutOptions"
            :key="opt.id"
            @click="goOut = opt.id"
            :class="[
              'btn-select p-4 rounded-xl text-sm font-body transition-all duration-200',
              goOut === opt.id ? 'active' : ''
            ]"
          >
            <div class="flex flex-col items-center gap-2">
              <component :is="opt.iconComponent" class="w-5 h-5" />
              <span>{{ opt.label }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="px-8 pb-8 pt-4 border-t border-gray-100">
      <button
        @click="startRolling"
        :disabled="!isReady"
        :aria-disabled="!isReady"
        class="w-full py-5 px-8 rounded-xl text-lg font-body font-medium transition-all duration-200 disabled:cursor-not-allowed"
        :class="isReady ? 'bg-[#c9b8a8] text-white' : 'bg-[#e6ddd3] text-gray-900'"
      >
        <span class="flex items-center justify-center gap-2">
          <Sparkles v-if="isReady" class="w-5 h-5" />
          {{ isReady ? '开始推荐' : '请先选择' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../store/game';
import {
  ArrowLeft,
  Users,
  User,
  UserPlus,
  UsersRound,
  Phone,
  MapPin,
  DoorOpen,
  Home,
  HelpingHand,
  Sparkles
} from 'lucide-vue-next';

const router = useRouter();
const store = useGameStore();

const people = ref('');
const goOut = ref('');

const peopleOptions = [
  { id: 'solo', label: '就我自己', iconComponent: User },
  { id: 'small', label: '两三个人', iconComponent: UserPlus },
  { id: 'group', label: '一大群人', iconComponent: UsersRound },
  { id: 'any', label: '看情况', iconComponent: Phone },
];

const goOutOptions = [
  { id: 'outdoor', label: '出门', iconComponent: DoorOpen },
  { id: 'indoor', label: '宅家', iconComponent: Home },
  { id: 'both', label: '都行', iconComponent: HelpingHand },
];

const isReady = computed(() => people.value && goOut.value);

const startRolling = () => {
  store.setOptions(people.value, goOut.value);
  router.push('/preview');
};
</script>
