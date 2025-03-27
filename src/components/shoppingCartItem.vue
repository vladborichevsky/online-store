<template>
  <div
    @click="[routerPush(painting_id), clearSearchInput()]"
    class="w-shop_cart_item_small_w m-1 flex h-20 cursor-pointer justify-between rounded border-2 border-border_color shadow-xl hover:shadow-2xl xs:w-shop_cart_item_mid_w sm:m-3 sm:w-shop_cart_item_w">
    <img
      :src="img_src"
      class="hidden w-32 object-cover sm:inline-block"
      alt="painting"/>

    <div class="mx-2 flex w-2/4 flex-col justify-center">
      <div class="w-full truncate text-xs font-bold sm:text-base">
        «{{ name }}»
      </div>

      <div class="w-full truncate text-xs sm:text-base">
        {{ author }}
      </div>
    </div>

    <div class="flex">
      <div class="mx-2 flex flex-col justify-center">
        <p class="text-sm font-bold sm:text-2xl">{{ price_new }} $</p>

        <p v-if="price_old != 0" class="text-sm line-through">{{ price_old }} $</p>
      </div>

      <button
        v-if="painting_id"
        @click.stop="delElShoppingCartFunc(painting_id, delElShoppingCart)"
        class="w-10"
        title="Удалить из корзины"
      >
        <img src="/trash_can.svg" alt="trash can" class="w-8" />
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router'
  import { useStore } from '@/stores/index'

  import { PopUpSure } from "@/hooks/PopUp"

  const props = defineProps<{
    name?: string,
    author?: string,
    img_src?: string,
    price_new?: number,
    price_old?: number,
    painting_id?: number
  }>()

  const store = useStore()
  const router = useRouter()

  const delElShoppingCart = computed(()=> store.delElShoppingCart)
  const clearSearchInput = computed(() => store.clearSearchInput)

  // попап сообщения "Удалить картину из корзины?". Сюда передаётся функция удаления картины из корзины (из хранилища Pinia)
  const delElShoppingCartFunc = (id: number, delElShoppingCart: Function) => {
    PopUpSure(id, delElShoppingCart)
  }

  function routerPush(painting_id: number | undefined): void {
    if (window.getSelection()?.toString()) { // проверка, что пользователь именно кликнул, а не просто выделил текст на элементе
      return
    }
    router.push(`/product/${painting_id}`)
  }
</script>
