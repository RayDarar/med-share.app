<template>
  <div id="gis-map"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DG from "2gis-maps";
import { Pharmacy } from "@/@types";

@Component({})
export default class GisMap extends Vue {
  map = {};

  @Prop()
  stores: Pharmacy[];

  mounted() {
    this.map = DG.map("gis-map", {
      center: [43.24, 76.93],
      zoom: 13,
    });

    this.stores.forEach((store) => {
      const { LATITUDE, LONGITUDE } = store;
      if (!LATITUDE || !LONGITUDE) return;

      DG.marker([LATITUDE, LONGITUDE], {
        riseOnHover: true,
      }).addTo(this.map).bindPopup(store.TITLE);
    });
  }
}
</script>
