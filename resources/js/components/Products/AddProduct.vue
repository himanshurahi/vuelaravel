<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Add Product</div>
          <div class="alert bg bg-danger text-white" v-if="error.error">
            <ul>
              <li v-for="error in error.error" :key="error[0]">
                {{ error[0] }}
              </li>
            </ul>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row mb-3">
                <label for="">Title</label>
                <div class="col-md-12">
                  <input
                    id="email"
                    type="text"
                    class="form-control"
                    name="email"
                    value=""
                    autocomplete="email"
                    autofocus
                    v-model="title"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="">Description</label>
                <div class="col-md-12">
                  <textarea
                    id="password"
                    type="text"
                    class="form-control"
                    name="password"
                    autocomplete="current-password"
                    v-model="description"
                  />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button
                    class="btn btn-primary"
                    type="button"
                    disabled
                    v-if="
                      loading.type == 'saveProduct' && loading.status == true
                    "
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </button>
                  <button type="submit" class="btn btn-primary" v-else>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
  computed: mapGetters("products", ["loading", "error"]),
  methods: {
    ...mapActions("products", ["saveProduct"]),
    handleSubmit() {
      this.saveProduct({ title: this.title, description: this.description });
    },
  },
};
</script>

<style>
</style>