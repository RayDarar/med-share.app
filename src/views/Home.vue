<template>
  <div id="home-view" class="px-16 pt-15 d-flex justify-space-between">
    <div class="info-wrapper">
      <h1 class="home-title">
        Нужно найти необходимое <span class="highlight">лекарство</span>?
      </h1>
      <p class="home-description mt-10">
        Med-share — это онлайн сервис для быстрого поиска лекарств в Алматы.
        Сравнивайте цены, экономьте бюджет и свое время!
      </p>
    </div>
    <div class="illustration-wrapper">
      <v-img
        alt="Home page illustration"
        contain
        src="@/assets/home-Illustration.svg"
        transition="scale-transition"
      />
    </div>
    <img class="background-lines" src="@/assets/home-lines.svg" alt="Abstract lines" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

#home-view {
  background-color: transparent;
}

.info-wrapper {
  max-width: 550px;
}
.home-title {
  font-size: 4rem;
  line-height: 1.3em;

  .highlight {
    color: $colorPrimary;
  }
}
.home-description {
  font-size: 1.5rem;
}
.illustration-wrapper {
  z-index: 1;
}
.background-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
