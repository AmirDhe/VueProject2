app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:  `
    <div class="product-display">
      <h2 id="best-seller" class="best-seller-title">Our Best-Seller!</h2>
      <div class="product-container">
        <div class="product-image">
          <img :src="image" />
          <div class="color-circles-container">
            <div class="color-circle"
                 v-for="(variant, index) in variants"
                 :key="variant.id"
                 :style="{ backgroundColor: variant.color }"
                 @mouseover="updateProduct(index)">
            </div>
          </div>
        </div>
        
        <div class="product-info">
          <h1>{{ productName }}</h1>
          <p v-if="inStock">In Stock : Quantity Available: {{ currentVariantQuantity }}</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <button class="button" type="button" @click="addToCart">
            <span class="button__text">Add Item</span>
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
          </button>
        </div>
        
        
      </div>


      <review-form @review-submitted="addReview" style="width: 100%; max-width: 800px;"></review-form>
      <div class="review-section">
        <review-list :reviews="reviews"></review-list>
      </div>
    </div>
  `,

  data() {
    return {
      product: 'Vest',
      brand: 'Canada Goose',
      selectedVariant: 0,
      details: ['LENGHT : Hip', 'ORIGIN : Made in Canada', 'Disc : Classic'],
      variants: [
        {
          id: 2234,
          color: 'red',
          image: 'assets/images/4154M_28_fsph.webp',
          quantity: 10
        },

        {
          id: 2236,
          color: 'white',
          image: 'assets/images/4154M_25_fsph.webp',
          quantity: 5
        }
      ,

        {
          id: 2235,
          color: 'grey',
          image: 'assets/images/4154M_222_fsph.webp',
          quantity: 0
        },

        {
          id: 2233,
          color: 'skyblue',
          image: 'assets/images/4154M_1265_fsph.webp',
          quantity: 4
        },

      ],

      reviews: []
    }
  },

  methods: {
    addToCart() {
      const variant = this.variants[this.selectedVariant];
      if (variant.quantity > 0) {
        this.$emit('add-to-cart', variant.id);
        variant.quantity--;
      }
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    }
  },

  computed: {
    productName() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity > 0;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    },
    currentVariantQuantity() {
      return this.variants[this.selectedVariant].quantity;
    }
  }
});

