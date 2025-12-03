<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { useGlobalStore } from "./stores/global.js";
import { onBeforeMount } from "vue";

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
  setup() {
    const { getUserDetails } = useGlobalStore();

    onBeforeMount(() => getUserDetails(localStorage.getItem("token")));
  },
};
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <NavbarComponent />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
main {
  padding: calc(var(--nf-gap) * 4) 0;
}
</style>
