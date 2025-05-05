<template>
  <div class="cursor-pointer wrapper group flex relative w-full md:w-[50%] max-w-full aspect-[5/3] md:mr-[5px]">
    <div class="w-full h-full overflow-hidden brightness-50 rounded-xl">
      <img :src=props.src class="h-full w-full object-center object-cover transition-transform duration-300 group-hover:scale-110 ease-in-out" />
    </div>
    <div class="absolute w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    src: string;
  }>()
</script>