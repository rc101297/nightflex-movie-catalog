<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global.js";
import { useMovieStore } from "../stores/movieStore.js";
import { Notyf } from "notyf";

const router = useRouter();
const store = useGlobalStore();
const movieStore = useMovieStore();

const notyf = new Notyf();

function viewMovie(movieId) {
  if (!store.user.token) {
    router.push({ name: "Login" });
    return;
  }
  router.push({ name: "MovieDetail", params: { id: movieId } });
}

onMounted(() => {
  movieStore.getMovies();
  if (movieStore.movieData.error) {
    notyf.error(movieStore.movieData.error);
  }
});
</script>

<template>
  <div>
    <!-- LOADING STATE -->
    <div v-if="movieStore.movieData.loading" class="nf-loading nf-fade-in">
      <div class="nf-spinner"></div>
      <p class="nf-loading-text">Discovering amazing movies...</p>
    </div>

    <!-- ERROR STATE -->
    <div
      v-else-if="movieStore.movieData.error"
      class="nf-error nf-fade-in"
      role="alert"
    >
      <div class="nf-error-icon">⚠️</div>
      <p class="nf-error-text">{{ movieStore.movieData.error }}</p>
    </div>

    <!-- MOVIES GRID -->
    <div v-else class="nf-grid">
      <div
        v-for="movie in movieStore.movieData.movies"
        :key="movie._id"
        class="nf-card nf-movie-card nf-fade-in"
        @click="viewMovie(movie._id)"
        role="button"
        tabindex="0"
        @keydown.enter="viewMovie(movie._id)"
        @keydown.space.prevent="viewMovie(movie._id)"
      >
        <!-- Movie Thumbnail -->
        <div class="nf-card-image">
          <div class="nf-placeholder-image">
            <div class="nf-film-icon">🎥</div>
          </div>
        </div>

        <!-- Movie Info -->
        <div class="nf-card-content">
          <h3 class="nf-movie-title">{{ movie.title }}</h3>

          <div class="nf-movie-meta">
            <div class="nf-meta-item">
              <span class="nf-meta-icon">👤</span>
              <span class="nf-meta-text">{{ movie.director }}</span>
            </div>

            <div class="nf-meta-item">
              <span class="nf-meta-icon">📅</span>
              <span class="nf-meta-text">{{ movie.year }}</span>
            </div>

            <div class="nf-meta-item">
              <span class="nf-meta-icon">🎭</span>
              <span class="nf-meta-text">{{ movie.genre }}</span>
            </div>
          </div>

          <p class="nf-movie-description">{{ movie.description }}</p>

          <!-- View Button -->
          <div class="nf-card-action">
            <button class="nf-btn-view" @click.stop="viewMovie(movie._id)">
              <span> View Movie</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Hover overlay effect -->
        <div class="nf-card-overlay">
          <div class="nf-overlay-content">
            <div class="nf-overlay-icon">🎪</div>
            <p>View movie details</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* STATE COMPONENTS */
.nf-loading,
.nf-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  padding: var(--nf-gap);
}

.nf-loading {
  color: var(--nf-text);
}

.nf-error {
  color: var(--nf-text-muted);
  background: linear-gradient(135deg, var(--nf-surface), var(--nf-surface-2));
  border-radius: var(--nf-radius);
  border: 2px solid rgba(255, 190, 46, 0.1);
}

.nf-error h3 {
  color: var(--nf-text);
  font-size: var(--nf-h2);
}

.nf-error p {
  margin: var(--nf-gap) 0;
}

.nf-error-icon {
  font-size: 64px;
  margin-bottom: var(--nf-gap);
  opacity: 0.6;
}

.nf-loading-text {
  color: var(--nf-text-muted);
  margin-top: var(--nf-gap);
}

/* SPINNER */
.nf-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--nf-glass);
  border-top: 4px solid var(--nf-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* MOVIE CARD */
.nf-grid {
  gap: 24px !important;
}
.nf-movie-card {
  cursor: pointer;
  transition: var(--nf-transition);
  position: relative;
  overflow: hidden;
}

.nf-movie-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--nf-shadow-2);
}

.nf-movie-card:hover .nf-card-overlay {
  opacity: 1;
}

.nf-movie-card:focus {
  outline: 2px solid var(--nf-primary);
  outline-offset: 2px;
}

/* CARD IMAGE */
.nf-card-image {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, var(--nf-surface), var(--nf-surface-2));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.nf-placeholder-image {
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 30% 20%,
      rgba(255, 190, 46, 0.15) 0%,
      transparent 50%
    ),
    linear-gradient(135deg, var(--nf-surface), var(--nf-surface-2));
}

.nf-film-icon {
  font-size: 48px;
  opacity: 0.4;
}

/* CARD CONTENT */
.nf-card-content {
  padding: var(--nf-gap);
}

.nf-movie-title {
  font-size: var(--nf-h2);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0 0 var(--nf-gap) 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
}

.nf-movie-meta {
  display: flex;
  flex-direction: column;
  gap: var(--nf-gap-xs);
  margin-bottom: var(--nf-gap);
}

.nf-meta-item {
  display: flex;
  align-items: center;
  gap: var(--nf-gap-xs);
}

.nf-meta-icon {
  opacity: 0.7;
  flex-shrink: 0;
}

.nf-meta-text {
  color: var(--nf-text-muted);
  font-size: var(--nf-caption);
  font-weight: 600;
}

.nf-movie-description {
  color: var(--nf-text-muted);
  font-size: var(--nf-caption);
  line-height: 1.4;
  margin: 0 0 var(--nf-gap) 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* CARD ACTION */
.nf-card-action {
  margin-top: var(--nf-gap);
}

.nf-btn-view {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--nf-gap-xs);
  padding: var(--nf-gap-xs) var(--nf-gap);
  background: var(--nf-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--nf-text-muted);
  font-weight: 600;
  font-family: var(--nf-font-main);
  border-radius: var(--nf-radius);
  transition: var(--nf-transition);
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.nf-btn-view:hover {
  background: var(--nf-primary);
  color: #091821;
  transform: translateX(2px);
}

/* HOVER OVERLAY */
.nf-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(4, 18, 38, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--nf-transition);
  backdrop-filter: blur(4px);
  z-index: 2;
}

.nf-overlay-content {
  text-align: center;
  color: var(--nf-text);
}

.nf-overlay-icon {
  font-size: var(--nf-h1);
  margin-bottom: var(--nf-gap-xs);
  opacity: 0.8;
}

.nf-overlay-content p {
  margin: 0;
  font-size: var(--nf-caption);
  font-weight: 600;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .nf-movie-title {
    font-size: var(--nf-body);
  }

  .nf-meta-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}

/* ERROR STATE ADDTIONS */
.nf-error-text {
  margin: 0;
  color: var(--nf-danger);
  font-weight: 600;
}
</style>
