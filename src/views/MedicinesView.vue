<template>
  <div id="medicines-view" class="px-16 pt-15 d-flex justify-space-between">
    <div class="info-wrapper">
      <h1 class="medicines-title">
        Лекарства в аптеках
      </h1>

      <v-autocomplete
        v-model="query"
        solo
        clearable
        placeholder="Введите название препарата"
        append-icon="mdi-magnify"
        class="mt-10"
      ></v-autocomplete>

      <router-view class="mt-10"></router-view>
    </div>
    <div class="illustration-wrapper">
      <v-img
        alt="Medicines page illustration"
        contain
        src="@/assets/medicines-illustration.svg"
        transition="scale-transition"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MedicinesView extends Vue {
  query = "";
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.info-wrapper {
  max-width: 550px;
  flex: 1;
}
.medicines-title {
  font-size: 2.2rem;
  font-weight: 600;
}
</style>

<style lang="scss">
#medicines-view {
  .v-autocomplete.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: none;
  }
}
</style>
