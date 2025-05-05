<template>
  <ul class="flex flex-wrap justify-center items-center gap-6 text-white">
    <li class="group relative flex w-[50px] h-[50px] md:w-[90px] md:h-[50px]"> 
      <img :src="mirLogo" alt="mir" width="100%" height="100%">
    </li>
    <li class="group relative flex w-[50px] h-[50px] md:w-[90px] md:h-[50px]"> 
      <img :src="maestroLogo" alt="maestro" width="100%" height="100%">
    </li>
    <li class="group relative flex w-[50px] h-[50px] md:w-[90px] md:h-[50px]"> 
      <img :src="paypalLogo" alt="paypal" width="100%" height="100%">
    </li>
    <li class="group relative flex w-[50px] h-[50px] md:w-[90px] md:h-[50px]"> 
      <img :src="visaLogo" alt="visa" width="100%" height="100%">
    </li>
  </ul>
</template>


<script lang="ts" setup>
  import mirLogo from '/payment/mir.svg'
  import maestroLogo from '/payment/maestro.svg'
  import paypalLogo from '/payment/paypal.svg'  
  import visaLogo from '/payment/visa.svg'
</script>


