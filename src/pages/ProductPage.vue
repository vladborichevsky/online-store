<template>
  <div class="mt-20">
    <div class="flex justify-center mt-5 text-xl">
      <p class="font-bold"> {{ product?.name }}</p>
      <p>,&nbsp {{ product?.author }}</p>
    </div>

    <div class="flex justify-center mb-5">
      <p class="font-bold">Дата создания:</p><p>&nbsp{{ product?.creation_date }}</p>
    </div>

    <img 
      @click="PopUpImg(product?.img_src ? product?.img_src : '', 900, 850)" 
      :src="product?.img_src" 
      alt="painting" 
      class="cursor-zoom-in block w-1/3 justify-self-center object-cover">

    <div class="flex justify-center my-5">
      <p class="font-bold">Размер:</p><p>&nbsp{{ product?.size }}</p>
    </div>

    <p class="w-4/5 mx-auto text-justify indent-10">{{ product?.description }}</p>

    <div class="w-64 mx-auto my-5 text-4xl" :class="{ 'justify-between': product?.price.old }">
      <p v-if="product?.price.old" class="line-through text-2xl">{{ product?.price.old }} $</p>
      <p class="font-bold">{{ product?.price.new }} $</p>
    </div>

    <main-colored-btn
      v-if="product && !isInShoppingCart"
      @click="pushShoppingCart(product?.id)"
      class="mb-10 mt-5">
        Купить
    </main-colored-btn>

    <transparent-btn class="mb-10 mt-5"
      v-if="product && isInShoppingCart"
      @click="$router.push('/shopping_cart')">
        В корзину
    </transparent-btn>
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

  const isInShoppingCart = computed<boolean>(()=> {
    return shoppingCart.value ? shoppingCart.value.some(item => item === product.value?.id) : false;
  })
</script>