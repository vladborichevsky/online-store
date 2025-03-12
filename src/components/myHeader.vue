<template>
  <header class="relative w-full h-fit bg-white flex flex-col items-center">
    <div ref="targetElement" class="w-2/5 mx-auto my-2 flex justify-between items-center">
      <my-header-btn @click="routerPush('/')">
        Каталог
      </my-header-btn>

      <my-header-btn @click="routerPush('/delivery')">
        Доставка и оплата
      </my-header-btn>

      <my-header-btn @click="routerPush('/contacts')">
        Контакты
      </my-header-btn>

      <my-header-btn @click="routerPush('/about')">
        О компании
      </my-header-btn>
    </div>

    <div 
      :class="{ 'top-0': !isVisible, 'top-8': isVisible, 'mt-2': isVisible }" 
      class="fixed w-full py-1 bg-white border-b-2 border-border_color">
        <div class="flex mx-auto w-[1050px] justify-between items-center">
          <div class="flex">
            <div class="relative">
              <SearchInput/>

              <dropdown-list
                v-if="searchInput.length > 0 && currentPage != '/' && showDropdownList"
                class="w-full absolute"/>
            </div>

            <div class="ml-2.5 w-fit flex flex-col justify-center items-start text-xs">
              <label class="cursor-pointer">
                <input type="radio" :checked="searchBy === 'paintings'" @click="changeSearchByVar('paintings')">
                  Поиск по названию картины
              </label>

              <label class="cursor-pointer">
                <input type="radio" :checked="searchBy === 'authors'" @click="changeSearchByVar('authors')">
                  Поиск по автору
              </label>
            </div>
          </div>

          <div title="c 8:00 до 19:00 каждый день">
            <a href="tel:8-981-265-34-18" class="" >8-981-265-34-18</a>
          </div>
          
          <div 
            class="relative w-14 h-14 p-2.5 cursor-pointer rounded-full border-2 border-white hover:bg-border_color hover:border-border_color" title="Корзина">
            <img 
              @click="$router.push('/shopping_cart')"
              class="w-fit"
              src="/shopping_cart.svg" alt="shopping cart">
            
            <div
              v-if="shoppingCart?.length > 0" 
              class="absolute -right-1 -top-1 w-5 h-5 flex justify-center items-center rounded-full bg-blue-700 text-lg text-white">
              {{ shoppingCart.length }}
            </div>
          </div>
        </div>
    </div>
  </header>
</template>


<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import type { Ref } from "vue"
  import { useRouter } from 'vue-router'

  const router = useRouter()

  import MyHeaderBtn from "@/components/UI/MyHeaderBtn.vue";
  import SearchInput from "@/components/UI/SearchInput.vue";
  import dropdownList from "@/components/dropdownList.vue";

  import { useStore } from '@/stores/index'

  const store = useStore()

  const searchBy = computed(() => store.searchBy)
  const changeSearchByVar = computed(() => store.changeSearchByVar)
  const searchInput = computed(() => store.searchInput)
  const currentPage = computed(() => store.currentPage)
  const shoppingCart = computed(() => store.shoppingCart)
  const showDropdownList = computed(() => store.showDropdownList)

  const routerPush = async (path: string) => {
    await router.push(path) 
  }

  // код, чтобы при скролле убирался верхний ряд хедера
  const isVisible = ref(true)
  const targetElement: Ref<HTMLDivElement | null> = ref(null)

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      isVisible.value = entry.isIntersecting;
    });
  };

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    if (targetElement.value) {
      observer.observe(targetElement.value);
    }
  });

  onUnmounted(() => {
    if (observer && targetElement.value) {
      observer.unobserve(targetElement.value);
      observer.disconnect();
    }
  });
  // код, чтобы при скролле убирался верхний ряд хедера
</script>