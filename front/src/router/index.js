import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Cinema.vue";
import Suggest from "../views/Suggest";

const routes = [
    {
        path: "/",
        name: "Home",
        redirect: { name: 'Cinema', params: {id: ' '} }
    },
    {
        path: "/cinema/:id",
        name: "Cinema",
        component: Home,
    },
    {
        path: "/suggest",
        name: "Suggest",
        component: Suggest,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;