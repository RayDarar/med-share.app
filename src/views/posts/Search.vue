<template>
  <div class="pb-10">
    <p class="subtitle">Найдено {{ count }} препаратов</p>
    <v-card v-for="item in list" :key="item.ID + Math.random()" class="mb-5">
      <v-card-title>{{ item.TITLE }}</v-card-title>
      <v-card-subtitle class="primary--text">{{
        parseStatus(item.STATUS)
      }}</v-card-subtitle>
      <v-card-text class="d-flex justify-space-between">
        <template v-if="item.AVAILABLE">
          <div class="wrapper d-flex align-center">
            <template v-if="item.PRICE">
              <span class="mr-2">Цена:</span>
              <v-chip color="secondary">от {{ item.PRICE }}</v-chip>
            </template>
          </div>
          <v-btn @click="routeTo(item.ID)" color="#171E54" text>
            Где купить
          </v-btn>
        </template>
        <template v-else>
          В данный момент нет в наличии
        </template>
      </v-card-text>
    </v-card>
    <v-btn
      large
      v-if="!isEnd"
      color="primary"
      width="100%"
      @click="fetch(list.length)"
    >
      Загрузить еще
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Medicine } from "@/@types";
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";

@Component
export default class PostSearchView extends Vue {
  list: Medicine[] = [];
  count = 0;
  isEnd = false;

  public async fetch(offset: number) {
    const { query } = this.$route.query;
    const {
      data: { result, count },
    } = await api.get(`/medicines?query=${query}&offset=${offset}`);
    if (result.length == 0) {
      this.isEnd = true;
      return;
    }
    this.list.push(...result);
    this.count = count;
  }

  public parseStatus(status: string) {
    if (status == "recipe") {
      return "По рецепту";
    }
    return "Без рецепта";
  }

  public routeTo(id: number) {
    this.$router.push({
      name: "medicine-view",
      params: {
        id: id + "",
      },
    });
  }

  async created() {
    await this.fetch(0);
  }
}
</script>

<style lang="scss" scoped></style>
