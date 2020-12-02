<template>
  <v-app>
    <v-app-bar app color="#1768C4" dark class="px-16">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Med-share logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo-text.svg"
            transition="scale-transition"
            width="90"
          />
        </router-link>
      </div>
      <div class="d-flex align-center ml-16">
        <navigation-link to="/stores">Аптеки</navigation-link>
        <navigation-link to="/medicines">Лекарства</navigation-link>
        <navigation-link to="/posts">Объявления</navigation-link>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center ml-16">
        <navigation-link to="/log-in">Войти</navigation-link>
        <navigation-link to="/register">Зарегистрироваться</navigation-link>
      </div>
    </v-app-bar>
    <v-main>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import NavigationLink from "@/components/app-bar/NavigationLink.vue";
import { Route } from "vue-router";

@Component({
  components: { NavigationLink },
})
export default class App extends Vue {
  transitionName = "";

  @Watch("$route")
  public transitionHandler(to: Route, from: Route) {
    const toIndex: number = to.meta.transitionIndex || 0;
    const fromIndex: number = from.meta.transitionIndex || 0;

    if (toIndex == fromIndex) return (this.transitionName = "page-fade");
    if (toIndex < fromIndex) return (this.transitionName = "page-slide-right");
    if (toIndex > fromIndex) return (this.transitionName = "page-slide-left");
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap");

$font-family: "Montserrat", sans-serif;
* {
  font-family: "Montserrat", sans-serif;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.75s ease;
}
.page-fade-enter,
.page-fade-leave-active {
  opacity: 0;
}

.page-slide-left-enter,
.page-slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.page-slide-left-leave-active,
.page-slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
