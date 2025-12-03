<script setup>
import { ref, computed, onMounted } from "vue";
import { useGlobalStore } from "../stores/global.js";
import { Notyf } from "notyf";
import api from "../api";

const store = useGlobalStore();

const title = ref("");
const director = ref("");
const year = ref("");
const description = ref("");
const genre = ref("");

const loading = ref(false);
const error = ref("");

const notyf = new Notyf();

const isEnabled = computed(
  () =>
    title.value.trim() &&
    director.value.trim() &&
    year.value.trim() &&
    description.value.trim() &&
    genre.value.trim() &&
    !loading.value &&
    store.user.isAdmin
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

    const res = await api.post("/movies/addMovie", movieData);

    if (res.status === 201) {
      notyf.success("Movie added successfully!");
      // Reset form
      title.value = "";
      director.value = "";
      year.value = "";
      description.value = "";
      genre.value = "";
    } else {
      throw new Error("Unexpected response");
    }
  } catch (err) {
    console.error("Error adding movie:", err);
    if (err.response) {
      error.value = err.response.data.message || "Failed to add movie";
      if (err.response.status === 401) {
        notyf.error("Unauthorized access");
      } else if (err.response.status === 403) {
        notyf.error("Access denied. Admins only.");
      } else if (err.response.status === 409) {
        notyf.error("Movie with the same title already exists");
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

onMounted(() => {
  // Check if user is logged in and is admin
  if (!store.user.token || !store.user.isAdmin) {
    notyf.error("Admin access required to add movies");
  }
});
</script>

<template>
  <form @submit.prevent="handleSubmit" class="nf-form">
    <!-- TITLE & DIRECTOR -->
    <div class="nf-form-group">
      <div class="nf-field">
        <label for="titleInput" class="nf-label">🎬 Movie Title</label>
        <input
          type="text"
          class="nf-input nf-fade-in"
          id="titleInput"
          v-model="title"
          placeholder="Enter movie title"
          required
        />
      </div>

      <div class="nf-field">
        <label for="directorInput" class="nf-label">👤 Director</label>
        <input
          type="text"
          class="nf-input nf-fade-in"
          id="directorInput"
          v-model="director"
          placeholder="Enter director name"
          required
        />
      </div>
    </div>

    <!-- YEAR & GENRE -->
    <div class="nf-form-group">
      <div class="nf-field">
        <label for="yearInput" class="nf-label">📅 Release Year</label>
        <input
          type="text"
          class="nf-input nf-fade-in"
          id="yearInput"
          v-model="year"
          placeholder="e.g., 2020"
          required
        />
      </div>

      <div class="nf-field">
        <label for="genreInput" class="nf-label">🎭 Genre</label>
        <input
          type="text"
          class="nf-input nf-fade-in"
          id="genreInput"
          v-model="genre"
          placeholder="e.g., Action, Drama"
          required
        />
      </div>
    </div>

    <!-- DESCRIPTION -->
    <div class="nf-field nf-field-full nf-fade-in">
      <label for="descriptionInput" class="nf-label">📝 Description</label>
      <textarea
        class="nf-textarea"
        id="descriptionInput"
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

    <!-- SUBMIT BUTTON -->
    <div class="nf-submit-container">
      <button
        id="addMovie"
        type="submit"
        class="nf-btn-submit nf-fade-in"
        :class="{
          'nf-btn-enabled': isEnabled,
          'nf-btn-disabled': !isEnabled,
        }"
        :disabled="!isEnabled"
      >
        <span class="nf-btn-text">
          {{ loading ? "Adding Movie..." : "✨ Add Movie" }}
        </span>
        <div v-if="loading" class="nf-btn-spinner"></div>
      </button>
    </div>
  </form>
</template>

<style scoped>
/* FORM CONTAINER */
.nf-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
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
  animation-delay: 0.1s;
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
  margin-bottom: var(--nf-gap);
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

/* SUBMIT BUTTON */
.nf-submit-container {
  text-align: center;
  margin-top: calc(var(--nf-gap) * 1.5);
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
  min-width: 200px;
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

/* FOCUS WITHIN ACCESSIBILITY */
.nf-field:focus-within .nf-label {
  color: var(--nf-primary);
}
</style>
