<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              {{getError}}
              <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': getError.type == 'login'}"
                    name="email"
                    value=""
                    required
                    autocomplete="email"
                    autofocus
                    v-model="email"
                  />
                  <span class="invalid-feedback" role="alert">
                    <strong>{{ getError.type == 'login' && getError.error.email[0] }}</strong>
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
                
                  <button class="btn btn-primary" type="button" disabled v-if="loading.type == 'login' && loading.status == true">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                    <button type="submit" class="btn btn-primary" v-else >
                    Login
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
      email: "",
      password: "",
    };
  },
  computed : mapGetters(['getError', 'loading']),
  methods: {
    ...mapActions(['login']),
    handleSubmit() {
      this.login({ email: this.email, password: this.password })
    },
  },
};
</script>

<style>
</style>