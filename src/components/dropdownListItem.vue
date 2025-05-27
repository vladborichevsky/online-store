<template>
  <li
    class="dropdownListItem my-1 flex cursor-pointer items-center justify-start border-2 bg-main_color p-2"
  >
    <div class="w-1/4">
      <img :src="product.img_src" class="block h-14 w-20 object-cover" alt="painting" />
    </div>
    <div class="w-3/4">
      <p class="mx-auto truncate pl-1 text-xs font-bold text-white lg:text-sm xl:text-base">
        {{ product.name }}
      </p>
      <p class="mx-auto truncate pl-1 text-xs text-border_color lg:text-sm xl:text-base">
        {{ product.author }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { MyProduct } from '@/stores/index'

const props = defineProps<{
  product: MyProduct
}>()
</script>
