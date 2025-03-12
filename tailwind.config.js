/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main_color: '#382E2B',
        main_color_light: '#544540',
        border_color: '#E1E1E1'
      },
      width: {
        product_card_width: '380px',
        shopping_Cart_item: '600px',
        select_options: '170px'
      },
      height: {
        product_card_height: '380px',
        product_card_img_height: '230px'
      }
    },
  },
  plugins: [],
}

