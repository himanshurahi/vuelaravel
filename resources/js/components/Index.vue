<template>
  <div>
    <Spinner v-if="loading" />
    <Navbar :user="user" :isLoggedIn="isLoggedIn" />
    <router-view> </router-view>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Spinner from "../components/Spinner.vue";
export default {
  data() {
    return {
      user: null,
      isLoggedIn: false,
      loading : false,
    };
  },

  components: { Navbar, Spinner },
  async mounted() {
    this.loading = true
    let token = localStorage.getItem("token");
    try {
      let res = await axios.get("api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      this.user = res.data;
      this.isLoggedIn = true;
      this.loading = false
    } catch (e) {
      console.log(e.response.data);
      this.isLoggedIn = false;
      this.loading = false
    
    }
  },
};
</script>

<style>
</style>