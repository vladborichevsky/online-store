<template>
  <div 
    @click="click(product.id)"
    v-if="product" 
    class="cursor-pointer w-product_card_width h-product_card_height border-2 border-border_color m-4 text-center shadow-xl hover:shadow-2xl">

      <img 
        :src="product.img_src"
        class="w-product_card_width h-product_card_img_height object-cover" 
        alt="painting"
        loading="lazy">

      <p class="w-4/5 mx-auto mt-4 font-bold truncate">«{{ product.name }}»</p>

      <p>{{ product.author }}</p>
    
      <div class="mt-4 flex justify-around items-center">
        <div>
          <p v-if="product.price.old" class="line-through">{{ product?.price.old }} $</p>
          <p class="font-bold text-2xl">{{ product.price.new }} $</p>
        </div>
        <main-colored-btn
          v-if="!isInShoppingCart"
          @click.stop="pushShoppingCart(product?.id)">
            Купить
        </main-colored-btn>
        <transparent-btn
          v-if="isInShoppingCart"
          @click.stop="$router.push('/shopping_cart')"
          title="Товар добавлен в корзину">
            В корзину
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
    index: number;
  }>()

  const store = useStore()
  const router = useRouter()
  
  const product = computed<MyProduct | null>(() => {
    if(store.filteredProductArray) {
      return store.filteredProductArray[props.index]
    } else {
      return null
    }
  })

  const shoppingCart = computed(()=> store.shoppingCart)
  const pushShoppingCart = computed(()=> store.pushShoppingCart)

  const isInShoppingCart = computed<boolean>(()=> {
    return shoppingCart.value ? shoppingCart.value.some(item => item === product.value?.id) : false;
  })

  function click(id: number | undefined): void {
    if (window.getSelection()?.toString()) { // проверка, что пользователь именно кликнул, а не просто выделил текст на элементе
    return;
  }
    router.push(`/product/${id}`)
  }
</script>

