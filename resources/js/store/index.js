import Vue from 'vue'
import Vuex from 'vuex'
import auth from "../store/modules/auth"
import products from "../store/modules/products"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        
        auth,
        products
    }
})
