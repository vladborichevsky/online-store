<template>
  <div class="mt-20 text-main_color text-xl font-semibold">Корзина</div>

  <div class="mt-8 grid grid-cols-2">
    <div v-if="shoppingCart.length == 0" class="my-auto">Корзина пуста...</div>

    <div v-else class="flex flex-col">
      <transition-group name="product-list">
        <shopping-cart-item
          v-for="(item, index) in shoppingCart"
          :key="index"
          :name="productArray?.[item - 1]?.name"
          :author="productArray?.[item - 1]?.author"
          :img_src="productArray?.[item - 1]?.img_src"
          :price_new="productArray?.[item - 1]?.price.new"
          :price_old="productArray?.[item - 1]?.price.old"
          :painting_id="productArray?.[item - 1]?.id"
          class="mx-auto"/>
      </transition-group>
    </div>

    <div class="w-96 h-80 m-3 p-4 mx-auto rounded flex flex-col justify-around items-start border-4 border-border_color shadow-2xl">
      <div class="w-full flex justify-between items-center">
        <p>Всего товаров: {{ shoppingCart.length }}</p>
        <p class="text-3xl font-semibold">{{ purchaseAmount }} $</p>
      </div>
      
      <main-colored-btn 
        class="w-fit">
          Оформить заказ
      </main-colored-btn>

      <div>
        Подробнее о <span @click="routerPush('/delivery')" class="cursor-pointer underline hover:text-blue-700">доставке и оплате</span>.
      </div>

      <label>
        <input type="checkbox" name="gift" value="true">
          Добавить подарочную упаковку
      </label>

      <div 
        @click="PopUpReduceThePrice"
        class="cursor-pointer font-semibold hover:underline">
          Нашли дешевле? Снизим цену!
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from '@/stores/index'
  import { useRouter } from 'vue-router'
  
  import shoppingCartItem from "@/components/shoppingCartItem.vue"
  import MainColoredBtn from "@/components/UI/MainColoredBtn.vue"

  import { PopUpReduceThePrice } from "@/hooks/PopUp"

  const store = useStore()
  const router = useRouter()

  const shoppingCart = computed(()=> store.shoppingCart)
  const productArray = computed(()=> store.productArray)
  const purchaseAmount = computed(()=> store.purchaseAmount)

  const routerPush = async (path: string) => {
    await router.push(path) 
  }
</script>


<style>
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
