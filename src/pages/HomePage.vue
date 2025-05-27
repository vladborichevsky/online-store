<template>
  <div class="mx-auto mt-32 w-4/5 sm:mt-20">
    <h1 class="waviy relative text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
      <span style="--i: 1">R</span>
      <span style="--i: 2">E</span>
      <span style="--i: 3">P</span>
      <span style="--i: 4">L</span>
      <span style="--i: 5">I</span>
      <span style="--i: 6">C</span>
      <span style="--i: 7">A</span>
    </h1>

    <div class="text-xs sm:text-base">Почувствуйте прикосновение искусства</div>

    <div
      class="relative mt-3 h-[200px] w-full overflow-hidden rounded-xl shadow-md sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]"
    >
      <video
        class="absolute left-0 top-0 h-full w-full object-cover"
        src="/start_video.webm"
        autoplay
        muted
        loop
        playsinline
      ></video>
    </div>

    <h2 class="my-3 text-center text-xs font-semibold xs:my-4 sm:my-5 sm:text-xl md:my-6 xl:my-7">
      Наш каталог
    </h2>

    <div class="mx-auto flex w-full flex-col items-center justify-center md:flex-row">
      <home-page-vidget
        @click="routerPush('/classic')"
        src="/paintings/3.webp"
        class="mb-2 xs:mb-3 md:mb-0"
      >
        <div
          class="absolute left-0 top-0 w-full p-5 text-right text-base uppercase text-white xs:text-xl sm:text-2xl lg:text-4xl"
        >
          Классические<br />произведения
        </div>
      </home-page-vidget>

      <home-page-vidget @click="routerPush('/modern')" src="/paintings/12.webp">
        <div
          class="absolute bottom-0 right-0 w-full p-5 text-left text-base uppercase text-white xs:text-xl sm:text-2xl lg:text-4xl"
        >
          Современные<br />произведения
        </div>
      </home-page-vidget>
    </div>

    <h2 class="my-3 text-center text-xs font-semibold xs:my-4 sm:my-5 sm:text-xl md:my-6 xl:my-7">
      5 лет создаём искусство для вас!
    </h2>

    <slider-home-page />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import homePageVidget from '@/components/homePageVidget.vue'
import sliderHomePage from '@/components/sliderHomePage.vue'

const router = useRouter()

const routerPush = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.waviy span {
  position: relative;
  display: inline-block;
  animation: flip 10s infinite;
  animation-delay: calc(0.6s * var(--i));
  margin: 0 4px;
}

@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  10% {
    transform: rotateY(360deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
