<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors }"
                    name="email"
                    value=""
                    required
                    autocomplete="email"
                    autofocus
                    v-model="email"
                  />
                  <span class="invalid-feedback" role="alert">
                    <strong>{{ errors }}</strong>
                  </span>
                </div>
              </div>
              <div class="row mb-3">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Password</label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    autocomplete="current-password"
                    v-model="password"
                  />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary" v-if="!loading">
                    Login
                  </button>
                  <button class="btn btn-primary" type="button" disabled v-else>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
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
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errors: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.loading = true;
        const response = await axios.post("api/login", user);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        this.loading = false;
        this.errors = null;
        this.$router.push({ name: "Home" });
      } catch (e) {
        this.errors = e.response.data.error;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>