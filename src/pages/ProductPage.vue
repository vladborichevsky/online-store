<template>
  <div class="mt-32 sm:mt-20">
    <div class="flex flex-col justify-center mt-5 text-sm sm:text-xl">
      <p class="font-bold">«{{ product?.name }}»</p>
      <p>{{ product?.author }}</p>
    </div>

    <div class="flex justify-center mb-5">
      <p class="font-bold text-sm sm:text-xl">Дата создания:</p><p>&nbsp{{ product?.creation_date }}</p>
    </div>

    <img 
      @click="PopUpImg(product?.img_src ? product?.img_src : '', 1100, 900)" 
      :src="product?.img_src" 
      alt="painting" 
      class="w-4/5 cursor-zoom-in block justify-self-center object-cove md:w-3/5">

    <div class="flex justify-center my-5 text-sm sm:text-xl">
      <p class="font-bold">Размер:</p><p>&nbsp{{ product?.size }}</p>
    </div>

    <p class="w-4/5 mx-auto text-justify text-sm indent-10 sm:text-xl">{{ product?.description }}</p>

    <div class="w-1/2 mx-auto py-4 flex justify-between items-center xs:w-1/3">
      <div class="h-full flex flex-col">
        <div v-if="product?.price.old" class="text-sm line-through lg:text-2xl">{{ product?.price.old }} $</div>
        <div class="text-sm font-bold sm:text-2xl lg:text-4xl ">{{ product?.price.new }} $</div>
      </div>

      <main-colored-btn
        v-if="product && !isInShoppingCart"
        @click="pushShoppingCart(product?.id)">
          Купить
      </main-colored-btn>

      <transparent-btn 
        v-if="product && isInShoppingCart"
        @click="[$router.push('/shopping_cart'), clearSearchInput()]">
          В корзину
      </transparent-btn>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router'
  import { useStore } from '@/stores/index'

  import { PopUpImg } from "@/hooks/PopUp"

  import MainColoredBtn from "@/components/UI/MainColoredBtn.vue";
  import TransparentBtn from "@/components/UI/TransparentBtn.vue";

  import type { MyProduct } from "@/stores/index"

  const route = useRoute()
  const store = useStore()

  store.updateProductArray()

  const product = computed<MyProduct | null>(() => {
    if(store.productArray) {
      return store.productArray[+route.params.id - 1]
    } else {
      return null
    }
  })

  const shoppingCart = computed(()=> store.shoppingCart)
  const pushShoppingCart = computed(()=> store.pushShoppingCart)
  const clearSearchInput = computed(() => store.clearSearchInput)

  const isInShoppingCart = computed<boolean>(()=> {
    return shoppingCart.value ? shoppingCart.value.some(item => item === product.value?.id) : false;
  })
</script>