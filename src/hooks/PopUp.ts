import Swal from 'sweetalert2'
import Inputmask from 'inputmask'

// попап открытия изображения в большом размере
export const PopUpImg = (url: string, wid: number, imgWid: number): void => {
  Swal.fire({
    imageUrl: url,
    width: wid,
    imageWidth: imgWid,
    imageAlt: 'painting',
    showConfirmButton: false,
  })
}

// попап сообщения "Удалить картину из корзины?". Сюда передаётся функция удаления картины из корзины (из хранилища Pinia)
export const PopUpSure = (id: number, delElShoppingCart: Function): void => {
  Swal.fire({
    title: 'Вы уверены?',
    text: 'Удалить картину из корзины?',
    showCancelButton: true,
    confirmButtonColor: 'oklch(0.488 0.243 264.376)',
    cancelButtonColor: '#382E2B',
    confirmButtonText: 'Да',
    cancelButtonText: 'Нет',
  }).then((result) => {
    if (result.isConfirmed) {
      delElShoppingCart(id)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Картина удалена из корзины!',
        showConfirmButton: false,
        timer: 2200,
      })
    }
  })
}

// попап сообщения "Нашли дешевле? Снизим цену!"
export const PopUpReduceThePrice = async (): Promise<void> => {
  const { value: formValues } = await Swal.fire({
    title: 'Пришлите нам ссылку на товар конкурента и мы свяжемся с вами!',
    html: `
      <input id="url-input" class="swal2-input" placeholder="Добавте ссылку">
      <input id="phone-input" type="tel" class="swal2-input" placeholder="+7 (___) ___-__-__">
    `,
    didOpen: () => {
      const phoneInput = document.getElementById('phone-input') as HTMLInputElement
      if (phoneInput) {
        Inputmask('+7 (999) 999-99-99').mask(phoneInput)
      }
    },
    focusConfirm: false,
    confirmButtonText: 'Отправить',
    confirmButtonColor: 'oklch(0.488 0.243 264.376)',
    showCancelButton: true,
    cancelButtonText: 'Отмена',
    cancelButtonColor: '#382E2B',
    preConfirm: () => {
      const urlInput = (document.getElementById('url-input') as HTMLInputElement).value || ''
      const phoneInput = (document.getElementById('phone-input') as HTMLInputElement).value || ''

      if (!urlInput || phoneInput[17] === '_') {
        // проверка, чтобы пользователь точно заполнил все инпуты
        Swal.showValidationMessage('Заполните, пожалуйста, все поля')
        return false
      }

      return [urlInput, phoneInput]
    },
  })

  if (formValues) {
    console.log(JSON.stringify(formValues)) // вместо отправления на сервер просто показываем полученные данные в консоли

    await Swal.fire({
      title: 'Благодарим! Наши специалисты свяжутся с вами в ближайшее время.',
      confirmButtonColor: 'oklch(0.488 0.243 264.376)',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      timer: 2200,
    })
  }
}
