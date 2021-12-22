import Vue from "vue";
import VueRouter from "vue-router";
import ExampleComponent from "../components/ExampleComponent"


Vue.use(VueRouter) // that is not in tut.

const routes = [{
        path: "/",
        component: ExampleComponent,
        name: "Home"
    }];

const router = new VueRouter({routes})

export default router
