<template>
  <div id="login-view" class="px-16 pt-15 d-flex justify-space-between">
    <div class="info-wrapper">
      <h1 class="login-title">
        Войдите чтобы подать объявление
      </h1>

      <p class="my-8">
        Если у вас нету аккаунта, <br />
        можете
        <router-link to="/register" class="primary--text">
          Зарегистрироваться здесь
        </router-link>
      </p>
      <p class="my-4 red--text" v-if="error">
        {{ error }}
      </p>
      <v-form ref="form">
        <v-text-field
          v-model="phone"
          v-mask="'+7 (###) ### ## ##'"
          label="Номер телефона"
          outlined
          :rules="[rules.required, rules.phone]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          outlined
          label="Пароль"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          :rules="[rules.required, rules.min]"
        ></v-text-field>
        <v-checkbox
          class="mt-0"
          v-model="stay"
          label="Запомнить меня"
        ></v-checkbox>
        <v-btn color="primary" large width="200" @click="login">Войти</v-btn>
      </v-form>
    </div>
    <div class="illustration-wrapper">
      <v-img
        alt="Login page illustration"
        contain
        src="@/assets/login-illustration.svg"
        transition="scale-transition"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { VForm } from "@/@types";
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";
import { setToken } from "@/utils";

@Component
export default class LoginView extends Vue {
  show = false;
  phone = "";
  password = "";
  stay = false;
  error = "";

  rules = {
    required: (value) => !!value || "Обязательное поле",
    min: (v) => v.length >= 8 || "Минимум 8 символов",
    phone: (v) =>
      /^(\+7) \([0-9]{3}\) ([0-9]{3}) ([0-9]{2}) ([0-9]{2})$/.test(v) ||
      "Правильный номер",
  };

  $refs: {
    form: VForm;
  };

  public login() {
    if (!this.$refs.form.validate()) return;

    api
      .post("/users/authenticate", {
        phone: this.phone,
        password: this.password,
      })
      .then(({ data }) => {
        setToken(data.token, this.stay);
        this.$store.commit("setUser", data.user);
        this.$store.commit("setLoggedIn", true);
        this.$router.push("/");
      })
      .catch(({ response }) => {
        const { message } = response.data;
        if (message == "User not found") this.error = "Пользователь не найден";
        if (message == "Passwords do not match")
          this.error = "Пароль не верный";
      });
  }
}
</script>

<style lang="scss" scoped>
.info-wrapper {
  max-width: 550px;
  flex: 1;
}
.login-title {
  font-size: 2.2rem;
  font-weight: 600;
}
</style>
