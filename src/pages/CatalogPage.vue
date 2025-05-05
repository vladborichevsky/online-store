<template>
  <div class="mt-32 sm:mt-20">
    <div class="text-base mt-5 font-bold sm:text-xl lg:text-2xl">Каталог</div>

    <sort-by-block/>

    <div class="mt-5 pb-6 grid grid-cols-2 justify-self-center place-items-center sm:grid-cols-3"> 
      <transition-group name="product-list">
        <product-card
          v-for="(item, index) in filteredProductArray?.slice(0, pageNumber)"
          :array="filteredProductArray"
          :key="index"
          :index="index"/>
      </transition-group>    
    </div>
    
    <div v-show="filteredProductArray?.length === 0" class="text-center">
      Ничего не найдено...
    </div>

    <pagination-block
      v-show="filteredProductArray && filteredProductArray?.length > numbOfProdPerPage"/>
  </div>
</template>


<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@/stores/index'

  import sortByBlock from "@/components/sortByBlock.vue";
  import productCard from "@/components/productCard.vue";
  import paginationBlock from "@/components/paginationBlock.vue";

  const store = useStore()

  const numbOfProdPerPage = computed(()=> store.numbOfProdPerPage)
  const filteredProductArray = computed(() => store.filteredProductArray)
  const pageNumber = computed(() => store.pageNumber * numbOfProdPerPage.value)
</script>


<style scoped>  
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