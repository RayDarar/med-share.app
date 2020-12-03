<template>
  <div id="medicines-view" class="px-16 pt-15 d-flex justify-space-between">
    <div class="info-wrapper">
      <h1 class="medicines-title">
        Лекарства в аптеках
      </h1>

      <v-autocomplete
        :search-input.sync="query"
        solo
        clearable
        :loading="loading"
        :items="suggestions"
        item-text="TITLE"
        item-value="ID"
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
import { MedicinesSuggestion } from "@/@types";
import debounce from "lodash.debounce";
import { api } from "@/api";

@Component({
  watch: {
    query: "fetchSuggestions",
  },
  methods: {
    fetchSuggestions: debounce(async function(
      this: MedicinesView,
      val: string
    ) {
      if (!val) return;
      if (val.length < 1) return;
      console.log(this);
      this.loading = true;
      const { data } = await api.get("/medicines/autocomplete?query=" + val);
      this.suggestions = data;
      this.loading = false;
    },
    500),
  },
})
export default class MedicinesView extends Vue {
  query = "";
  suggestions: MedicinesSuggestion[] = [];
  loading = false;
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
