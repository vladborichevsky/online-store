<template>
  <div class="relative">
    <input 
      v-if="searchBy === 'paintings'"
      v-model="value"
      @focus="updateCurrentPage" 
      @blur="hideDropdownList(lastClickedElement)"  
      class="h-12 w-96 border-2 px-2.5 pr-7 focus:outline-none active:outline-none focus:border-transparent active:border-transparent" 
      type="text" 
      placeholder="Введите название картины">

    <input 
      v-if="searchBy === 'authors'" 
      v-model="value" 
      @focus="updateCurrentPage" 
      @blur="hideDropdownList(lastClickedElement)"  
      class="h-12 w-96 border-2 px-2.5 pr-7" 
      type="text" 
      placeholder="Введите автора">

    <span class="absolute top-3 right-1">
      <img class="w-6" src="/search_glass.svg" alt="">
    </span>
  </div>
</template>


<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useStore } from '@/stores/index'

  const store = useStore()

  const searchBy = computed(() => store.searchBy)
  const hideDropdownList = computed(() => store.hideDropdownList)
  const updateCurrentPage = computed(() => store.updateCurrentPage)

  const value = computed({
    get: () => store.searchInput,
    set: (newValue: string) => store.setSearchInputValue(newValue)
  })

  // код, который отслеживает, на какой элемент было нажатие, что фокус ушёл с Input'a
  const lastClickedElement = ref<HTMLElement | null>(null);

  const saveClickedElement = (event: MouseEvent) => {
    lastClickedElement.value = event.target as HTMLElement
  };

  onMounted(() => {
    document.addEventListener("mousedown", saveClickedElement);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", saveClickedElement);
  });
  // код, который отслеживает, на какой элемент было нажатие, что фокус ушёл с Input'a
</script>










