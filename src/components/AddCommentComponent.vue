<script setup>
import { ref, computed } from "vue";
import { useGlobalStore } from "../stores/global.js";
import { Notyf } from "notyf";
import api from "../api";

const props = defineProps({
  movieId: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["commentAdded"]);

const store = useGlobalStore();
const notyf = new Notyf();

const comment = ref("");
const loading = ref(false);
const error = ref("");

const isEnabled = computed(
  () => comment.value.trim() && !loading.value && store.user.token
);

async function handleSubmit(e) {
  e.preventDefault();
  if (!isEnabled.value) return;

  loading.value = true;
  error.value = "";

  try {
    const res = await api.patch(`/movies/addComment/${props.movieId}`, {
      comment: comment.value.trim(),
    });

    if (res.status === 200) {
      notyf.success("Comment added successfully!");
      comment.value = ""; // Reset form
      emits("commentAdded"); // Emit event to refresh comments
    } else {
      throw new Error("Unexpected response");
    }
  } catch (err) {
    console.error("Error adding comment:", err);
    if (err.response) {
      error.value = err.response.data.message || "Failed to add comment";
      if (err.response.status === 401) {
        notyf.error("Unauthorized access");
      } else if (err.response.status === 404) {
        notyf.error("Movie not found");
      } else if (err.response.status === 400) {
        if (error.value.includes("already commented")) {
          notyf.error("You have already commented on this movie");
        } else {
          notyf.error("Comment is required");
        }
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
</script>

<template>
  <div class="nf-comment-form">
    <form @submit.prevent="handleSubmit" class="nf-form">
      <!-- COMMENT INPUT -->
      <div class="nf-field nf-fade-in">
        <div class="nf-comment-header">
          <div class="nf-comment-icon">💬</div>
          <label for="commentInput" class="nf-label">Share your thoughts</label>
        </div>
        <textarea
          class="nf-textarea"
          id="commentInput"
          v-model="comment"
          rows="4"
          placeholder="Write your review or share what you think about this movie..."
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
          type="submit"
          class="nf-btn-submit nf-fade-in"
          :class="{
            'nf-btn-enabled': isEnabled,
            'nf-btn-disabled': !isEnabled,
          }"
          :disabled="!isEnabled"
        >
          <span class="nf-btn-text">
            {{ loading ? "Posting Comment..." : "Post Comment" }}
          </span>
          <div v-if="loading" class="nf-btn-spinner"></div>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* WRAPPER */
.nf-comment-form {
  background: linear-gradient(135deg, var(--nf-surface), var(--nf-surface-2));
  border-radius: var(--nf-radius-lg);
  padding: calc(var(--nf-gap) * 2);
  position: relative;
  overflow: hidden;
}

.nf-comment-form::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 80%,
    rgba(255, 190, 46, 0.08) 0%,
    transparent 50%
  );
  pointer-events: none;
}

/* FORM CONTAINER */
.nf-form {
  position: relative;
  z-index: 1;
}

/* COMMENT HEADER */
.nf-comment-header {
  display: flex;
  align-items: center;
  gap: var(--nf-gap);
  margin-bottom: var(--nf-gap);
}

.nf-comment-icon {
  font-size: var(--nf-h2);
  opacity: 0.8;
}

.nf-label {
  font-size: var(--nf-body);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0;
  font-family: var(--nf-font-main);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* TEXTAREA */
.nf-textarea {
  width: 100%;
  padding: calc(var(--nf-gap) * 0.75) var(--nf-gap);
  background: var(--nf-glass);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--nf-radius-sm);
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-size: var(--nf-body);
  resize: vertical;
  min-height: 80px;
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
@media (max-width: 768px) {
  .nf-comment-form {
    padding: var(--nf-gap);
  }

  .nf-btn-submit {
    width: 100%;
  }
}
</style>
