import router from '../../routes/routes'
export default {
    state: {
        user: null,
        isLoggedIn: false,
        loading: {
            type: "",
            status: false,
        },
        error: {
            error: "",
            type: "",
        },
    },
    getters: {
        getCurrentUser: (state) => state.user,
        isLoggedIn: (state) => state.isLoggedIn,
        loading: (state) => state.loading,
        getError: (state) => state.error,
    },
    actions: {
        async login({ commit }, user) {
            commit("setLoading", {
                type: "login",
                status: true,
            });
            try {
                const response = await axios.post("api/login", user);
                console.log(response.data);
                commit("setUser", response.data.user);
                localStorage.setItem("token", response.data.token);
                commit("setLoading", {
                    type: "login",
                    status: false,
                });
                commit("clearErrors");
                router.push({name : "Home"})
            } catch (e) {
                commit("setError", {
                    error: e.response.data.error,
                    type: "login",
                });
                commit("setLoading", {
                    type: "login",
                    status: false,
                });
            }
        },

        async Signup({commit}, user){
            commit("setLoading", {
                type: "signup",
                status: true,
            });
            try {
                const response = await axios.post("api/register", user);
                localStorage.setItem('token', response.data.token)
                commit("setUser", response.data.user);
                commit("setLoading", {
                    type: "signup",
                    status: false,
                });
                commit("clearErrors");
                router.push({name : "Home"})
              } catch (e) {
                commit("setLoading", {
                    type: "signup",
                    status: false,
                });
                commit("setError", {
                    error: e.response.data.errors,
                    type: "signup",
                });
                
              }
        },

        async logout({commit}){
            commit("setLoading", {
                type: "autoLogin",
                status: true,
            });
            let token = localStorage.getItem("token");  
            try {
                let res = await axios.get("api/logout", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                localStorage.removeItem('token');
                commit("setUser", null);
                commit("setLoggedIn", false);
                commit("setLoading", {
                    type: "autoLogin",
                    status: false,
                });
                router.push({name : 'Login'})
            } catch (e) {
                commit("setError", {
                    error: e.response.data,
                    type: "logout",
                });
                commit("setLoading", {
                    type: "autoLogin",
                    status: false,
                });
            }
        },


        async fetchUser({ commit }) {
            commit("setLoading", {
                type: "autoLogin",
                status: true,
            });
            let token = localStorage.getItem("token");
            try {
                let res = await axios.get("api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit("setUser", res.data);
                commit("setLoading", {
                    type: "autoLogin",
                    status: false,
                });
            } catch (e) {
                commit("setError", e.response.data);
                commit("setLoading", {
                    type: "autoLogin",
                    status: false,
                });
            }
        },
    },
    mutations: {
        setLoading: (state, status) => {
            state.loading = status;
        },
        setUser: (state, user) => {
            (state.user = user), (state.isLoggedIn = true);
        },
        setError: (state, error) => {
            state.error = error;
            state.isLoggedIn = false;
        },
        setLoggedIn : (state, status) => {
            state.isLoggedIn = status
        },
        clearErrors: (state) => {
            state.error = {
                error: "",
                type: "",
            };
        },
    },
};
