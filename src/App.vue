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
        <template v-if="!$store.state.loggedIn">
          <navigation-link to="/login">Войти</navigation-link>
          <navigation-link to="/register">Зарегистрироваться</navigation-link>
        </template>
        <template v-else>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn color="white" text v-bind="attrs" v-on="on" height="64px">
                {{ $store.state.user.FULLNAME }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-if="isAdmin" @click="toModeration">
                <v-list-item-title>Модерация</v-list-item-title>
              </v-list-item>
              <v-list-item @click="toPosts">
                <v-list-item-title>Мои объявления</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title>Выход</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
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
import { api } from "@/api";
import { getToken, setToken } from "@/utils";

@Component({
  components: { NavigationLink },
})
export default class App extends Vue {
  public async created() {
    const token = getToken();

    if (token) {
      const { data } = await api.get("/users/info");
      this.$store.commit("setUser", data);
      this.$store.commit("setLoggedIn", true);
    }
  }

  get isAdmin() {
    return this.$store.state.user.PHONE == "+7 (708) 614 46 72";
  }

  public logout() {
    setToken("", true);
    setToken("", false);
    this.$store.commit("setUser", {});
    this.$store.commit("setLoggedIn", false);
    this.$router.push("/");
  }

  public toPosts() {
    this.$router.push("/my-posts");
  }

  public toModeration() {
    this.$router.push("/moderation");
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap");

$font-family: "Montserrat", sans-serif;
* {
  font-family: "Montserrat", sans-serif;
}
</style>
