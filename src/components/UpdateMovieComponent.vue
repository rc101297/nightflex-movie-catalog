<script setup>
import { ref, computed, watchEffect } from "vue";
import { useGlobalStore } from "../stores/global.js";
import { Notyf } from "notyf";
import api from "../api";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["movieUpdated", "close"]);

const store = useGlobalStore();

const title = ref("");
const director = ref("");
const year = ref("");
const description = ref("");
const genre = ref("");

const loading = ref(false);
const error = ref("");

const notyf = new Notyf();

// Watch for movie changes and populate form
watchEffect(() => {
  if (props.movie) {
    title.value = props.movie.title || "";
    director.value = props.movie.director || "";
    year.value = props.movie.year || "";
    description.value = props.movie.description || "";
    genre.value = props.movie.genre || "";
  }
});

const isEnabled = computed(
  () =>
    title.value.trim() &&
    director.value.trim() &&
    year.value.trim() &&
    description.value.trim() &&
    genre.value.trim() &&
    !loading.value &&
    store.user.isAdmin &&
    (title.value !== props.movie.title ||
      director.value !== props.movie.director ||
      year.value !== props.movie.year ||
      description.value !== props.movie.description ||
      genre.value !== props.movie.genre)
);

async function handleSubmit(e) {
  e.preventDefault();
  if (!isEnabled.value) return;

  loading.value = true;
  error.value = "";

  try {
    const movieData = {
      title: title.value.trim(),
      director: director.value.trim(),
      year: year.value.trim(),
      description: description.value.trim(),
      genre: genre.value.trim(),
    };

    const res = await api.patch(
      `/movies/updateMovie/${props.movie._id}`,
      movieData
    );

    if (res.status === 200) {
      notyf.success("Movie updated successfully!");
      emits("movieUpdated", res.data.updatedMovie);
      emits("close");
    } else {
      throw new Error("Unexpected response");
    }
  } catch (err) {
    console.error("Error updating movie:", err);
    if (err.response) {
      error.value = err.response.data.message || "Failed to update movie";
      if (err.response.status === 401) {
        notyf.error("Unauthorized access");
      } else if (err.response.status === 403) {
        notyf.error("Access denied. Admins only.");
      } else if (err.response.status === 400) {
        notyf.error("All fields are required");
      } else {
        notyf.error(error.value);
      }
    } else {
      error.value = "Network error. Please try again.";
      notyf.error("Network error");
    }
  } finally {
    loading.value = false;
  }
}

function handleCancel() {
  emits("close");
}
</script>

<template>
  <div class="nf-modal-overlay" @click="$emit('close')">
    <div class="nf-modal-content nf-fade-in" @click.stop>
      <div class="nf-modal-header">
        <div class="nf-modal-title">
          <span class="nf-title-icon">✏️</span>
          <h2>Update Movie</h2>
        </div>
        <button
          class="nf-modal-close"
          @click="$emit('close')"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="nf-form">
        <!-- TITLE & DIRECTOR -->
        <div class="nf-form-group">
          <div class="nf-field">
            <label for="updateTitleInput" class="nf-label"
              >🎬 Movie Title</label
            >
            <input
              type="text"
              class="nf-input nf-fade-in"
              id="updateTitleInput"
              v-model="title"
              placeholder="Enter movie title"
              required
            />
          </div>

          <div class="nf-field">
            <label for="updateDirectorInput" class="nf-label"
              >👤 Director</label
            >
            <input
              type="text"
              class="nf-input nf-fade-in"
              id="updateDirectorInput"
              v-model="director"
              placeholder="Enter director name"
              required
            />
          </div>
        </div>

        <!-- YEAR & GENRE -->
        <div class="nf-form-group">
          <div class="nf-field">
            <label for="updateYearInput" class="nf-label"
              >📅 Release Year</label
            >
            <input
              type="text"
              class="nf-input nf-fade-in"
              id="updateYearInput"
              v-model="year"
              placeholder="e.g., 2020"
              required
            />
          </div>

          <div class="nf-field">
            <label for="updateGenreInput" class="nf-label">🎭 Genre</label>
            <input
              type="text"
              class="nf-input nf-fade-in"
              id="updateGenreInput"
              v-model="genre"
              placeholder="e.g., Action, Drama"
              required
            />
          </div>
        </div>

        <!-- DESCRIPTION -->
        <div class="nf-field nf-field-full nf-fade-in">
          <label for="updateDescriptionInput" class="nf-label"
            >📝 Description</label
          >
          <textarea
            class="nf-textarea"
            id="updateDescriptionInput"
            v-model="description"
            rows="4"
            placeholder="Write a brief description of the movie..."
            required
          ></textarea>
        </div>

        <!-- ERROR MESSAGE -->
        <div v-if="error" class="nf-error nf-fade-in" role="alert">
          <div class="nf-error-icon">⚠️</div>
          <p class="nf-error-text">{{ error }}</p>
        </div>

        <!-- SUBMIT BUTTONS -->
        <div class="nf-modal-actions">
          <button
            type="button"
            class="nf-btn-cancel"
            @click="handleCancel"
            :disabled="loading"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="nf-btn-submit nf-fade-in"
            :class="{
              'nf-btn-enabled': isEnabled,
              'nf-btn-disabled': !isEnabled,
            }"
            :disabled="!isEnabled"
          >
            <span class="nf-btn-text">
              {{ loading ? "Updating Movie..." : "Update Movie" }}
            </span>
            <div v-if="loading" class="nf-btn-spinner"></div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* MODAL OVERLAY */
.nf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 18, 38, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--nf-gap);
}

/* MODAL CONTENT */
.nf-modal-content {
  background: linear-gradient(135deg, var(--nf-surface), var(--nf-surface-2));
  border-radius: var(--nf-radius-lg);
  border: 1px solid rgba(255, 190, 46, 0.1);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--nf-shadow-2);
}

