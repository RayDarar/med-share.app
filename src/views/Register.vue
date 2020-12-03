<template>
  <div id="register-view" class="px-16 pt-15 d-flex justify-space-between">
    <div class="info-wrapper">
      <h1 class="register-title">
        Регистрация
      </h1>

      <p class="my-8">
        Если у вас есть аккаунта, можете
        <router-link to="/login" class="primary--text">
          Войти здесь
        </router-link>
      </p>
      <v-form ref="form">
        <v-text-field
          v-model="phone"
          label="Фамилия Имя"
          outlined
          :rules="[rules.required]"
        ></v-text-field>
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
          v-model="accept"
          label="* Я соглашаюсь с правилами использования сервиса, а также с передачей и обработкой моих данных в Med-share. Я подтверждаю своё совершеннолетие и ответственность за размещение объявления"
          :rules="[rules.required]"
        ></v-checkbox>
        <v-btn color="primary" large width="300" @click="register">Зарегистрироваться</v-btn>
      </v-form>
    </div>
    <div class="illustration-wrapper">
      <v-img
        alt="Register page illustration"
        contain
        src="@/assets/register-illustration.svg"
        transition="scale-transition"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { VForm } from "@/@types";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RegisterView extends Vue {
  show = false;
  phone = "";
  password = "";
  fullname = "";
  accept = false;

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

  public register() {
    if (!this.$refs.form.validate()) return;

    console.log("Wow");
  }
}
</script>

<style lang="scss" scoped>
.info-wrapper {
  max-width: 550px;
  flex: 1;
}
.register-title {
  font-size: 2.2rem;
  font-weight: 600;
}
</style>
