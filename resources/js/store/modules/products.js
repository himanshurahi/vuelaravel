import router from "../../routes/routes";
export default {
    namespaced: true,
    state: {
        products: [],
        loading: {
            type: "",
            status: false,
            id: null
        },
        error: {
            error: "",
            type: ""
        },
        productsLoading: false
    },
    getters: {
        getProducts: (state) => state.products,
        loading: (state) => state.loading,
        error: (state) => state.error,
        productsLoading: (state) => state.productsLoading
    },
    actions: {
        async fetchProducts({commit}) {
            commit("productsLoading", true);
            let token = localStorage.getItem("token");
            try {
                let res = await axios.get("api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data);
                commit("setProducts", res.data);
                commit("productsLoading", false);
            } catch (e) {
                commit("setError", {
                    error: e.response.data,
                    type: "products"
                });
                commit("productsLoading", false);
            }
        },
        async saveProduct({
            commit
        }, product) {
            commit("setLoading", {
                type: "saveProduct",
                status: true
            });
            let token = localStorage.getItem("token");
            try {
                let res = await axios.post("api/products", product, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                commit("setLoading", {
                    type: "saveProduct",
                    status: false
                });
                commit("clearErrors");
                router.push({name: "Home"});
            } catch (e) {
                commit("setError", {
                    error: e.response.data,
                    type: "saveProduct"
                });
                commit("setLoading", {
                    type: "saveProduct",
                    status: false
                });
            }
        },

        async deleteProduct({
            commit
        }, id) {
            commit("setLoading", {
                type: "deleteProduct",
                status: true,
                id: id
            });
            let token = localStorage.getItem("token");
            try {
                let res = await axios.delete("api/products/" + id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                commit("setLoading", {
                    type: "deleteProduct",
                    status: false,
                    id: id
                });
                commit('deleteProductWithId', id)
            } catch (e) {
                commit("setError", {
                    error: e.response,
                    type: "deleteProduct"
                });
                commit("setLoading", {
                    type: "deleteProduct",
                    status: false,
                    id: id

                });
            }
        }

    },
    mutations: {
        setProducts: (state, products) => {
            state.products = products;
        },

        setLoading: (state, status) => {
            state.loading = status;
        },
        setError: (state, error) => {
            state.error = error;
        },
        deleteProductWithId: (state, id) => {
            let updatedProducts = state.products.filter(product => product.id != id);
            state.products = updatedProducts;
        },
        productsLoading: (state, status) => {
            state.productsLoading = status
        },

        clearErrors: (state) => {
            state.error = {
                error: "",
                type: ""
            };
        }
    }
};
