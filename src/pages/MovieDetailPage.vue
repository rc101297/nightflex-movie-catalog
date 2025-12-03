<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global.js";
import { useMovieStore } from "../stores/movieStore";
import { Notyf } from "notyf";
import api from "../api";
import AddCommentComponent from "../components/AddCommentComponent.vue";
import UpdateMovieComponent from "../components/UpdateMovieComponent.vue";

const route = useRoute();
const router = useRouter();
const store = useGlobalStore();
const movieStore = useMovieStore();
const notyf = new Notyf();

const showUpdateModal = ref(false);
const deletingMovie = ref(false);

const movieId = route.params.id;

function refreshComments() {
  movieStore.getComments(movieId);
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function handleUpdateMovie() {
  showUpdateModal.value = true;
}

function handleMovieUpdated(updatedMovie) {
  movieStore.movieData.currentMovie = updatedMovie || {};
  showUpdateModal.value = false;
  notyf.success("Movie updated successfully!");
}

async function handleDeleteMovie() {
  const confirmed = confirm(
    "Are you sure you want to delete this movie? This action cannot be undone."
  );

  if (!confirmed) return;

  deletingMovie.value = true;

  try {
    await api.delete(`/movies/deleteMovie/${movieId}`);
    notyf.success("Movie deleted successfully!");
    router.push({ name: "Movies" });
  } catch (err) {
    console.error("Error deleting movie:", err);
    if (err.response) {
      const errorMessage =
        err.response.data.message || "Failed to delete movie";
      if (err.response.status === 401) {
        notyf.error("Unauthorized access");
      } else if (err.response.status === 403) {
        notyf.error("Access denied. Admins only.");
      } else {
        notyf.error(errorMessage);
      }
    } else {
      notyf.error("Network error. Please try again.");
    }
  } finally {
    deletingMovie.value = false;
  }
}

onMounted(() => {
  if (!store.user.token) {
    router.push({ name: "Login" });
    return;
  }
  movieStore.getMovieDetails(movieId);
  movieStore.getComments(movieId);
});
</script>

<template>
  <div>
    <!-- LOADING STATE -->
    <div v-if="movieStore.movieData.movieLoading" class="nf-loading">
      <div class="nf-spinner nf-fade-in"></div>
      <p class="nf-loading-text">Loading movie details...</p>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="movieStore.movieData.error" class="nf-error nf-fade-in">
      <div class="nf-icon">⚠️</div>
      <h3>Error</h3>
      <p>{{ movieStore.movieData.error }}</p>
    </div>

    <!-- NOT FOUND STATE -->
    <div
      v-else-if="!movieStore.movieData.currentMovie?.title"
      class="nf-not-found nf-fade-in"
    >
      <div class="nf-icon">🎬</div>
      <h3>Movie not found</h3>
      <p>The movie you're looking for doesn't exist.</p>
    </div>

    <!-- MOVIE DETAILS -->
    <div v-else class="nf-page">
      <section class="nf-chat-section">
        <div class="container">
          <!-- Back Button -->
          <div class="nf-back-controls nf-fade-in">
            <router-link :to="{ name: 'Movies' }" class="nf-btn-outline">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                />
              </svg>
              Back to Catalog
            </router-link>
          </div>

          <!-- Movie Details Card -->
          <div class="nf-card nf-card-movie nf-fade-in">
            <div class="nf-card-content">
              <div class="nf-movie-info">
                <div class="nf-movie-header">
                  <h1 class="nf-movie-title">
                    {{ movieStore.movieData.currentMovie?.title }}
                  </h1>

                  <!-- Admin Controls -->
                  <div
                    v-if="store.user.isAdmin"
                    class="nf-admin-controls nf-fade-in"
                  >
                    <button
                      class="nf-btn-admin nf-btn-edit"
                      @click="handleUpdateMovie"
                      :disabled="deletingMovie"
                      aria-label="Edit movie"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                        />
                      </svg>
                      Edit
                    </button>

                    <button
                      class="nf-btn-admin nf-btn-delete"
                      @click="handleDeleteMovie"
                      :disabled="deletingMovie"
                      aria-label="Delete movie"
                    >
                      <div v-if="deletingMovie" class="nf-small-spinner"></div>
                      <span v-else>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
                          />
                        </svg>
                        Delete
                      </span>
                    </button>
                  </div>
                </div>

                <div class="nf-movie-meta">
                  <div class="nf-meta-row">
                    <span class="nf-meta-label">🎬 Director</span>
                    <span class="nf-meta-value">{{
                      movieStore.movieData.currentMovie?.director
                    }}</span>
                  </div>
                  <div class="nf-meta-row">
                    <span class="nf-meta-label">📅 Year</span>
                    <span class="nf-meta-value">{{
                      movieStore.movieData.currentMovie?.year
                    }}</span>
                  </div>
                  <div class="nf-meta-row">
                    <span class="nf-meta-label">🎭 Genre</span>
                    <span class="nf-meta-value">{{
                      movieStore.movieData.currentMovie?.genre
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="nf-movie-description">
                <h3 class="nf-description-title">📖 Description</h3>
                <p class="nf-description-text">
                  {{ movieStore.movieData.currentMovie?.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Comments Section -->
          <div class="nf-card nf-card-comments nf-fade-in">
            <div class="nf-card-header">
              <span class="nf-comments-icon">💬</span>
              <h2 class="nf-comments-title">
                Comments
                <span class="nf-comment-count"
                  >({{ movieStore.movieData.comments.length }})</span
                >
              </h2>
            </div>
            <div class="nf-comments-content">
              <!-- Existing Comments -->
              <div
                v-if="
                  movieStore.movieData.commentsLoading &&
                  movieStore.movieData.comments.length === 0
                "
                class="nf-comments-loading"
              >
                <div class="nf-small-spinner"></div>
                <p>Loading comments...</p>
              </div>
              <div
                v-else-if="movieStore.movieData.comments.length === 0"
                class="nf-no-comments"
              >
                <div class="nf-no-comments-icon">💭</div>
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
              <div v-else class="nf-comments-list">
                <div
                  v-for="comment in movieStore.movieData.comments"
                  :key="comment._id"
                  class="nf-comment-item nf-fade-in"
                >
                  <div class="nf-comment-header">
                    <div class="nf-comment-avatar">
                      <span class="nf-avatar-icon">{{
                        comment.user?.username?.charAt(0)?.toUpperCase() || "U"
                      }}</span>
                    </div>
                    <div class="nf-comment-meta">
                      <span class="nf-comment-user">{{
                        comment.user?.username || "Anonymous"
                      }}</span>
                      <span class="nf-comment-date">{{
                        formatDate(comment.createdAt)
                      }}</span>
                    </div>
                  </div>
                  <div class="nf-comment-text">{{ comment.comment }}</div>
                </div>
              </div>

              <!-- Add Comment Form -->
              <div class="nf-add-comment-section">
                <AddCommentComponent
                  :movieId="movieId"
                  @commentAdded="refreshComments"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- UPDATE MOVIE MODAL -->
    <UpdateMovieComponent
      v-if="showUpdateModal"
      :movie="movieStore.movieData.currentMovie"
      @movieUpdated="handleMovieUpdated"
      @close="showUpdateModal = false"
    />
  </div>
</template>

<style scoped>
/* PAGE CONTAINER */
.nf-page {
  min-height: 100vh;
  background: var(--nf-bg);
  padding: var(--nf-gap) 0;
}

/* STATE COMPONENTS */
.nf-loading,
.nf-error,
.nf-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: var(--nf-gap);
}

.nf-loading {
  color: var(--nf-text);
}

.nf-error,
.nf-not-found {
  color: var(--nf-text-muted);
  background: linear-gradient(135deg, var(--nf-surface), var(--nf-surface-2));
  border-radius: var(--nf-radius);
  opacity: 0.9;
}

.nf-error h3,
.nf-not-found h3 {
  color: var(--nf-text);
  font-size: var(--nf-h2);
  margin: var(--nf-gap) 0 var(--nf-gap-xs) 0;
}

.nf-error p,
.nf-not-found p {
  margin: 0;
}

.nf-icon {
  font-size: 48px;
  margin-bottom: var(--nf-gap);
  opacity: 0.6;
}

/* SPINNER */
.nf-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--nf-glass);
  border-top: 3px solid var(--nf-primary);
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

.nf-loading-text {
  color: var(--nf-text-muted);
  margin-top: var(--nf-gap);
}

/* SECTION */
.nf-chat-section {
  padding: var(--nf-gap) 0;
}

/* BACK CONTROLS */
.nf-back-controls {
  margin-bottom: calc(var(--nf-gap) * 2);
}

.nf-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: var(--nf-gap-xs);
  padding: var(--nf-gap-xs) var(--nf-gap);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--nf-text-muted);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--nf-radius-sm);
  transition: var(--nf-transition);
  backdrop-filter: blur(10px);
}

