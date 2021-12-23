import router from "../../routes/routes";
export default {
    state: {
        user: null,
        isLoggedIn: false,
        status : {
            login : {
                loading : false,
                error : ""
            },
            signup : {
                loading : false,
                error : ""
            },
            fetchUser : {
                loading : false,
                error : ""
            },
            logout : {
                loading : false,
                error : ""
            }
        },
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
        status : (state) => state.status
    },
    actions: {
        async login({ commit }, user) {
            commit("setLoading", {dataName : 'login', status : true});
            try {
                const response = await axios.post("api/login", user);
                console.log(response.data);
                commit("setUser", response.data.user);
                localStorage.setItem("token", response.data.token);
                commit("setLoading", {dataName : 'login', status : false});
                commit("clearErrors");
                router.push({ name: "Home" });
            } catch (e) {
                commit("setError", {dataName : 'login', error : e.response.data});
                commit("setLoading", {dataName : 'login', status : false});           

            }
        },

        async Signup({ commit }, user) {
            commit("setLoading", {dataName : 'signup', status : true});
            try {
                const response = await axios.post("api/register", user);
                localStorage.setItem("token", response.data.token);
                commit("setUser", response.data.user);
                commit("setLoading", {dataName : 'signup', status : false});
                commit("clearErrors");
                router.push({ name: "Home" });
            } catch (e) {
                commit("setLoading", {dataName : 'signup', status : false});
                commit("setError", {dataName : 'signup', error : e.response.data});
            }
        },

        async logout({ commit }) {
            commit("setLoading", {dataName : 'logout', status : true});
            let token = localStorage.getItem("token");
            try {
                let res = await axios.get("api/logout", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                localStorage.removeItem("token");
                commit("setUser", null);
                commit("setLoggedIn", false);
                commit("setLoading", {dataName : 'logout', status : false});
                router.push({ name: "Login" });
            } catch (e) {
                commit("setError", {dataName : 'logout', error : e.response.data});
                commit("setLoading", {dataName : 'logout', status : false});
            }
        },

        async fetchUser({ commit }) {
            commit("setLoading", {dataName : 'fetchUser', status : true});
            let token = localStorage.getItem("token");
            try {
                let res = await axios.get("api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                commit("setUser", res.data);
                commit("setLoading", {dataName : 'fetchUser', status : false});
            } catch (e) {
                commit("setError", {dataName : 'fetchUser', error : e.response.data});
                localStorage.removeItem("token");
                commit("setLoading", {dataName : 'fetchUser', status : false});
            }
        },
    },
    mutations: {
       
        setUser: (state, user) => {
            (state.user = user), (state.isLoggedIn = true);
        },
        setLoading: (state, { dataName, status }) => {
            state.status[dataName].loading = status;
        },
        setError: (state, { dataName, error }) => {
            state.status[dataName].error = error;
        },
        setLoggedIn: (state, status) => {
            state.isLoggedIn = status;
        },
        clearErrors: (state) => {
            state.error = {
                error: "",
                type: "",
            };
        },
    },
};
