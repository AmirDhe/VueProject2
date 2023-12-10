app.component('review-form', {
  template:
  /*html*/
      `
        <form class="review-form" @submit.prevent="onSubmit">
          <h3>Leave a review</h3>

          <label for="name">Name:</label>
          <input id="name" v-model="name">

          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email">

          <label for="review">Review:</label>
          <textarea id="review" v-model="text"></textarea>


          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select> <br>
          
          <!-- Ajoute ici d'autres champs si nécessaire -->

          <button class="bt2">
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
        </form>
      `,
  data() {
    return {
      name: '',
      text: '',
      rating: null,
      email: '', // Nouvelle propriété de données pour l'e-mail
      // Ajoute ici d'autres propriétés de données si nécessaire
    }
  },
  methods: {
    onSubmit() {
      if (this.name === '' || this.text === '' || this.rating === null || this.email === '') {
        alert('Review is incomplete. Please fill out every field.')
        return
      }

      // Ajoute ici la validation de l'e-mail si nécessaire

      let review = {
        name: this.name,
        text: this.text,
        rating: this.rating,
        email: this.email, // Inclure l'e-mail dans le commentaire
        // Inclure d'autres champs si nécessaire
      };
      this.$emit('review-submitted', review);
      this.name = '';
      this.text = '';
      this.rating = null;
      this.email = ''; // Réinitialiser le champ e-mail
      // Réinitialiser d'autres champs si nécessaire
    }
  }
});
