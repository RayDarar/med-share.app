<template>
  <v-dialog v-model="dialog" persistent width="300">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-actions>
        <v-btn @click="close(false)" text color="primary">Нет</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="close(true)" color="primary">Да</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ConfirmationDialog extends Vue {
  dialog = false;
  resolve = null;
  title = "";

  public async show(title: string) {
    return new Promise((res) => {
      this.dialog = true;
      this.title = title;
      this.resolve = res;
    });
  }

  public close(answer: boolean) {
    this.dialog = false;
    this.resolve(answer);
  }
}
</script>

<style scoped></style>
