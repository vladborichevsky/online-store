<template>
  <div class="min-h-screen flex flex-col">
    <my-header/>
    <router-view class="flex-1"></router-view>
    <my-footer/>
  </div>
</template>


<script setup lang="ts">
  import { useStore } from '@/stores/index'

  import myHeader from "@/components/myHeader.vue";
  import myFooter from "@/components/myFooter.vue";

  const store = useStore()

  store.updateProductArray() // загружаем список товаров
  store.updShoppingCartFromLocalStorage() // проверяем корзину из local storage
</script>

