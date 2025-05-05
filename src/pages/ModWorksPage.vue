<template>
  <div class="mt-32 sm:mt-20">
    <div class="text-base mt-5 font-bold sm:text-xl lg:text-2xl">Современные произведения</div>

    <sort-by-block/>

    <div class="mt-5 pb-6 grid grid-cols-2 justify-self-center place-items-center sm:grid-cols-3" > 
      <transition-group name="product-list">
        <product-card
          v-for="(item, index) in slicedModernProdArray"
          :array="slicedModernProdArray"
          :key="index"
          :index="index"/>
      </transition-group>    
    </div>
    
    <div v-show="modernProdArray?.length === 0" class="text-center">
      Ничего не найдено...
    </div>

    <pagination-block
      v-show="modernProdArray && modernProdArray?.length > numbOfProdPerPage"/>

    <div 
      @click="router.push('/catalog')"
      class="text-main_color text-xs font-semibold text-center mb-5 cursor-pointer sm:text-xl hover:underline">
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

  import sortByBlock from "@/components/sortByBlock.vue";
  import productCard from "@/components/productCard.vue";
  import paginationBlock from "@/components/paginationBlock.vue";

  const numbOfProdPerPage = computed(()=> store.numbOfProdPerPage)
  const pageNumber = computed(() => store.pageNumber * numbOfProdPerPage.value)
  const modernProdArray = computed(() => store.modernProdArray)
  const slicedModernProdArray = computed(() => modernProdArray.value.slice(0, pageNumber.value * numbOfProdPerPage.value))
</script>