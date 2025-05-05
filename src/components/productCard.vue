<template>
  <div 
    @click="[routerPush(product.id), clearSearchInput()]"
    v-if="product" 
    class="cursor-pointer w-[45vw] h-fit flex flex-col justify-around pb-2 border-2 border-border_color text-center shadow-xl hover:shadow-2xl xs:h-prod_card_h_small xs:m-2 sm:w-[30vw] sm:m-3 md:w-w-[32vw] md:h-prod_card_h_mid lg:h-prod_card_h_lg xl:w-prod_card_w xl:h-prod_card_h xl:m-4">

      <img 
        :src="product.img_src"
        class="w-full h-prod_card_img_h_small object-cover md:h-prod_card_img_h_middle lg:h-prod_card_img_h_lg xl:h-prod_card_img_h" 
        alt="painting"
        loading="lazy">

      <p class="w-full text-xs mx-auto mt-1 px-1 font-bold truncate md:text-sm lg:text-base xl:w-4/5 xl:mt-4">«{{ product.name }}»</p> 

      <p class="w-full text-xs truncate px-1 md:text-sm">{{ product.author }}</p>
    
      <div class="mt-1 flex justify-around items-center xl:mt-4">
        <div>
          <p v-if="product.price.old" class="text-xs line-through lg:text-sm xl:text-base">{{ product?.price.old }} $</p>
          <p class="text-xs font-bold sm:text-sm md:text-base lg:text-xl xl:text-2xl">{{ product.price.new }} $</p>
        </div>
        <main-colored-btn
          v-if="!isInShoppingCart"
          @click.stop="pushShoppingCart(product?.id)">
            Купить
        </main-colored-btn>
        <transparent-btn
          v-if="isInShoppingCart"
          @click.stop="[$router.push('/shopping_cart'), clearSearchInput()]"
          title="Товар добавлен в корзину">
            В корзине
        </transparent-btn>
      </div>

  </div>
</template>


<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@/stores/index'
  import { useRouter } from 'vue-router'

  import MainColoredBtn from "@/components/UI/MainColoredBtn.vue";
  import TransparentBtn from "@/components/UI/TransparentBtn.vue";

  import type { MyProduct } from "@/stores/index"

  const props = defineProps<{
    index: number,
    array: MyProduct[] | null
  }>()

  const store = useStore()
  const router = useRouter()
  
  const product = computed<MyProduct | null>(() => {
    if(store.filteredProductArray && props.array) {
      return props.array[props.index]
    } else {
      return null
    }
  })

  const clearSearchInput = computed(() => store.clearSearchInput)
  const shoppingCart = computed(()=> store.shoppingCart)
  const pushShoppingCart = computed(()=> store.pushShoppingCart)

  const isInShoppingCart = computed<boolean>(()=> {
    return shoppingCart.value ? shoppingCart.value.some(item => item === product.value?.id) : false;
  })

  function routerPush(id: number | undefined): void {
    if (window.getSelection()?.toString()) { // проверка, что пользователь именно кликнул, а не просто выделил текст на элементе
      return
    }
    router.push(`/product/${id}`)
  }
</script>

