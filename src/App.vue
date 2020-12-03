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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationLink from "@/components/app-bar/NavigationLink.vue";

@Component({
  components: { NavigationLink },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap");

$font-family: "Montserrat", sans-serif;
* {
  font-family: "Montserrat", sans-serif;
}
</style>
