import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/stores",
    meta: {
      transitionIndex: 0,
    },
  },
  {
    path: "/medicines",
    meta: {
      transitionIndex: 1,
    },
  },
  {
    path: "/posts",
    meta: {
      transitionIndex: 2,
    },
  },
  {
    path: "/log-in",
    meta: {
      transitionIndex: 3,
    },
  },
  {
    path: "/register",
    meta: {
      transitionIndex: 4,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
