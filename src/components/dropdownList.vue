<template>
  <ul v-if="filteredProductArray">
    <dropdownListItem
      v-for="(item, index) in filteredProductArray.slice(0, 4)"
      @click.stop="[
        $router.push(`/product/${filteredProductArray[index].id}`),
        hideDropdownListForce(),
        clearSearchInput(),
      ]"
      :key="item.id"
      :product="filteredProductArray[index]"
    />

    <dropdownListIEmptyItem v-if="filteredProductArray?.length === 0" />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/index'

import dropdownListItem from '@/components/dropdownListItem.vue'
import dropdownListIEmptyItem from '@/components/dropdownListIEmptyItem.vue'

const store = useStore()

const filteredProductArray = computed(() => store.filteredProductArray)
const hideDropdownListForce = computed(() => store.hideDropdownListForce)
const clearSearchInput = computed(() => store.clearSearchInput)
</script>