.nf-btn-outline:hover {
  background: rgba(255, 190, 46, 0.1);
  border-color: var(--nf-primary);
  color: var(--nf-primary);
  transform: translateX(-2px);
}

/* CARD STYLES */
.nf-card-movie,
.nf-card-comments {
  margin-bottom: calc(var(--nf-gap) * 2);
  box-shadow: var(--nf-shadow-2);
}

.nf-card-content {
  padding: calc(var(--nf-gap) * 2);
}

.nf-movie-info {
  margin-bottom: calc(var(--nf-gap) * 2);
}

.nf-movie-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--nf-gap);
  margin-bottom: var(--nf-gap);
}

.nf-movie-title {
  font-size: var(--nf-h1);
  color: var(--nf-text);
  font-weight: 800;
  margin: 0;
  flex: 1;
  background: linear-gradient(135deg, var(--nf-text), var(--nf-primary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nf-admin-controls {
  display: flex;
  gap: var(--nf-gap-xs);
  align-items: center;
  flex-shrink: 0;
}

.nf-btn-admin {
  display: inline-flex;
  align-items: center;
  gap: var(--nf-gap-xs);
  padding: var(--nf-gap-xs) calc(var(--nf-gap) * 0.75);
  border-radius: var(--nf-radius-sm);
  font-family: var(--nf-font-main);
  font-weight: 600;
  font-size: var(--nf-caption);
  cursor: pointer;
  transition: var(--nf-transition);
  border: none;
  background: var(--nf-glass);
  backdrop-filter: blur(10px);
}

.nf-btn-edit {
  color: var(--nf-text);
  border: 1px solid rgba(255, 190, 46, 0.2);
}

.nf-btn-edit:hover:not(:disabled) {
  background: rgba(255, 190, 46, 0.1);
  border-color: var(--nf-primary);
  transform: translateY(-1px);
}

.nf-btn-delete {
  color: var(--nf-danger);
  border: 1px solid rgba(255, 92, 92, 0.2);
}

.nf-btn-delete:hover:not(:disabled) {
  background: rgba(255, 92, 92, 0.1);
  border-color: var(--nf-danger);
  transform: translateY(-1px);
}

.nf-btn-admin:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nf-movie-meta {
  display: flex;
  flex-direction: column;
  gap: var(--nf-gap);
  margin-bottom: var(--nf-gap);
}

.nf-meta-row {
  display: flex;
  align-items: center;
  gap: var(--nf-gap);
  flex-wrap: wrap;
}

.nf-meta-label {
  background: rgba(255, 190, 46, 0.1);
  color: var(--nf-primary);
  padding: 4px 8px;
  border-radius: var(--nf-radius-sm);
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.nf-meta-value {
  color: var(--nf-text);
  font-weight: 500;
}

.nf-movie-description {
  margin-top: calc(var(--nf-gap) * 2);
}

.nf-description-title {
  font-size: var(--nf-h2);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0 0 var(--nf-gap) 0;
}

.nf-description-text {
  color: var(--nf-text-muted);
  line-height: 1.6;
  font-size: var(--nf-body);
}

/* COMMENTS CARD */
.nf-card-header {
  display: flex;
  align-items: center;
  gap: var(--nf-gap);
  padding: calc(var(--nf-gap) * 2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin: calc(var(--nf-gap) * -2) calc(var(--nf-gap) * -2) var(--nf-gap)
    calc(var(--nf-gap) * -2);
}

.nf-comments-icon {
  font-size: var(--nf-h2);
}

.nf-comments-title {
  font-size: var(--nf-h2);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0;
}

.nf-comments-content {
  padding: calc(var(--nf-gap) * 2);
}

/* COMMENT COUNT */
.nf-comment-count {
  color: var(--nf-text-muted);
  font-size: var(--nf-caption);
  font-weight: 500;
  margin-left: var(--nf-gap-xs);
}

/* COMMENTS LOADING */
.nf-comments-loading,
.nf-no-comments {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: calc(var(--nf-gap) * 2) calc(var(--nf-gap));
  color: var(--nf-text-muted);
}

.nf-comments-loading {
  font-size: var(--nf-body);
}

.nf-comments-loading p,
.nf-no-comments p {
  margin: 0;
  font-size: var(--nf-caption);
}

.nf-comments-loading p {
  margin-top: var(--nf-gap-xs);
}

.nf-no-comments p {
  margin-top: var(--nf-gap);
}

/* SMALL SPINNER */
.nf-small-spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--nf-glass);
  border-top: 2px solid var(--nf-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.nf-no-comments-icon {
  font-size: 40px;
  opacity: 0.4;
  margin-bottom: var(--nf-gap);
}

/* COMMENTS LIST */
.nf-comments-list {
  display: flex;
  flex-direction: column;
  gap: var(--nf-gap);
  margin-bottom: calc(var(--nf-gap) * 2);
}

.nf-comment-item {
  background: var(--nf-glass);
  border-radius: var(--nf-radius);
  padding: calc(var(--nf-gap) * 1.25);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.nf-comment-header {
  display: flex;
  align-items: center;
  gap: var(--nf-gap);
  margin-bottom: var(--nf-gap);
}

.nf-comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--nf-primary), var(--nf-primary-600));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nf-avatar-icon {
  color: #091821;
  font-weight: 700;
  font-size: var(--nf-body);
}

.nf-comment-meta {
  flex: 1;
}

.nf-comment-user {
  color: var(--nf-text);
  font-weight: 600;
  font-size: var(--nf-body);
  display: block;
  margin-bottom: 2px;
}

.nf-comment-date {
  color: var(--nf-text-muted);
  font-size: var(--nf-caption);
  font-weight: 500;
}

.nf-comment-text {
  color: var(--nf-text-muted);
  line-height: 1.6;
  font-size: var(--nf-body);
  word-break: break-word;
}

/* ADD COMMENT SECTION SEPARATOR */
.nf-add-comment-section {
  padding-top: calc(var(--nf-gap) * 1.5);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: calc(var(--nf-gap) * 1.5);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .nf-meta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--nf-gap-xs);
  }

  .nf-meta-label {
    white-space: normal;
  }

  .nf-comment-item {
    padding: var(--nf-gap);
  }

  .nf-comment-header {
    flex-wrap: wrap;
    gap: var(--nf-gap-xs);
  }

  .nf-comment-avatar {
    width: 32px;
    height: 32px;
  }

  .nf-avatar-icon {
    font-size: var(--nf-caption);
  }
}
</style>
