import router from '../../routes/routes'
export default {
    namespaced: true,
    state: {
        products: [],
        loading: {
            type: "",
            status: false
        },
        error: {
            error: "",
            type: ""
        }
    },
    getters: {
        getProducts: state => state.products,
        loading: state => state.loading,
        error: state => state.error
    },
    actions: {
        async fetchProducts({commit}) {
            commit("setLoading", {
                type: "products",
                status: true
            });
            let token = localStorage.getItem("token");
            try {
                let res = await axios.get("api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data);
                commit("setProducts", res.data);
                commit("setLoading", {
                    type: "products",
                    status: false
                });
            } catch (e) {
                commit("setError", {
                    error: e.response.data,
                    type: "products"
                });
                commit("setLoading", {
                    type: "products",
                    status: false
                });
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
                router.push({name: "Home"})
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
        }

    },
    mutations: {
        setProducts: (state, products) => {
            state.products = products
        },

        setLoading: (state, status) => {
            state.loading = status;
        },
        setError: (state, error) => {
            state.error = error;
        },
        clearErrors: (state) => {
            state.error = {
                error: "",
                type: ""
            };
        }
    }
};
