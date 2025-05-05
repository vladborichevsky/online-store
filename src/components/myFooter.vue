<template>
  <footer class="bg-main_color text-white py-8 px-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
      <div class="flex-1">
        <div class="text-xs font-semibold text-center my-3 xs:my-4 sm:my-5 sm:text-xl md:my-6 xl:my-7">Мы в соцсетях</div>
        <div class="flex justify-center space-x-4">
          <social-block/>
        </div>
      </div>

      <div class="flex-1">
        <div class="text-xs font-semibold text-center my-3 xs:my-4 sm:my-5 sm:text-xl md:my-6 xl:my-7">Принимаем к оплате</div>
        <div class="flex justify-center space-x-4">
          <payment-block/>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center text-xs text-white border-t border-white pt-4">
      © 2025 Replica. Все права защищены.
    </div>
  </footer>
</template>


<script lang="ts" setup>
  import socialBlock from "@/components/socialBlock.vue";
  import paymentBlock from "@/components/paymentBlock.vue";
</script>