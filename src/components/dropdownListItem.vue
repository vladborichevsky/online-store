<template>
  <div class="dropdownListItem cursor-pointer flex justify-start items-center bg-main_color border-2 my-1 p-2">
    <div class="w-1/4">
      <img :src="product.img_src" class="w-20 h-14 block object-cover" alt="painting">
    </div>
    <div class="w-3/4">
      <p class="mx-auto pl-1 text-xs text-white font-bold truncate lg:text-sm xl:text-base">{{ product.name }}</p>
      <p class="mx-auto pl-1 text-xs text-border_color truncate lg:text-sm xl:text-base">{{ product.author }}</p>
    </div>
  </div>
</template>


<script setup lang="ts">
  import type { MyProduct } from "@/stores/index"

  const props = defineProps<{
    product: MyProduct;
  }>()
</script>