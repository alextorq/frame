import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Cinema.vue";
import Suggest from "../views/Suggest.vue";
import Finish from "../views/Finish.vue";
import MostHard from "../views/MostHard.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/most__weekly",
        name: "Weekly",
        component: MostHard,
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