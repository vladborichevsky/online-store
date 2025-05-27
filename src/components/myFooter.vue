<template>
  <footer class="bg-main_color px-4 py-8 text-white">
    <div class="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
      <section class="flex-1">
        <div
          class="my-3 text-center text-xs font-semibold xs:my-4 sm:my-5 sm:text-xl md:my-6 xl:my-7"
        >
          Мы в соцсетях
        </div>
        <aside class="flex justify-center space-x-4">
          <social-block />
        </aside>
      </section>

      <aside class="flex-1">
        <div
          class="my-3 text-center text-xs font-semibold xs:my-4 sm:my-5 sm:text-xl md:my-6 xl:my-7"
        >
          Принимаем к оплате
        </div>
        <div class="flex justify-center space-x-4">
          <payment-block />
        </div>
      </aside>
    </div>

    <div class="mt-8 border-t border-white pt-4 text-center text-xs text-white">
      © 2025 Replica. Все права защищены.
    </div>
  </footer>
</template>

<script lang="ts" setup>
import socialBlock from '@/components/socialBlock.vue'
import paymentBlock from '@/components/paymentBlock.vue'
</script>
