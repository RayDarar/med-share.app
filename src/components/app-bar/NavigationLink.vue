<template>
  <router-link :to="to" class="white--text text-decoration-none mr-10" active-class="nav-link_active">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class NavigationLink extends Vue {
  @Prop()
  to: string;
}
</script>

<style lang="scss" scoped>
.nav-link_active {
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: -0.2em;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
  }
}
</style>
