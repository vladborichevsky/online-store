<template>
  <div class="mx-auto flex w-3/4 items-center justify-center text-xs xs:justify-start">
    <img v-if="!nightMode" src="/sort_by.svg" alt="sort by" class="h-4 w-4" />
    <img v-else src="/sort_by_white.svg" alt="sort by" class="h-4 w-4" />

    <select
      v-model="sortBy"
      class="custom-select ml-1 w-select_options cursor-pointer bg-white pl-1 text-blue-700 focus:border-transparent focus:outline-none active:border-transparent active:outline-none"
    >
      <option class="bg-main_color text-white" value="byPopularity" selected>
        По популярности
      </option>
      <option class="bg-main_color text-white" value="byPaintingName">По названию картины</option>
      <option class="bg-main_color text-white" value="ByAuthorName">По имени автора</option>
      <option class="bg-main_color text-white" value="byDecreasingPrice">По убыванию цены</option>
      <option class="bg-main_color text-white" value="byIncreasePrice">По возрастанию цены</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/index'

const store = useStore()

const sortBy = computed({
  get: () => store.sortBy,
  set: (newValue: string) => store.changeSortByVar(newValue),
})

const nightMode = computed(() => store.nightMode)
</script>

<style scoped>
.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
