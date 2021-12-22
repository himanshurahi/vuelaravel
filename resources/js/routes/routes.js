import Vue from "vue";
import VueRouter from "vue-router";
import ExampleComponent2 from "../components/ExampleComponent2"
import Login from "../components/Login"
import ProductsList from "../components/Products/ProductsList"
import Register from "../components/Register"
import store from "../store";


Vue.use(VueRouter) // that is not in tut.

const routes = [
    {
        path: "/",
        component: ProductsList,
        name: "Home",
        beforeEnter: requireLogin
    }, {
        path: "/second",
        component: ExampleComponent2,
        name: "second"
    }, {
        path: "/login",
        component: Login,
        name: "Login"
    }, {
        path: "/register",
        component: Register,
        name: "Register"
    }
];

const router = new VueRouter({routes, mode: "history"})

function requireLogin(to, from, next) {

    const authenticated = localStorage.getItem('token');
    if (authenticated) {
        next(true);
    } else {
        next({
            path: '/login',
        })
    }
}

export default router
