<template>
  <div class="pb-10">
    <p class="subtitle">Найдено {{ count }} аптек</p>
    <v-card
      v-for="store in list"
      :key="store.ID + Math.random()"
      class="mb-4"
      outlined
      elevation="0"
    >
      <v-card-title>{{ store.TITLE }}</v-card-title>
      <v-card-subtitle>{{ store.ADDRESS }}</v-card-subtitle>
      <v-card-text class="d-flex justify-space-between">
        <span>{{ store.PHONES }}</span>
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
    <gis-map ref="map" class="map" :stores="list"></gis-map>
  </div>
</template>

<script lang="ts">
import { Pharmacy } from "@/@types";
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";
import GisMap from "@/components/GisMap.vue";

@Component({
  components: { GisMap },
})
export default class StoresSearchView extends Vue {
  list: Pharmacy[] = [];
  count = 0;
  isEnd = false;

  $refs: {
    map: GisMap;
  };

  public async fetch(offset: number) {
    const { query } = this.$route.query;
    const {
      data: { result, count },
    } = await api.get(`/stores?query=${query}&offset=${offset}`);
    if (result.length == 0) {
      this.isEnd = true;
      return;
    }
    this.list.push(...result);
    this.count = count;

    this.$refs.map.updateMarkers();
  }

  async created() {
    await this.fetch(0);
  }
}
</script>

<style lang="scss" scoped>
.map {
  position: fixed;
  right: 0;
  top: 64px;
  width: calc(100vw - 550px - 60px - 58px);
  height: calc(100vh - 64px);
  z-index: 1;
}
</style>
