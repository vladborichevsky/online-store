<template>
  <div 
    @click="click(painting_id)" 
    class="w-shopping_Cart_item h-20 flex justify-between border-2 border-border_color rounded m-3 cursor-pointer shadow-xl hover:shadow-2xl">
      <img :src="img_src" class="w-32 object-cover" alt="painting">

      <div class="w-2/4 flex flex-col justify-center mx-2">
        <div class="w-full font-bold truncate">«{{ name }}»</div>
        
        <div class="w-full truncate">{{ author }}</div>
      </div>

      <div class="flex">
        <div class="flex flex-col justify-center mx-2">
          <p class="font-bold text-2xl">{{ price_new }} $</p>

          <p v-if="price_old != 0" class="line-through">{{ price_old }} $</p>
        </div>

        <button v-if="painting_id" @click.stop="delElShoppingCartFunc(painting_id, delElShoppingCart)" class="w-10" title="Удалить из корзины">
          <img src="/trash_can.svg" alt="trash can" class="w-8">
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

  // попап сообщения "Удалить картину из корзины?". Сюда передаётся функция удаления картины из корзины (из хранилища Pinia)
  const delElShoppingCartFunc = (id: number, delElShoppingCart: Function) => {
    PopUpSure(id, delElShoppingCart)
  }

  function click(painting_id: number | undefined): void {
    if (window.getSelection()?.toString()) { // проверка, что пользователь именно кликнул, а не просто выделил текст на элементе
    return;
  }
    router.push(`/product/${painting_id}`)
  }
</script>
