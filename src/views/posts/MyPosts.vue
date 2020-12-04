<template>
  <div id="my-posts" class="d-flex">
    <div class="pb-10 px-16 pt-15 wrapper">
      <h1 class="py-4 medicines-title">
        Мои объявления
      </h1>
      <p class="subtitle">Найдено {{ list.length }} препаратов</p>
      <v-card v-for="item in list" :key="item.ID + Math.random()" class="mb-5">
        <v-card-title>{{ item.TITLE }}</v-card-title>
        <v-card-subtitle class="d-flex justify-space-between">
          <span class="primary--text">{{ parseStatus(item.STATUS) }}</span>
          <span class="primary--text">{{
            parsePostStatus(item.POST_STATUS)
          }}</span>
        </v-card-subtitle>
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
              <v-col cols="6" class="py-0 primary--text">{{
                item.AMOUNT
              }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="py-0">Способ хранения:</v-col>
              <v-col cols="6" class="py-0 primary--text">{{
                item.STORAGE
              }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="py-0">Контакты:</v-col>
              <v-col cols="6" class="py-0 primary--text">{{
                item.CONTACTS
              }}</v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions
          class="pb-4 px-4"
          v-if="!['denied', 'archived'].includes(item.POST_STATUS)"
        >
          <v-btn
            width="100"
            color="primary"
            v-if="item.POST_STATUS == 'published'"
            @click="ask(item.ID)"
          >
            В Архив
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <confirmation-dialog ref="dialog"></confirmation-dialog>
  </div>
</template>

<script lang="ts">
import { Post } from "@/@types";
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

@Component({
  components: { ConfirmationDialog },
})
export default class MyPostsView extends Vue {
  list: Post[] = [];

  $refs: {
    dialog: ConfirmationDialog;
  };

  public async ask(id: number) {
    const result = await this.$refs.dialog.show("Вы уверены?");
    if (!result) return;
    await this.archive(id);
    const item = this.list.find((item) => item.ID == id);
    item.POST_STATUS = "archived";
  }

  public async fetch() {
    const { data } = await api.get("/posts/my");
    this.list = data;
  }

  public parseStatus(status: string) {
    if (status == "recipe") {
      return "По рецепту";
    }
    return "Без рецепта";
  }

  public parsePostStatus(status: string) {
    if (status == "process") return "В обработке";
    if (status == "published") return "Опубликовано";
    if (status == "denied") return "Отклонено";
    if (status == "archived") return "В архиве";
  }

  public parseDate(date: string) {
    const temp = new Date(date);
    return temp.toLocaleDateString().replace(/\//g, ".");
  }

  async created() {
    if (!this.$store.state.loggedIn) {
      return this.$router.back();
    }
    await this.fetch();
  }

  public async archive(id: number) {
    await api.put(`/posts/${id}/archive`);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 550px;
  flex: 1;
}
</style>
