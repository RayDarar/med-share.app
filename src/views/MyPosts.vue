<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MyPostsView extends Vue {
  public created() {
    if (!this.$store.state.loggedIn) {
      return this.$router.back();
    }
  }
}
</script>