/* MODAL HEADER */
.nf-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--nf-gap) * 1.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nf-modal-title {
  display: flex;
  align-items: center;
  gap: var(--nf-gap);
  margin: 0;
}

.nf-modal-title h2 {
  font-size: var(--nf-h1);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0;
}

.nf-title-icon {
  font-size: var(--nf-h1);
}

.nf-modal-close {
  background: transparent;
  border: none;
  color: var(--nf-text-muted);
  cursor: pointer;
  padding: var(--nf-gap-xs);
  border-radius: var(--nf-radius-sm);
  transition: var(--nf-transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nf-modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--nf-text);
}

/* FORM CONTAINER */
.nf-form {
  max-width: none;
  padding: calc(var(--nf-gap) * 1.5);
}

/* FORM GROUPS */
.nf-form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--nf-gap);
  margin-bottom: var(--nf-gap);
}

@media (max-width: 768px) {
  .nf-form-group {
    grid-template-columns: 1fr;
  }
}

/* FIELDS */
.nf-field {
  display: flex;
  flex-direction: column;
}

.nf-field-full {
  margin-bottom: var(--nf-gap);
}

/* LABELS */
.nf-label {
  display: block;
  font-size: var(--nf-body);
  font-weight: 700;
  color: var(--nf-text);
  margin-bottom: var(--nf-gap-xs);
  font-family: var(--nf-font-main);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* INPUTS */
.nf-input {
  padding: calc(var(--nf-gap) * 0.75) var(--nf-gap);
  background: var(--nf-glass);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--nf-radius-sm);
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-size: var(--nf-body);
  transition: var(--nf-transition);
  backdrop-filter: blur(10px);
  outline: none;
}

.nf-input::placeholder {
  color: var(--nf-text-muted);
  opacity: 0.7;
}

.nf-input:focus {
  border-color: var(--nf-primary);
  background: var(--nf-surface);
  box-shadow: 0 0 20px rgba(255, 190, 46, 0.2);
  transform: translateY(-1px);
}

/* TEXTAREA */
.nf-textarea {
  padding: calc(var(--nf-gap) * 0.75) var(--nf-gap);
  background: var(--nf-glass);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--nf-radius-sm);
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-size: var(--nf-body);
  resize: vertical;
  min-height: 100px;
  transition: var(--nf-transition);
  backdrop-filter: blur(10px);
  outline: none;
}

.nf-textarea::placeholder {
  color: var(--nf-text-muted);
  opacity: 0.7;
}

.nf-textarea:focus {
  border-color: var(--nf-primary);
  background: var(--nf-surface);
  box-shadow: 0 0 20px rgba(255, 190, 46, 0.2);
  transform: translateY(-1px);
}

/* ERROR MESSAGE */
.nf-error {
  display: flex;
  align-items: center;
  gap: var(--nf-gap);
  padding: var(--nf-gap);
  background: rgba(255, 92, 92, 0.1);
  border: 1px solid rgba(255, 92, 92, 0.2);
  border-radius: var(--nf-radius);
  margin: var(--nf-gap) 0;
}

.nf-error-icon {
  font-size: var(--nf-h2);
  opacity: 0.8;
}

.nf-error-text {
  color: var(--nf-danger);
  font-weight: 600;
  font-size: var(--nf-body);
  margin: 0;
}

/* MODAL ACTIONS */
.nf-modal-actions {
  display: flex;
  gap: var(--nf-gap);
  justify-content: flex-end;
  margin-top: calc(var(--nf-gap) * 1.5);
  padding-top: var(--nf-gap);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.nf-btn-cancel {
  padding: calc(var(--nf-gap) * 0.75) calc(var(--nf-gap) * 2);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--nf-text-muted);
  font-family: var(--nf-font-main);
  font-weight: 600;
  border-radius: var(--nf-radius-lg);
  cursor: pointer;
  transition: var(--nf-transition);
}

.nf-btn-cancel:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: var(--nf-text);
}

.nf-btn-cancel:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nf-btn-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--nf-gap);
  padding: calc(var(--nf-gap) * 0.75) calc(var(--nf-gap) * 2);
  border-radius: var(--nf-radius-lg);
  font-family: var(--nf-font-main);
  font-weight: 700;
  font-size: var(--nf-body);
  cursor: pointer;
  transition: var(--nf-transition);
  border: none;
  min-width: 180px;
  position: relative;
  overflow: hidden;
}

.nf-btn-submit::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--nf-primary), var(--nf-primary-600));
  opacity: 0;
  transition: opacity var(--nf-transition);
}

.nf-btn-submit:not(:disabled)::before {
  opacity: 1;
}

.nf-btn-text,
.nf-btn-spinner {
  position: relative;
  z-index: 1;
}

.nf-btn-enabled {
  background: var(--nf-glass);
  color: #091821;
  border: 1px solid var(--nf-primary);
  box-shadow: var(--nf-shadow-1);
}

.nf-btn-enabled:hover {
  transform: translateY(-2px);
  box-shadow: var(--nf-shadow-2);
}

.nf-btn-disabled {
  background: var(--nf-surface-2);
  color: var(--nf-text-muted);
  cursor: not-allowed;
  opacity: 0.6;
}

/* SPINNER */
.nf-btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(9, 48, 33, 0.3);
  border-top: 2px solid #091821;
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

/* RESPONSIVE */
@media (max-width: 640px) {
  .nf-modal-actions {
    flex-direction: column-reverse;
  }

  .nf-modal-header {
    padding: var(--nf-gap);
  }

  .nf-form {
    padding: var(--nf-gap);
  }
}
</style>
