<template>
  <v-menu
    ref="menu"
    v-model="display"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="formattedDate"
        readonly
        v-bind="attrs"
        v-on="on"
        outlined
        label="Срок годности"
        @click:clear="clearHandler"
        @click:append="display = true"
        append-icon="mdi-calendar"
        :rules="rules"
      >
        <template #prepend-inner>
          <div class="mt-1 mr-2">
            <slot name="prepend-inner" />
          </div>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="okHandler"
      locale="ru-ru"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const DEFAULT_DATE = "";
@Component({
  model: {
    prop: "value",
    event: "input",
  },
  watch: {
    value: "setValue",
  },
})
export default class MonthPicker extends Vue {
  @Prop()
  readonly value: string;
  @Prop()
  readonly rules;

  @Prop({ default: null })
  readonly label: string;

  display = false;
  date = "";

  get formattedDate() {
    if (!this.value) return null;
    return this.value;
  }

  okHandler() {
    this.resetPicker();
    this.$emit("input", this.date);
  }
  resetPicker() {
    this.display = false;
  }
  clearHandler() {
    this.resetPicker();
    this.date = DEFAULT_DATE;
    this.$emit("input", undefined);
  }
  setValue(date: string) {
    this.date = date;
  }
}
</script>
