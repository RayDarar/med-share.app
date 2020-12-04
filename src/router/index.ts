import Vue from "vue";
import VueRouter, { RawLocation, Route, RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    meta: {},
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/stores",
    component: () => import("@/views/stores/StoresView.vue"),
    children: [
      {
        path: "search",
        component: () => import("@/views/stores/Search.vue"),
      },
      {
        path: "/",
        component: () => import("@/views/stores/Instructions.vue"),
      },
    ],
  },
  {
    path: "/medicines",
    component: () => import("@/views/medicines/MedicinesView.vue"),
    children: [
      {
        path: "search",
        component: () => import("@/views/medicines/Search.vue"),
      },
      {
        path: "/",
        component: () => import("@/views/medicines/Instructions.vue"),
      },
    ],
  },
  {
    path: "/medicines/:id",
    component: () => import("@/views/medicines/MedicineView.vue"),
    name: "medicine-view",
  },
  {
    path: "/posts",
    component: () => import("@/views/posts/PostsView.vue"),
    children: [
      {
        path: "search",
        component: () => import("@/views/posts/Search.vue"),
      },
      {
        path: "/",
        component: () => import("@/views/posts/Instructions.vue"),
      },
    ],
  },
  {
    path: "/my-posts",
    component: () => import("@/views/posts/MyPosts.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
  },
];

const originalPush = VueRouter.prototype.push as (
  l: RawLocation
) => Promise<Route>;
VueRouter.prototype.push = async function push(location: RawLocation) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
