<template>
  <div class="mt-20">
    <h1 class="mt-5 text-2xl font-bold">Реплики всемирно известных картин</h1>

    <div class="w-3/4 mx-auto flex items-center text-xs">
      <div>
        Сортировка:
      </div>
      <select v-model="sortBy" class="custom-select cursor-pointer px-2 w-select_options text-blue-700 focus:outline-none active:outline-none focus:border-transparent active:border-transparent">
        <option class="bg-main_color text-white" value="byPopularity" selected>По популярности</option>
        <option class="bg-main_color text-white" value="byPaintingName">По названию картины</option>
        <option class="bg-main_color text-white" value="ByAuthorName">По имени автора</option>
        <option class="bg-main_color text-white" value="byDecreasingPrice">По убыванию цены</option>
        <option class="bg-main_color text-white" value="byIncreasePrice">По возрастанию цены</option>
      </select>
    </div>

    <div class="mt-5 pb-6 grid grid-cols-3 justify-self-center"> 
      <transition-group name="product-list">
        <product-card
          v-for="(item, index) in filteredProductArray?.slice(0, pageNumber)"
          :key="index"
          :index="index"/>
      </transition-group>    
    </div>
    
    <div v-show="filteredProductArray?.length === 0" class="text-center">
      Ничего не найдено...
    </div>

    <pagination-block
      v-show="filteredProductArray && filteredProductArray?.length > 9"/>
  </div>
</template>


<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@/stores/index'

  import productCard from "@/components/productCard.vue";
  import paginationBlock from "@/components/paginationBlock.vue";

  const store = useStore()

  const filteredProductArray = computed(() => store.filteredProductArray)
  const pageNumber = computed(() => store.pageNumber * 9)

  const sortBy = computed({
    get: () => store.sortBy,
    set: (newValue: string) => store.changeSortByVar(newValue)
  })
</script>


<style scoped>
  .custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  .product-list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .product-list-enter-active,
  .product-list-leave-active {
    transition: all 1s ease;
  }

  .product-list-enter-from,
  .product-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>