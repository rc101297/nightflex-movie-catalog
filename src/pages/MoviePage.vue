<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
import { Notyf } from "notyf";
import api from "../api";
import AddMovieComponent from "../components/AddMovieComponent.vue";
import MoviesComponent from "../components/MoviesComponent.vue";

const router = useRouter();
const store = useGlobalStore();
const notyf = new Notyf();

// Check authentication
// onMounted(() => {
//   if (!store.user.token) {
//     router.push({ name: "Login" });
//     return;
//   }
// });
</script>

<template>
  <div class="nf-page">
    <!-- HEADER -->
    <header class="nf-hero">
      <div class="container">
        <div class="nf-hero-content nf-fade-in">
          <h1 class="nf-hero-title">🎬 Movie Catalog</h1>
          <p class="nf-hero-subtitle">
            Discover, explore, and curate your perfect movie collection.
          </p>
        </div>
      </div>
      <div class="nf-hero-bg"></div>
    </header>

    <!-- ADD MOVIE SECTION -->
    <section class="nf-section" v-if="store.user.isAdmin">
      <div class="container">
        <div class="nf-card nf-card-elevated">
          <div class="nf-card-header">
            <span class="nf-badge nf-badge-large">🎥 Add New Movie</span>
          </div>
          <AddMovieComponent />
        </div>
      </div>
    </section>

    <!-- MOVIES CATALOG SECTION -->
    <section class="nf-section">
      <div class="container">
        <div class="nf-card nf-card-elevated">
          <div class="nf-card-header">
            <span class="nf-badge nf-badge-large">🎞️ Movie Collection</span>
          </div>
          <MoviesComponent />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* PAGE CONTAINER */
.nf-page {
  min-height: 100vh;
  background: var(--nf-bg);
}

/* HERO SECTION */
.nf-hero {
  position: relative;
  padding: calc(var(--nf-gap) * 4) 0;
  background: linear-gradient(
    135deg,
    rgba(4, 18, 38, 0.9) 0%,
    rgba(11, 42, 69, 0.8) 50%,
    rgba(15, 89, 105, 0.7) 100%
  );
  overflow: hidden;
}

.nf-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 30% 20%,
      rgba(255, 190, 46, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 190, 46, 0.08) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.nf-hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.nf-hero-title {
  font-size: clamp(var(--nf-h1), 4vw, 60px);
  font-weight: 800;
  color: var(--nf-text);
  margin: 0 0 var(--nf-gap) 0;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.nf-hero-subtitle {
  font-size: var(--nf-body);
  color: var(--nf-text-muted);
  line-height: 1.5;
  max-width: 500px;
  margin: 0 auto;
}

/* SECTION SPACING */
.nf-section {
  padding: calc(var(--nf-gap) * 3) 0;
}

.nf-section:not(:last-child) {
  padding-bottom: calc(var(--nf-gap) * 4);
}

/* CARD ENHANCEMENTS */
.nf-card-header {
  margin-bottom: var(--nf-gap);
  text-align: center;
}

.nf-badge-large {
  font-size: var(--nf-h2) !important;
  padding: var(--nf-gap) calc(var(--nf-gap) * 1.5) !important;
}

.nf-card-elevated {
  box-shadow: var(--nf-shadow-2);
  border: 1px solid rgba(255, 190, 46, 0.1) !important;
  padding: 40px;
}
</style>
