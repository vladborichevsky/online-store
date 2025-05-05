<template>
  <div class="mt-32 text-main_color text-sm font-semibold sm:mt-20 sm:text-xl">Доставка и оплата</div>

  <div class="w-4/5 mx-auto md:w-3/5">
    <div
      v-for="item in items"
      :key="item.id"
      class="py-2">

      <button
        @click="toggleItem(item.id)"
        class="w-full text-left font-semibold text-xs text-white px-4 py-2 bg-main_color rounded-lg sm:text-base">
          {{ item.title }}
      </button>
      
      <div
        class="grid transition-all duration-300 ease-in-out overflow-hidden"
        :class="openItemId === item.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
          <div class="overflow-hidden px-4 py-1 bg-white shadow rounded-lg text-left text-xs sm:text-base">
            <p class="whitespace-pre-line text-justify">{{ item.content }}</p>
            <p v-if="item.price" class="font-semibold">{{ item.price }}</p>
          </div>
      </div>
    </div>
  </div>
 
  <div class="my-5 text-sm md:text-xl" title="c 8:00 до 19:00 каждый день">
    По всем вопросам: <a href="tel:8-981-265-34-18" class="text-sm md:text-2xl" >8-981-265-34-18</a>
  </div>
</template>


<script lang="ts" setup>
  import { ref } from "vue";

  interface Item {
    id: number,
    title: string,
    content: string,
    price?: String
  }

  const items = ref<Item[]>([
    { id: 1, 
      title: "Доставка по Москве",
      content: "Доставка по Москве осуществляется в пределах МКАДа только полностью оплаченных заказов. Заявки на курьерскую экспресс-доставку принимаются до 20:00 с доставкой на текущий день.",
      price: "Стоимость доставки - 1000 руб." 
    },
    { id: 2,
      title: "Доставка по Санкт-Петербургу",
      content: "Доставка по Санкт-Петербургу осуществляется в пределах КАДа только полностью оплаченных заказов. Заявки на курьерскую экспресс-доставку принимаются до 20:00 с доставкой на текущий день.",
      price: "Стоимость доставки - 899 руб." 
    },
    { id: 3,
      title: "Доставка в другие города России",
      content: "Мы осуществляем доставку в другие города России с помощью надёжных транспортных компаний. Сроки и стоимость доставки зависят от региона и выбранного способа отправки. После оформления заказа мы свяжемся с вами для уточнения деталей и предоставим номер для отслеживания посылки."
    },
    { id: 4,
      title: "Способы оплаты",
      content: 'Мы принимаем оплату по наличному и безналичному расчету (по банковскому терминалу). Вы также можете осуществить оплату дистанционным способом и воспользоваться системой «Онлайн Банк» (в случае оплаты по реквизитам организации) в соответствие с выставленным счетом на оплату и договором купли продажи, либо по QR коду с помощью своего телефона. Также предлагаем вариант оплаты в рассрочку и кредит. Приобретайте картины частями с помощью сервиса "Яндекс Сплит" или в рассрочку/кредит в наших банках-партнерах сроком до 12 месяцев.\n\n При оформлении заказа вы вносите предоплату в размере 20% от стоимости заказа. Заказ считается принятым после зачисления на р.с. аванса. Доставка осуществляется после окончательной оплаты заказа, в течении последующих 5 рабочих дней.'
    },
  ])

  const openItemId = ref<number | null>(null)

  const toggleItem = (id: number) => {
    if (openItemId.value === id) {
      openItemId.value = null // Закрываем, если уже открыт
    } else {
      openItemId.value = id // Открываем, если был закрыт
    }
  }
</script>

