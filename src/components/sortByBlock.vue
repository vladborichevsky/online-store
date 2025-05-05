<template>
  <div class="w-3/4 mx-auto flex items-center justify-center text-xs xs:justify-start">
    <img src="/sort_by.svg" alt="sort by" class="w-4 h-4">
    <select v-model="sortBy" class="custom-select w-select_options cursor-pointer pl-1 bg-white  text-blue-700 focus:outline-none active:outline-none focus:border-transparent active:border-transparent">
      <option class="bg-main_color text-white" value="byPopularity" selected>По популярности</option>
      <option class="bg-main_color text-white" value="byPaintingName">По названию картины</option>
      <option class="bg-main_color text-white" value="ByAuthorName">По имени автора</option>
      <option class="bg-main_color text-white" value="byDecreasingPrice">По убыванию цены</option>
      <option class="bg-main_color text-white" value="byIncreasePrice">По возрастанию цены</option>
    </select>
  </div>
</template>


<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@/stores/index'

  const store = useStore()

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
</style>