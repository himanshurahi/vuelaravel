import router from "../../routes/routes";
export default {
    namespaced: true,
    state: {
        products: [],
        status: {
            products: {
                loading: false,
                error: "",
            },
            deleteProduct: {
                loading: false,
                error: "",
                id: "",
            },
            saveProduct: {
                loading: false,
                error: "",
            },
        },
    },
    getters: {
        getProducts: (state) => state.products,
        status: (state) => state.status,
    },
    actions: {
        async fetchProducts({ commit }) {
            commit("setLoading", { dataName: "products", status: true });
            let token = localStorage.getItem("token");
            try {
                let res = await axios.get("api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                commit("setProducts", res.data);
                commit("setLoading", { dataName: "products", status: false });
            } catch (e) {
                commit("setError", {
                    dataName: "products",
                    error: e.response.data,
                });
                commit("setLoading", { dataName: "products", status: false });
            }
        },
        async saveProduct({ commit }, product) {
            commit("setLoading", { dataName: "saveProduct", status: true });
            let token = localStorage.getItem("token");
            try {
                let res = await axios.post("api/products", product, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit("setLoading", {
                    dataName: "saveProduct",
                    status: false,
                });
                commit("clearErrors");
                router.push({ name: "Home" });
            } catch (e) {
                commit("setError", {
                    dataName: "saveProduct",
                    error: e.response.data,
                });
                commit("setLoading", {
                    dataName: "saveProduct",
                    status: false,
                });
            }
        },

        async deleteProduct({ commit }, id) {
            commit("setLoading", {
                dataName: "deleteProduct",
                status: true,
                id: id,
            });
            let token = localStorage.getItem("token");
            try {
                let res = await axios.delete("api/products/" + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit ("deleteProductWithId", id)
                commit("setLoading", {
                    dataName: "deleteProduct",
                    status: false,
                    id: id,
                });
            } catch (e) {
                commit("setError", {
                    dataName: "deleteProduct",
                    error: e.response,
                });
                commit("setLoading", {
                    dataName: "deleteProduct",
                    status: false,
                    id: id,
                });
            }
        },
    },
    mutations: {
        setProducts: (state, products) => {
            state.products = products;
        },

        setLoading: (state, { dataName, status, id }) => {
            if (id) {
                state.status[dataName].id = id;
            }
            state.status[dataName].loading = status;
        },

        setError: (state, { dataName, error }) => {
            state.status[dataName].error = error;
        },
        deleteProductWithId: (state, id) => {
            let updatedProducts = state.products.filter(
                (product) => product.id != id
            );
            state.products = updatedProducts;
        },
        productsLoading: (state, status) => {
            state.productsLoading = status;
        },

        clearErrors: (state) => {
            state.error = {
                error: "",
                type: "",
            };
        },
    },
};
