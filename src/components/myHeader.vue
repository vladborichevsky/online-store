<template>
  <header class="relative w-full h-fit bg-white flex flex-col items-center">
    <!-- Затемнение фона. отображается только на мобильной версии -->
    <div 
      v-show="hamburgerIsOpen" 
      @click="toggleMenu"
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300">
    </div>
    <!-- Затемнение фона. отображается только на мобильной версии -->

    <!-- "Гамбургер" / Меню. отображается только на мобильной версии -->
    <aside v-show="hamburgerIsOpen"
      class="fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 p-6">
      <nav class="relative h-3/4 flex flex-col justify-around items-center">
        <my-header-btns-block
          @closeHamburger="toggleMenu"/>
      </nav>

      <div class="mt-10">
        <a href="tel:8-981-265-34-18" class="text-base">8-981-265-34-18</a>
        <div class="mt-2 text-xs">Звоните c 8:00 до 19:00 каждый день</div>
      </div>
    </aside>
    <!-- "Гамбургер" / Меню. отображается только на мобильной версии -->

    <div ref="targetElement" class="hidden w-4/5 mx-auto my-2 justify-between items-center md:w-3/5 xl:w-2/5 sm:flex">
      <my-header-btns-block/>
    </div>

    <div
      v-if="!hamburgerIsOpen"
      :class="{ 'top-0': !isVisible, 'top-8': isVisible, 'mt-2': isVisible }" 
      class="w-full fixed bg-white border-b-2 border-border_color sm:py-1">
        <div class="w-full flex flex-col mx-auto justify-around items-center sm:flex-row">
          <div class="w-full mt-3 flex flex-row justify-between sm:justify-center">
            <img 
                src="/logo.webp"
                @click="[$router.push('/'), clearSearchInput()]"
                class="w-12 p-1 cursor-pointer sm:hidden"
                alt="logo">

            <div class="relative flex">
              <SearchInput/>

              <dropdown-list
                v-if="searchInput.length > 0 && currentPage != '/' && showDropdownList"
                class="w-[130%] absolute top-12 left-[-15%] z-10 sm:left-0 lg:w-full"/>
            </div>

            <div class="hidden w-fit flex-col justify-center items-start pt-1 ml-1 text-xs sm:flex sm:pt-0 md:ml-2.5">
              <label class="cursor-pointer">
                <input
                  @click="changeSearchByVar('paintings')" 
                  :checked="searchBy === 'paintings'"
                  type="radio">
                    Поиск по названию картины
              </label>

              <label class="cursor-pointer">
                <input 
                  @click="changeSearchByVar('authors')"
                  :checked="searchBy === 'authors'"
                  type="radio">
                  Поиск по автору
              </label>
            </div>
              <!-- Кнопка "гамбургера" -->
              <button @click="[toggleMenu(), clearSearchInput()]" class="mr-2 sm:hidden">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <!-- Кнопка "гамбургера" -->
          </div>

          <div class="flex w-full justify-around items-center sm:w-80">
            <div title="c 8:00 до 19:00 каждый день">
              <a href="tel:8-981-265-34-18" class="text-sm md:text-base" >8-981-265-34-18</a>
            </div>
            
            <div 
              class="relative w-12 h-12 p-2.5 cursor-pointer rounded-full border-2 border-white sm:w-14 sm:h-14 lg:hover:bg-border_color lg:hover:border-border_color" title="Корзина">
              <img 
                @click="[$router.push('/shopping_cart'), clearSearchInput()]"
                class="w-fit"
                src="/shopping_cart.svg" alt="shopping cart">
              
              <div
                v-if="shoppingCart?.length > 0" 
                class="absolute right-0 top-0 w-4 h-4 flex justify-center items-center rounded-full bg-blue-700 text-sm text-white sm:text-lg sm:w-5 sm:h-5 sm:-right-1 sm:-top-1">
                {{ shoppingCart.length }}
              </div>
            </div>
          </div>
        </div>
    </div>
  </header>
</template>


<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue"
  import type { Ref } from "vue"

  import SearchInput from "@/components/UI/SearchInput.vue"
  import dropdownList from "@/components/dropdownList.vue"
  import myHeaderBtnsBlock from "@/components/myHeaderBtnsBlock.vue"

  import { useStore } from '@/stores/index'

  const store = useStore()

  const searchBy = computed(() => store.searchBy)
  const changeSearchByVar = computed(() => store.changeSearchByVar)
  const searchInput = computed(() => store.searchInput)
  const clearSearchInput = computed(() => store.clearSearchInput)
  const currentPage = computed(() => store.currentPage)
  const shoppingCart = computed(() => store.shoppingCart)
  const showDropdownList = computed(() => store.showDropdownList)


  // код для "гамбургера"
  const hamburgerIsOpen = ref(false)   // переменная, отвечающая за открытие "гамбургера"

  // функция, переключающая ситимость "гамбургера"
  const toggleMenu = () => {
    hamburgerIsOpen.value = !hamburgerIsOpen.value
  }

  watch(hamburgerIsOpen, (isOpen) => { // если на мобильной версии открыто меню гамбургера, то скролл на странице становится невозможным
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  })

  onBeforeUnmount(() => {
    document.body.style.overflow = '' // убираем слежение за меню гамбургера (скролл)
  })
  // код для "гамбургера"


  // код, чтобы при скролле убирался верхний ряд хедера
  const isVisible = ref(true)
  const targetElement: Ref<HTMLDivElement | null> = ref(null)

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      isVisible.value = entry.isIntersecting
    })
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    })

    if (targetElement.value) {
      observer.observe(targetElement.value)
    }
  })

  onBeforeUnmount(() => {
    if (observer && targetElement.value) {
      observer.unobserve(targetElement.value)
      observer.disconnect()
    }
  })
  // код, чтобы при скролле убирался верхний ряд хедера
</script>