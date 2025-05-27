<template>
  <div
    class="flex min-h-screen flex-col"
    :class="{
      'bg-main_color_light': nightMode,
      'text-white': nightMode,
      'text-main_color': !nightMode,
    }"
  >
    <my-header />

    <main>
      <router-view class="flex-1"> </router-view>
    </main>

    <my-footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/index'

import myHeader from '@/components/myHeader.vue'
import myFooter from '@/components/myFooter.vue'

const store = useStore()

const nightMode = computed(() => store.nightMode)

store.updateProductArray() // загружаем список товаров
store.updShoppingCartFromLocalStorage() // проверяем корзину из local storage
store.setNightModeFromLocalStorrage() // проверяем "ночной режим" из local storage
</script>
