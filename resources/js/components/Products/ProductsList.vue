<template>
  <div class="container">
    <main class="py-4">
      <router-link :to="{ name: 'AddProduct' }">
        <button type="button" class="btn btn-success">Add Product</button>
      </router-link>
      <div class="row" v-if="!productsLoading">
        <div class="col-4" v-for="product in getProducts" :key="product.id">
          <!-- <div class="spinner-border" role="status"></div> -->
          <div class="card" style="width: 18rem">
            <!-- <img class="card-img-top" src="" alt="Card image cap" /> -->
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">Buy Now</a>
              <button
                class="btn btn-danger"
                type="button"
                disabled
                v-if="
                  loading.type == 'deleteProduct' &&
                  loading.status == true &&
                  loading.id == product.id
                "
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Deleting...
              </button>
              <a
                href="#"
                @click.prevent="handleDelete(product.id)"
                class="btn btn-danger"
                v-else
                >Delete</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="productsLoading">
        <div class="col-12 text-center">
          <h2>Please Wait..</h2>
        </div>
      </div>

      <div class="row" v-if="!productsLoading && getProducts.length == 0">
        <div class="col-12 text-center">
          <h2>No products Found.</h2>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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

  computed: mapGetters("products", [
    "getProducts",
    "loading",
    "productsLoading",
  ]),
  methods: {
    ...mapActions("products", ["fetchProducts", "deleteProduct"]),
    handleDelete(id) {
      this.deleteProduct(id);
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
</style>