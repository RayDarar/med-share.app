<template>
  <div id="medicine-view" class="d-flex justify-space-between" v-if="medicine">
    <div class="info-wrapper pl-16 pt-15 mr-6">
      <h1 class="medicine-title">
        {{ medicine.TITLE }}
      </h1>

      <v-card outlined elevation="0" class="mt-8">
        <v-card-subtitle class="d-flex justify-space-between">
          <span class="primary--text">{{ parseStatus(medicine.STATUS) }}</span>
          <span v-if="!medicine.AVAILABLE">
            В данный момент нет в наличии
          </span>
        </v-card-subtitle>
        <v-card-text v-if="analogs.length" class="px-4 pb-4">
          <v-btn color="primary" small @click="dialog = true">
            Аналоги ({{ analogs.length }})
          </v-btn>
        </v-card-text>
      </v-card>
      <p class="my-8">Найдено {{ count }} аптек</p>
      <v-card
        v-for="store in stores"
        :key="store.ID + Math.random()"
        class="mb-4"
        outlined
        elevation="0"
      >
        <v-card-title>{{ store.TITLE }}</v-card-title>
        <v-card-subtitle>{{ store.ADDRESS }}</v-card-subtitle>
        <v-card-text class="d-flex justify-space-between">
          <span>{{ store.PHONES }}</span>
          <v-chip v-if="store.PRICE" color="secondary">{{
            store.PRICE
          }}</v-chip>
          <span v-else>Уточните у продавца</span>
        </v-card-text>
      </v-card>
    </div>
    <gis-map v-if="stores" class="map" :stores="stores"></gis-map>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>Аналоги</v-card-title>
        <v-card-text>
          <v-card
            v-for="item in analogs"
            :key="item.ID + Math.random()"
            class="mb-5"
          >
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
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn text @click="dialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";
import { Medicine, Pharmacy } from "@/@types";
import GisMap from "@/components/GisMap.vue";

@Component({
  components: { GisMap },
})
export default class MedicineView extends Vue {
  medicine: Medicine = null;
  analogs: Medicine[] = [];
  stores: Pharmacy[] = null;
  count = 0;
  dialog = false;

  async created() {
    const { id } = this.$route.params;
    const { data } = await api.get("/medicines/" + id);
    if (!data.medicine) {
      return this.$router.push("/medicines");
    }
    const { medicine, analogs } = data;
    this.medicine = medicine;
    this.analogs = analogs;

    const {
      data: { result, count },
    } = await api.get("/stores/by-drug-id/" + id);
    this.stores = result;
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
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.info-wrapper {
  width: 550px;
}
.medicine-title {
  font-size: 2.2rem;
  font-weight: 600;
}
.map {
  position: fixed;
  right: 0;
  top: 64px;
  width: calc(100vw - 500px - 60px - 24px);
  height: calc(100vh - 64px);
}
</style>
