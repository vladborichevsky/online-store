<template>
  <!-- крестик закрытия бокового меню. отображается только на мобильной версии -->
  <button @click="closeHamburger" class="absolute right-0 top-0 sm:hidden">
    <svg
      class="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
  <!-- крестик закрытия бокового меню. отображается только на мобильной версии -->

  <!-- лого. отображается на планшетном и выше разрешении -->
  <img
    src="/logo.webp"
    @click="[routerPush('/'), closeHamburger(), clearSearchInput()]"
    class="w-24 cursor-pointer p-1 sm:absolute sm:left-0 sm:top-0 sm:z-10 sm:block sm:w-14 md:w-16 lg:w-24 xl:w-28 xl:p-2"
    alt="logo"
  />
  <!-- лого. отображается на планшетном и выше разрешении -->

  <my-header-btn @click="[routerPush('/'), closeHamburger(), clearSearchInput()]">
    Главная
  </my-header-btn>

  <my-header-btn @click="[routerPush('/catalog'), closeHamburger(), clearSearchInput()]">
    Каталог
  </my-header-btn>

  <my-header-btn @click="[routerPush('/delivery'), closeHamburger(), clearSearchInput()]">
    Доставка и оплата
  </my-header-btn>

  <my-header-btn @click="[routerPush('/contacts'), closeHamburger(), clearSearchInput()]">
    Контакты
  </my-header-btn>

  <my-header-btn @click="[routerPush('/about'), closeHamburger(), clearSearchInput()]">
    О нас
  </my-header-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import MyHeaderBtn from '@/components/UI/MyHeaderBtn.vue'

import { useStore } from '@/stores/index'

const store = useStore()

const emit = defineEmits(['closeHamburger'])

const router = useRouter()

const clearSearchInput = computed(() => store.clearSearchInput)

const routerPush = (path: string) => {
  router.push(path)
}

const closeHamburger = () => {
  emit('closeHamburger')
}
</script>
