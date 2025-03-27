<template>
  <div class="relative">
    <input 
      v-model="value"
      @focus="updateCurrentPage" 
      @blur="hideDropdownList(lastClickedElement)"  
      class="text-xs h-12 w-48 border-2 px-2.5 pr-10 focus:outline-none active:outline-none xs:w-64 sm:w-48 md:text-sm lg:w-80 lg:text-base xl:w-96" 
      type="text" 
      :placeholder="placeholderValue"
      :title="titleValue">

    <div class="absolute top-3 right-4 sm:hidden" ref="dropdown"> 
      <img @click="toggleSetSearch" src="/set_search.svg" alt="setting search" class="w-6">
      <!-- выпадающий список выбора поиска "по автору" или по "названию картины". отображается только на мобильной версии -->
      <div
        v-if="setSearchIsOpen"
        class="absolute top-[150%] right-[-65%] w-40 z-10">
          <button
            @click="[changeSearchByVar('paintings'), toggleSetSearch()]" 
            class="block w-full px-1 py-2 text-left text-xs bg-main_color text-white">
            По названию картины
          </button>
          <button
            @click="[changeSearchByVar('authors'), toggleSetSearch()]" 
            class="block w-full px-1 py-2 text-left text-xs bg-main_color text-white">
            По автору
          </button>
      </div>
      <!-- выпадающий список выбора поиска "по автору" или по "названию картины". отображается только на мобильной версии -->
    </div>

    <div class="hidden absolute top-3 sm:right-1 sm:block">
      <img class="w-6" src="/search_glass.svg" alt="">
    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { useStore } from '@/stores/index'

  const store = useStore()

  const searchBy = computed(() => store.searchBy)
  const hideDropdownList = computed(() => store.hideDropdownList)
  const updateCurrentPage = computed(() => store.updateCurrentPage)
  const changeSearchByVar = computed(() => store.changeSearchByVar)

  const value = computed({
    get: () => store.searchInput,
    set: (newValue: string) => store.setSearchInputValue(newValue)
  })
   
  const placeholderValue = computed(() => searchBy.value === 'paintings' ? 'Название картины' : 'Имя автора')
  const titleValue = computed(() => searchBy.value === 'paintings' ? 'Введите название картины' : 'Введите имя автора')


  // код для работы выпадающего списка выбора поиска "по автору" или по "названию картины". отображается только на мобильной версии
  const setSearchIsOpen = ref(false) // переменная, которая отвечает за показ выпадающего списка выбора поиска "по автору" или по "названию картины". отображается только на мобильной версии.
  const dropdown = ref<HTMLElement | null>(null) // ref-ссылка на иконку с выпадающим списком и сам выпадающий список. Нужна, чтобы отслеживать клик в другую область экрана и закрывать выпадающий список. отображается только на мобильной версии.

  const toggleSetSearch = () => {
    setSearchIsOpen.value = !setSearchIsOpen.value
  }

  const closeDropdown = (event: MouseEvent) => {
    if (dropdown.value && !dropdown.value.contains(event.target as Node)) setSearchIsOpen.value = false
  }

  onMounted(() => { // следим за кликами. Если выпадающий список выбора поиска "по автору" или по "названию картины" открыт и был произведён клик в другую область экрана, то выпадающий список будет закрыт
    document.addEventListener('click', closeDropdown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown) // убираем слежение за кликами
  })
  // код для работы выпадающего списка выбора поиска "по автору" или по "названию картины". отображается только на мобильной версии


  // код, который отслеживает, на какой элемент было нажатие, что фокус ушёл с Input'a
  const lastClickedElement = ref<HTMLElement | null>(null);

  const saveClickedElement = (event: MouseEvent) => {
    lastClickedElement.value = event.target as HTMLElement
  };

  onMounted(() => {
    document.addEventListener("mousedown", saveClickedElement);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousedown", saveClickedElement);
  });
  // код, который отслеживает, на какой элемент было нажатие, что фокус ушёл с Input'a
</script>










