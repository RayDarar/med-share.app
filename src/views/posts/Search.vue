<template>
  <div class="pb-10">
    <p class="subtitle">Найдено {{ count }} препаратов</p>
    <p>
      Забирая препараты, Вы действуете на своё усмотрение и ответственность за
      ваше здоровье лежит на Вас. Med-share является только площадкой для
      размещения объявлений.
    </p>
    <v-card v-for="item in list" :key="item.ID + Math.random()" class="mb-5">
      <v-card-title>{{ item.TITLE }}</v-card-title>
      <v-card-subtitle class="primary--text">{{
        parseStatus(item.STATUS)
      }}</v-card-subtitle>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="6" class="py-0">Срок годности:</v-col>
            <v-col cols="6" class="py-0 primary--text">{{
              parseDate(item.EXPIRES)
            }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="py-0">Количество/состояние:</v-col>
            <v-col cols="6" class="py-0 primary--text">{{ item.AMOUNT }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="py-0">Способ хранения:</v-col>
            <v-col cols="6" class="py-0 primary--text">{{ item.STORAGE }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="py-0">Контакты:</v-col>
            <v-col cols="6" class="py-0 primary--text">{{
              item.CONTACTS
            }}</v-col>
          </v-row>
        </v-container>
        <hr class="my-2" />
        <p class="mb-0">{{ item.FULLNAME }}</p>
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
import { Post } from "@/@types";
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";

@Component
export default class PostSearchView extends Vue {
  list: Post[] = [];
  count = 0;
  isEnd = false;

  public async fetch(offset: number) {
    const { query } = this.$route.query;
    const {
      data: { result, count },
    } = await api.get(`/posts?query=${query}&offset=${offset}`);
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

  public parseDate(date: string) {
    const temp = new Date(date);
    return temp.toLocaleDateString().replace(/\//g, ".");
  }

  async created() {
    await this.fetch(0);
  }
}
</script>

<style lang="scss" scoped></style>
