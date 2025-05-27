<template>
  <button
    class="h-8 w-20 cursor-pointer border-2 bg-inherit px-1 text-xs text-main_color hover:text-white md:w-24 md:text-sm lg:h-12 lg:w-40 lg:px-1 lg:py-1 lg:text-base xl:h-12"
    :class="[
      nightMode
        ? 'border-white text-white hover:bg-main_color'
        : 'border-main_color hover:bg-main_color_light',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/index'

const store = useStore()

const nightMode = computed(() => store.nightMode)
</script>
