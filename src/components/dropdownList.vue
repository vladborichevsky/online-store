<template>
  <div>
    <dropdownListItem
      v-if="filteredProductArray"
      v-for="(item, index) in filteredProductArray"
      @click.stop="[$router.push(`/product/${filteredProductArray[index].id}`), hideDropdownListForce()]"
      :key="item.id"
      :product="filteredProductArray[index]"/>

    <dropdownListIEmptyItem
      v-if="filteredProductArray?.length === 0"/>
  </div>
</template>


<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from '@/stores/index'

  import dropdownListItem from "@/components/dropdownListItem.vue";
  import dropdownListIEmptyItem from "@/components/dropdownListIEmptyItem.vue";

  const store = useStore()

  const filteredProductArray = computed(() => store.filteredProductArray)
  const hideDropdownListForce = computed(() => store.hideDropdownListForce)
</script>
