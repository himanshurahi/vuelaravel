<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        >Laravel</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav me-auto"></ul>
        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ms-auto">
          <!-- Authentication Links -->
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'Login' }"
              >Login</router-link
            >
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'Register' }"
              >Register</router-link
            >
          </li>
          <li class="nav-item dropdown" v-if="isLoggedIn">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ user.name }}
            </a>

            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item" href="">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["user", 'isLoggedIn'],
};
</script>

<style>
</style>