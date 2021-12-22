<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            {{getError}}
            <form @submit.prevent="handleSubmit">
              <div class="row mb-3">
                <label for="name" class="col-md-4 col-form-label text-md-right"
                  >Name</label
                >
                <div class="col-md-6">
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    name="name"
                    value=""
                    required
                    autocomplete="name"
                    autofocus
                    v-model="name"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email Address</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    :class="{'is-invalid' : getError.type == 'signup' && getError.error.email}"
                    name="email"
                    value=""
                    required
                    autocomplete="email"
                    v-model="email"
                  />
                  <span class="invalid-feedback" role="alert">
                    {{getError.type == 'signup' && getError.error.email && getError.error.email[0]}}
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
                      :class="{'is-invalid' : getError.type == 'signup' && getError.error.password}"
                    name="password"
                    required
                    autocomplete="new-password"
                    v-model="password"
                  />
                  <span class="invalid-feedback" role="alert">
                     {{getError.type == 'signup' &&  getError.error.password && getError.error.password[0] }}
                  </span>
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="password-confirm"
                  class="col-md-4 col-form-label text-md-right"
                  >Confirm Password</label
                >

                <div class="col-md-6">
                  <input
                    id="password-confirm"
                    type="password"
                    class="form-control"
                    name="password_confirmation"
                    required
                    autocomplete="new-password"
                    v-model="password_confirmation"
                  />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button class="btn btn-primary" type="button" disabled v-if="loading.type == 'signup' && loading.status == true">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                  <button type="submit" class="btn btn-primary" v-else>
                    Register
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  computed: mapGetters(["getError", "loading"]),
  methods: {
    ...mapActions(["Signup"]),
    handleSubmit() {
      this.Signup({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      });
    },
  },
};
</script>

<style>
</style>