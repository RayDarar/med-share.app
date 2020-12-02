import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    meta: {
      transitionIndex: 0,
    },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/stores",
    meta: {
      transitionIndex: 1,
    },
  },
  {
    path: "/medicines",
    meta: {
      transitionIndex: 2,
    },
    component: () => import("@/views/MedicinesView.vue"),
    children: [
      {
        path: "search",
        meta: {
          transitionIndex: 2,
        },
      },
      {
        path: "/",
        meta: {
          transitionIndex: 2,
        },
      },
    ],
  },
  {
    path: "/posts",
    meta: {
      transitionIndex: 3,
    },
  },
  {
    path: "/log-in",
    meta: {
      transitionIndex: 4,
    },
  },
  {
    path: "/register",
    meta: {
      transitionIndex: 5,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
