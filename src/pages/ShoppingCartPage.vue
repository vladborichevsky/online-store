<template>
  <h1 class="mt-32 text-sm font-semibold sm:mt-20 sm:text-xl">Корзина</h1>

  <div class="mt-1 grid grid-cols-1 text-sm sm:mt-2 sm:text-lg xl:mt-8 xl:grid-cols-2">
    <div v-if="shoppingCart.length == 0" class="my-auto">Корзина пуста...</div>

    <div v-else class="flex flex-col items-center">
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
          class="mx-auto"
        />
      </transition-group>
    </div>

    <div
      class="m-3 mx-auto flex h-60 w-shop_cart_item_small_w flex-col items-start justify-around rounded border-4 border-border_color p-4 shadow-2xl xs:w-shop_cart_item_mid_w sm:w-shop_cart_item_w xl:h-80 xl:w-96"
    >
      <div class="flex w-full items-center justify-between">
        <p class="text-sm xs:text-base sm:text-lg">Всего товаров: {{ shoppingCart.length }}</p>
        <p class="text-base font-semibold xs:text-2xl xl:text-3xl">{{ purchaseAmount }} $</p>
      </div>

      <main-colored-btn
        class="w-fit px-2 text-xs sm:h-12 sm:w-48 sm:px-4 sm:py-2 sm:text-lg md:w-48 lg:w-48 lg:text-lg"
      >
        Оформить заказ
      </main-colored-btn>

      <div class="text-xs sm:text-base">
        Подробнее о
        <span
          @click="[routerPush('/delivery'), clearSearchInput()]"
          class="cursor-pointer underline hover:text-blue-700"
          >доставке и оплате</span
        >.
      </div>

      <label class="text-xs sm:text-base">
        <input type="checkbox" name="gift" value="true" />
        Добавить подарочную упаковку
      </label>

      <div
        @click="PopUpReduceThePrice"
        class="cursor-pointer text-xs font-semibold hover:underline sm:text-base"
      >
        Нашли дешевле? Снизим цену!
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/stores/index'
import { useRouter } from 'vue-router'

import shoppingCartItem from '@/components/shoppingCartItem.vue'
import MainColoredBtn from '@/components/UI/MainColoredBtn.vue'

import { PopUpReduceThePrice } from '@/hooks/PopUp'

const store = useStore()
const router = useRouter()

const shoppingCart = computed(() => store.shoppingCart)
const productArray = computed(() => store.productArray)
const purchaseAmount = computed(() => store.purchaseAmount)
const clearSearchInput = computed(() => store.clearSearchInput)

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

@media (max-width: 640px) {
  .swal2-title {
    font-size: 16px;
  }

  #swal2-html-container {
    font-size: 14px;
  }

  .swal2-confirm,
  .swal2-cancel {
    font-size: 14px;
    padding: 8px 16px;
  }

  .swal2-input {
    width: 190px;
    padding: 5px;
  }
}
</style>
