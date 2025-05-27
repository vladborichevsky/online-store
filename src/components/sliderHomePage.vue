<template>
  <div
    class="relative mx-auto mb-[30px] h-[150px] w-full overflow-hidden rounded-xl xs:h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]"
  >
    <img
      v-for="(slide, index) in slides"
      :key="index"
      :src="slide"
      ref="slidesRef"
      alt="Изображение"
      class="absolute left-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// массив слайдов
const slides = ref(['/sliders/img_1.webp', '/sliders/img_2.webp', '/sliders/img_3.webp'])

// текущий индекс слайда
const currentIndex = ref(0)

// ссылки на DOM-элементы
const slidesRef = ref<HTMLElement[]>([])

let interval = setInterval(changeSlideNext, 3000)

const stopSlider = () => clearInterval(interval)

// показать активный слайд
function showNewSlide(newIndex = 0) {
  slidesRef.value.forEach((item) => (item.style.opacity = '0'))
  if (slidesRef.value[newIndex]) {
    slidesRef.value[newIndex].style.opacity = '1'
  }
}

// переключение вперёд
function changeSlideNext() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
  showNewSlide(currentIndex.value)
}

// старт при монтировании
onMounted(() => {
  showNewSlide()
})

// очистка при размонтировании
onBeforeUnmount(() => {
  stopSlider()
})
</script>
