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
        prod_card_w: '380px',
        prod_card_w_middle: '220px',
        shop_cart_item_w: '600px',
        shop_cart_item_mid_w: '360px',
        shop_cart_item_small_w: '280px',
        select_options: '155px'
      },
      height: {
        prod_card_h: '380px',
        prod_card_h_lg: '290px',
        prod_card_h_mid: '230px',
        prod_card_h_small: '200px',
        prod_card_img_h: '230px',
        prod_card_img_h_lg: '170px',
        prod_card_img_h_middle: '120px',
        prod_card_img_h_small: '90px'
      },
      screens: {
        'xs': '470px'
      }
    },
  },
  plugins: [],
}

