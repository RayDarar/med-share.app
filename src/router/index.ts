import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    meta: {},
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/stores",
  },
  {
    path: "/medicines",
    component: () => import("@/views/MedicinesView.vue"),
    children: [
      {
        path: "search",
      },
      {
        path: "/",
        component: () => import("@/views/medicines/Instructions.vue"),
      },
    ],
  },
  {
    path: "/posts",
  },
  {
    path: "/log-in",
  },
  {
    path: "/register",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
