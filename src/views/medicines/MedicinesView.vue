<template>
  <div id="medicines-view" class="px-16 pt-15 d-flex justify-space-between">
    <div class="info-wrapper">
      <h1 class="medicines-title">
        Лекарства в аптеках
      </h1>

      <v-combobox
        ref="box"
        full-width
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
        @keydown.enter="openSearchPage"
        @input="openMedicinePage"
      >
      </v-combobox>

      <router-view :key="$route.fullPath"></router-view>
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
import { VCombobox } from "@/@types";

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

  $refs: {
    box: VCombobox;
  };

  public openMedicinePage({ ID }) {
    if (!ID) return;

    this.$router.push({
      name: "medicine-view",
      params: {
        id: ID,
      },
    });
  }

  public openSearchPage() {
    if (!this.query) return;

    this.$router.push({
      path: "/medicines/search",
      query: {
        query: this.query,
      },
    });
    this.$refs.box.blur();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.info-wrapper {
  max-width: 550px;
}
.medicines-title {
  font-size: 2.2rem;
  font-weight: 600;
}
.illustration-wrapper {
  position: fixed;
  right: 0;
  top: 64px;
  width: calc(100vw - 550px - 60px);
  height: calc(100vh - 64px);
  max-width: 800px;
}
</style>

<style lang="scss">
#medicines-view {
  .v-autocomplete.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: none;
  }
}
</style>
