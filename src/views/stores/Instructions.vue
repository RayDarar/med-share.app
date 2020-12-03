<template>
  <v-timeline dense>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 1</v-card-title>
        <v-card-text>
          Если ищите конкретную аптеку по названию или адресу, начните вводить
          данные в строку поиска.
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 2</v-card-title>
        <v-card-text>
          Выберите нужную аптеку из выпадающего списка. Так же вы можете
          использовать поиск аптек рядом с помощью карты.
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 3</v-card-title>
        <v-card-text>
          После успешного поиска аптеки и препарата, рекомендуем позвонить в
          аптеку и уточнить его наличие.
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class StoresInstructions extends Vue {}
</script>

<style lang="scss" scoped></style>
