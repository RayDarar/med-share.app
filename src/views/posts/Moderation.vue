<template>
  <div id="my-posts" class="d-flex pb-10 pt-15 px-16">
    <div class="wrapper">
      <h1 class="py-4 medicines-title">
        Объявления на подтверждение
      </h1>
      <p class="subtitle">Найдено {{ list.length }} препаратов</p>
      <v-card v-for="item in list" :key="item.ID + Math.random()" class="mb-5">
        <v-card-title>{{ item.TITLE }}</v-card-title>
        <v-card-subtitle class="d-flex justify-space-between">
          <span class="primary--text">{{ parseStatus(item.STATUS) }}</span>
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
        <v-card-actions class="pb-4 px-4">
          <v-btn width="150" color="primary" @click="confirm(item.ID)">
            Подтвердить
          </v-btn>
          <v-btn width="150" color="primary" @click="deny(item.ID)">
            Отказать
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
export default class ModerationView extends Vue {
  list: Post[] = [];

  $refs: {
    dialog: ConfirmationDialog;
  };

  public async confirm(id: number) {
    const result = await this.$refs.dialog.show("Вы уверены?");
    if (!result) return;
    await api.put(`/posts/${id}/confirm`);
    const item = this.list.find((item) => item.ID == id);
    item.POST_STATUS = "published";
  }

  public async deny(id: number) {
    const result = await this.$refs.dialog.show("Вы уверены?");
    if (!result) return;
    await api.put(`/posts/${id}/deny`);
    this.list = this.list.filter((item) => item.ID != id);
  }

  public async fetch() {
    const { data } = await api.get("/posts/confirmation");
    this.list = data;
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
    if (!this.$store.state.loggedIn || !this.isAdmin) {
      return this.$router.back();
    }
    await this.fetch();
  }

  get isAdmin() {
    return this.$store.state.user.PHONE == "+7 (708) 614 46 72";
  }
}
</script>

<style lang="scss" scoped>
.wrapper,
.form {
  max-width: 550px;
  flex: 1;
}
</style>

<style lang="scss">
#my-posts {
  .v-autocomplete.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: none;
  }
}
</style>
