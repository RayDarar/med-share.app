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
      <div class="button-wrapper mt-10 d-flex">
        <v-btn color="primary" @click="to('/medicines')">Найти в Аптеках</v-btn>
        <v-btn color="primary" class="ml-4" @click="to('/posts')"
          >Найти в объявлениях</v-btn
        >
      </div>
    </div>
    <div class="illustration-wrapper">
      <v-img
        alt="Home page illustration"
        contain
        src="@/assets/home-Illustration.svg"
        transition="scale-transition"
      />
    </div>
    <img
      class="background-lines"
      src="@/assets/home-lines.svg"
      alt="Abstract lines"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class HomeView extends Vue {
  public to(path: string) {
    this.$router.push(path);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.info-wrapper {
  max-width: 500px;
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
.illustration-wrapper,
.info-wrapper {
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
