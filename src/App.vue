<template>
  <v-app id="app">
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
  transitionName = "fade";

  @Watch("$route")
  public transitionHandler(to: Route, from: Route) {
    const toIndex: number = to.meta.transitionIndex || 0;
    const fromIndex: number = from.meta.transitionIndex || 0;

    if (toIndex == fromIndex) return (this.transitionName = "fade");
    if (toIndex < fromIndex) return (this.transitionName = "slide-right");
    if (toIndex > fromIndex) return (this.transitionName = "slide-left");
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap");

$font-family: "Montserrat", sans-serif;
* {
  font-family: "Montserrat", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
