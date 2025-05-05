import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

import GetData from '@/services/apiFetch'
const URLjson = '/product_list.json'

export interface MyProduct {
  id: number,
  name: string,
  author: string,
  img_src: string,
  size: string,
  creation_date: string,
  description: string,
  style: string,
  price: {
    new: number,
    old: number
  }
}

export const useStore = defineStore('store', () => {
  const productArray = ref<Array<MyProduct> | null>([]) // массив с объектами товаров
  const shoppingCart = ref<number[] >([]) // массив с порядковыми номерами товаров, которые добавлены в корзину
  const purchaseAmount = ref<number>(0) // сумма товаров в корзине

  async function updateProductArray() {
    productArray.value = await GetData(URLjson)
    calcSumOfGoodsInBasket() // и сразу же высчитываем сумму товаров в корзине
  }

  function pushShoppingCart(paintingID: number) {
    if(!shoppingCart.value.some(painting => painting == paintingID)) {
      shoppingCart.value.push(paintingID)
      localStorage.setItem('shoppingCartJSON', JSON.stringify(shoppingCart.value))
      calcSumOfGoodsInBasket() // и сразу же высчитываем сумму товаров в корзине
    }
  }

  function delElShoppingCart(paintingID: number) {
    shoppingCart.value.forEach((item, id) => {
      if(item == paintingID) {
        shoppingCart.value.splice(id, 1)
        localStorage.setItem('shoppingCartJSON', JSON.stringify(shoppingCart.value))
        calcSumOfGoodsInBasket() // и сразу же высчитываем сумму товаров в корзине
      }
    })
  }

  function updShoppingCartFromLocalStorage() { // функция, которая проверяет корзину из local storage
    if(localStorage.getItem('shoppingCartJSON')) {
      const localStorageArr: string[] = JSON.parse(localStorage.getItem('shoppingCartJSON') || '[]');
      localStorageArr.forEach(item => pushShoppingCart(+item))
    }
  }

  function calcSumOfGoodsInBasket() { // функция вычисления суммы товаров в корзине
    purchaseAmount.value = 0
    shoppingCart.value.forEach(item => { 
      if(productArray.value?.[item - 1]) {
        purchaseAmount.value += productArray.value[item - 1].price.new
      }
    })
  }

  const numbOfProdPerPage: number = 18 // число товаров на странице

  const searchInput = ref<string>('')

  function clearSearchInput() { // функция, очищающая инпут поиска
    searchInput.value = ''
  }

  function setSearchInputValue(newValue: string) {
    searchInput.value = newValue;
  }

  const searchBy = ref<string>('paintings') // переменная поиска по автору или по названию картины

  function changeSearchByVar(type: string) {
    searchBy.value = type
  }

  const sortBy = ref<string>('byPopularity') // переменная сотрировки поиска

  function changeSortByVar(type: string) {
    sortBy.value = type
  }

  const filteredProductArray = computed(() => {
    if (!productArray.value) return []
  
    // Копируем массив, чтобы не мутировать исходный
    let result = [...productArray.value]
  
    const searchTerm = searchInput.value.toLowerCase()
  
    // Фильтрация
    if (searchTerm.length > 0) {
      if (searchBy.value === 'paintings') {
        result = result.filter(item =>
          item.name.toLowerCase().includes(searchTerm)
        )
      } else if (searchBy.value === 'authors') {
        result = result.filter(item =>
          item.author.toLowerCase().includes(searchTerm)
        )
      }
    }
  
    // Сортировка
    switch (sortBy.value) {
      case 'byPaintingName':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'ByAuthorName':
        result.sort((a, b) => a.author.localeCompare(b.author))
        break
      case 'byDecreasingPrice':
        result.sort((a, b) => b.price.new - a.price.new)
        break
      case 'byIncreasePrice':
        result.sort((a, b) => a.price.new - b.price.new)
        break
      case 'byPopularity':
      default:
        result.sort((a, b) => a.id - b.id)
        break
    }
  
    return result
  })

  const pageNumber = ref<number>(1)

  function pageNumberInc() {
    pageNumber.value = pageNumber.value + 1
  }

  // Классические произведения
  const classicProdArray = computed(() => filteredProductArray.value.filter((item) => item.style === 'cl') )

  // Современные произведения
  const modernProdArray = computed(() => filteredProductArray.value.filter((item) => item.style === 'md') )
  
  const quantityOfGoods = computed<number>(() => {
    if(filteredProductArray.value) {
      return filteredProductArray.value?.length
    } else {
      return 0
    }
  })

  const route = useRoute()
  const currentPage = ref<string>(route.path)
  const showDropdownList = ref<boolean>(false)

  function updateCurrentPage() {
    showDropdownList.value = true
    currentPage.value = route.path
  }

  function hideDropdownList(lastClickedElement: HTMLElement | null) { 
    currentPage.value = route.path

    if(lastClickedElement && lastClickedElement.closest('.dropdownListItem')) {
      return false
    } else {
      showDropdownList.value = false
    }
  }

  function hideDropdownListForce() {
    showDropdownList.value = false
  }

  return { productArray, updateProductArray, shoppingCart, updShoppingCartFromLocalStorage, purchaseAmount, delElShoppingCart, pushShoppingCart, numbOfProdPerPage, searchInput, clearSearchInput, setSearchInputValue, searchBy, changeSearchByVar, sortBy, changeSortByVar, filteredProductArray, classicProdArray, modernProdArray, quantityOfGoods, pageNumber, pageNumberInc, currentPage, updateCurrentPage, showDropdownList, hideDropdownList, hideDropdownListForce }
})