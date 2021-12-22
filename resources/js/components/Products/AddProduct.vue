<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Add Product</div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row mb-3">
                   <label for="">Title</label>
                <div class="col-md-12">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value=""
                    required
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
                    required
                    autocomplete="current-password"
                    v-model="description"
                  />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                
                  <button class="btn btn-primary" type="button" disabled >
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </button>
                    <button type="submit" class="btn btn-primary"  >
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
export default {
    data(){
        return {
            title : "",
            description : ""
        }
    }
}
</script>

<style>

</style>