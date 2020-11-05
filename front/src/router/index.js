import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Cinema.vue";
import Suggest from "../views/Suggest";
import Finish from "../views/Finish";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/suggest",
        name: "Suggest",
        component: Suggest,
    },
    {
        path: "/finish",
        name: "Finish",
        component: Finish,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;