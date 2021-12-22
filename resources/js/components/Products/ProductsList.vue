<template>
  <div class="row">
    <div class="col-4" v-for="product in products" :key="product.id">
      <!-- <div class="spinner-border" role="status"></div> -->
      <div class="card" style="width: 18rem">
        <!-- <img class="card-img-top" src="" alt="Card image cap" /> -->
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, title: "Product 1", description: "Desc" },
        { id: 2, title: "Product 2", description: "Desc" },
        { id: 3, title: "Product 3", description: "Desc" },
        { id: 4, title: "Product 4", description: "Desc" },
      ],
    };
  },
};
</script>

<style scoped>
</style>