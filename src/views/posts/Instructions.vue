<template>
  <v-timeline dense>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 1</v-card-title>
        <v-card-text>
          Начните вводить название препарата в строку поиска и выберите нужный
          препарат из выпадающего списка.
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 2</v-card-title>
        <v-card-text>
          Далее сервис покажет объявления, где имеется искомый препарат. Из
          объявлений выберите вам подходящее.
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 3</v-card-title>
        <v-card-text>
          По окончанию поиска желательно позвонить автору объвления и уточнить
          наличие препарата.
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PostsInstructions extends Vue {}
</script>

<style lang="scss" scoped></style>
