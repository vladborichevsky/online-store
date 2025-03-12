<template>
  <div>
    <main-colored-btn 
      v-if="pageNumber * 9 <= quantityOfGoods" 
      @click="pageNumberInc"
      class="mb-7">
        Ещё
    </main-colored-btn>

    <main-colored-btn 
      v-if="pageNumber * 9 >= quantityOfGoods" 
      @click="pageUp"
      class="mb-7">
        Наверх
    </main-colored-btn>
  </div>
</template>


<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@/stores/index'

  import MainColoredBtn from "@/components/UI/MainColoredBtn.vue";

  const store = useStore()

  const pageNumber = computed(() => store.pageNumber)
  const pageNumberInc = computed(() => store.pageNumberInc)
  const quantityOfGoods = computed(() => store.quantityOfGoods)

  const pageUp = (): void  => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
</script>
