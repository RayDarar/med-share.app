<template>
  <div id="my-posts" class="d-flex pb-10 pt-15 px-16">
    <div class="wrapper">
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
    <v-form class="ml-10 form" ref="form" lazy-validation>
      <h1 class="py-4 medicines-title">
        Подать объявление
      </h1>
      <v-combobox
        ref="box"
        full-width
        :search-input.sync="title"
        solo
        clearable
        :loading="loading"
        :items="suggestions"
        item-text="TITLE"
        item-value="ID"
        placeholder="Введите название препарата"
        append-icon="mdi-magnify"
        class="mt-10"
      >
      </v-combobox>
      <v-radio-group v-model="recipe" class="mt-0">
        <v-radio label="Без рецепта" value="no_recipe"></v-radio>
        <v-radio label="По рецепту" value="recipe"></v-radio>
      </v-radio-group>
      <v-text-field
        v-model="amount"
        label="Количество или состояние"
        outlined
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="storage"
        label="Способ хранения"
        outlined
        :rules="[rules.required]"
      ></v-text-field>
      <date-picker v-model="expires" :rules="[rules.required]"></date-picker>
      <v-text-field
        v-model="contacts"
        label="Контакты"
        outlined
        :rules="[rules.required]"
      ></v-text-field>
      <v-checkbox
        class="mt-0"
        v-model="accept"
        label="* Я принимаю Правила размещения объявлений и Условия использования сайта"
        :rules="[rules.required]"
      ></v-checkbox>
      <v-btn color="primary" @click="add">Добавить</v-btn>
    </v-form>
    <confirmation-dialog ref="dialog"></confirmation-dialog>
  </div>
</template>

<script lang="ts">
import { MedicinesSuggestion, Post } from "@/@types";
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import DatePicker from "@/components/DatePicker.vue";
import { VForm } from "@/@types";
import debounce from "lodash.debounce";

@Component({
  components: { ConfirmationDialog, DatePicker },
  watch: {
    title: "fetchSuggestions",
  },
  methods: {
    fetchSuggestions: debounce(async function(this: MyPostsView, val: string) {
      if (!val) return;
      if (val.length < 1) return;
      this.loading = true;
      const { data } = await api.get("/medicines/autocomplete?query=" + val);
      this.suggestions = data;
      this.loading = false;
    }, 500),
  },
})
export default class MyPostsView extends Vue {
  list: Post[] = [];
  title = "";
  suggestions: MedicinesSuggestion[] = [];
  loading = false;
  recipe = "";
  amount = "";
  storage = "";
  expires = "";
  contacts = "";
  accept = false;

  $refs: {
    dialog: ConfirmationDialog;
    form: VForm;
  };

  rules = {
    required: (value) => !!value || "Обязательное поле",
    min: (v) => v.length >= 8 || "Минимум 8 символов",
    phone: (v) =>
      /^(\+7) \([0-9]{3}\) ([0-9]{3}) ([0-9]{2}) ([0-9]{2})$/.test(v) ||
      "Правильный номер",
  };

  public async ask(id: number) {
    const result = await this.$refs.dialog.show("Вы уверены?");
    if (!result) return;
    await this.archive(id);
    const item = this.list.find((item) => item.ID == id);
    item.POST_STATUS = "archived";
  }

  public async add() {
    if (!this.$refs.form.validate()) return;

    const result = await this.$refs.dialog.show("Вы уверены?");
    if (!result) return;
    await api.post("/posts", {
      title: this.title,
      status: this.recipe,
      amount: this.amount,
      storage: this.storage,
      expires: new Date(Date.parse(this.expires)).toString(),
      contacts: this.contacts,
    });
    this.$refs.form.reset();
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
    if (status == "processing") return "В обработке";
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
