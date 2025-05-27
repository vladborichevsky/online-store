<template>
  <div
    class="wrapper group relative flex aspect-[5/3] w-full max-w-full cursor-pointer md:mr-[5px] md:w-[50%]"
  >
    <div class="h-full w-full overflow-hidden rounded-xl brightness-50">
      <img
        :src="props.src"
        class="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
    <div class="absolute h-full w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string
}>()
</script>
