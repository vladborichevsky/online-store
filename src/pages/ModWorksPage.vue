<template>
  <div class="mt-32 sm:mt-20">
    <h1 class="mt-5 text-base font-bold sm:text-xl lg:text-2xl">Современные произведения</h1>

    <sort-by-block />

    <div class="mt-5 grid grid-cols-2 place-items-center justify-self-center pb-6 sm:grid-cols-3">
      <transition-group name="product-list">
        <product-card
          v-for="(item, index) in slicedModernProdArray"
          :array="slicedModernProdArray"
          :key="index"
          :index="index"
        />
      </transition-group>
    </div>

    <div v-show="modernProdArray?.length === 0" class="text-center">Ничего не найдено...</div>

    <pagination-block v-show="modernProdArray && modernProdArray?.length > numbOfProdPerPage" />

    <div
      @click="router.push('/catalog')"
      class="mb-5 cursor-pointer text-center text-xs font-semibold hover:underline sm:text-xl"
    >
      Посмотреть весь каталог
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

import sortByBlock from '@/components/sortByBlock.vue'
import productCard from '@/components/productCard.vue'
import paginationBlock from '@/components/paginationBlock.vue'

const numbOfProdPerPage = computed(() => store.numbOfProdPerPage)
const pageNumber = computed(() => store.pageNumber * numbOfProdPerPage.value)
const modernProdArray = computed(() => store.modernProdArray)
const slicedModernProdArray = computed(() =>
  modernProdArray.value.slice(0, pageNumber.value * numbOfProdPerPage.value)
)
</script>
