<template>
  <my-header/>
  <router-view></router-view>
</template>


<script setup lang="ts">
  import { useStore } from '@/stores/index'

  import myHeader from "@/components/myHeader.vue";

  const store = useStore()

  store.updateProductArray() // загружаем список товаров
  store.updShoppingCartFromLocalStorage() // проверяем корзину из local storage
</script>

