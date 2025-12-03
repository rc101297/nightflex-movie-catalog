<template>
  <div>
    <h1 class="heading text-center">🎬 Join NightFlex</h1>

    <div class="container">
      <div class="nf-card login-card">
        <div class="meta">
          <form v-on:submit="handleSubmit">
            <!-- Welcome Message -->
            <div class="welcome-message">
              <span class="welcome-icon">🎬</span>
              <p class="welcome-text">
                Create your account and start streaming
              </p>
            </div>

            <!-- Email Field -->
            <div class="mb-3">
              <label for="emailInput" class="form-label label-text">
                Email Address
              </label>
              <div class="input-group">
                <span class="input-icon">📧</span>
                <input
                  type="email"
                  class="form-control input-field"
                  :class="{ 'is-invalid': emailError }"
                  id="emailInput"
                  v-model="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div v-if="emailError" class="validation-error">
                ✗ {{ emailError }}
              </div>
            </div>

            <!-- Password Field -->
            <div class="mb-3">
              <label for="passwordInput" class="form-label label-text">
                Password
              </label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input
                  type="password"
                  class="form-control input-field"
                  :class="{ 'is-invalid': passwordError }"
                  id="passwordInput"
                  v-model="password"
                  placeholder="Create a secure password (8+ characters)"
                />
              </div>
              <div v-if="passwordError" class="validation-error">
                ✗ {{ passwordError }}
              </div>
            </div>

            <!-- Terms Agreement -->
            <div class="mb-4">
              <p class="text-muted small">
                By registering, you agree to our terms of service and privacy
                policy.
              </p>
            </div>

            <!-- Submit Button -->
            <div class="d-grid mt-4">
              <button
                type="submit"
                class="button button-primary login-btn"
                :disabled="!isEnabled"
              >
                <span v-if="loading" class="spinner"></span>
                {{ loading ? "Creating Account..." : "Join NightFlex" }}
              </button>
            </div>

            <!-- Sign Up Link -->
            <div class="signup-prompt">
              <span class="signup-text">Already have an account?</span>
              <router-link class="signup-link" :to="{ name: 'Login' }">
                Sign in here
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";

import { Notyf } from "notyf";

import api from "../api";

const email = ref("");
const password = ref("");

const isEnabled = ref(false);
const loading = ref(false);
const router = useRouter();
const { user } = useGlobalStore();

const notyf = new Notyf();

const emailError = ref("");
const passwordError = ref("");

watch([email, password], () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Email validation - must contain "@"
  if (emailValue === "") {
    emailError.value = "";
  } else if (!emailValue.includes("@")) {
    emailError.value = "Email must contain '@' symbol";
  } else {
    emailError.value = "";
  }

  // Password validation - must be at least 8 characters
  if (passwordValue === "") {
    passwordError.value = "";
  } else if (passwordValue.length < 8) {
    passwordError.value = "Password must be at least 8 characters long";
  } else {
    passwordError.value = "";
  }

  // Enable button only if all fields are filled and no errors
  isEnabled.value =
    emailValue !== "" &&
    passwordValue !== "" &&
    emailError.value === "" &&
    passwordError.value === "";
});

async function handleSubmit(e) {
  e.preventDefault();
  if (loading.value) return;

  loading.value = true;

  try {
    let res = await api.post("/users/register", {
      email: email.value,
      password: password.value,
    });

    if (res.data.message == "Registered Successfully") {
      notyf.success("Welcome to NightFlex! Your account has been created.");
      email.value = "";
      password.value = "";
      router.push({ path: "/login" });
    }
  } catch (err) {
    // Check first if the error has a response (server replied)
    if (err.response) {
      if (err.response.status === 409) {
        // Email already exists
        notyf.error(err.response.data.message);
      } else if (err.response.status === 400) {
        // Bad request - validation errors
        notyf.error(err.response.data.message);
      } else if (err.response.status === 404 || err.response.status === 401) {
        notyf.error("Authentication failed. Please try again.");
      } else {
        notyf.error("Registration failed. Please contact administrator");
      }
    } else if (err.request) {
      // Request was sent but no response from server
      notyf.error("No response from server. Please check your connection.");
    } else {
      // Something else went wrong setting up the request
      notyf.error("Unexpected error occurred.");
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* PAGE HEADING */
.heading {
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-size: var(--nf-h1);
  font-weight: 700;
  margin-bottom: var(--nf-gap);
  padding-top: var(--nf-gap);
  margin: 20px;
}

/* WELCOME MESSAGE */
.welcome-message {
  text-align: center;
  margin-bottom: calc(var(--nf-gap) * 1.5);
  padding: var(--nf-gap);
  background: linear-gradient(135deg, var(--nf-glass), transparent);
  border-radius: var(--nf-radius);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.welcome-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: var(--nf-gap-xs);
}

.welcome-text {
  color: var(--nf-text-muted);
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
}

/* FORM ELEMENTS */
.label-text {
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-weight: 600;
  margin-bottom: var(--nf-gap-xs);
}

.input-field {
  border: 2px solid rgba(255, 255, 255, 0.1) !important;
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-size: 1rem;
  padding: calc(var(--nf-gap) * 0.75) var(--nf-gap);
  border-radius: var(--nf-radius);
  transition: var(--nf-transition);
}

.input-field:focus {
  border-color: var(--nf-primary) !important;
  box-shadow: 0 0 0 3px rgba(255, 190, 46, 0.1);
  outline: none;
  background: var(--nf-surface-2);
}

/* INVALID FIELD STYLING */
.input-field.is-invalid {
  border-color: var(--nf-danger) !important;
  box-shadow: 0 0 0 3px rgba(255, 77, 77, 0.1) !important;
}

/* INPUT GROUP WITH ICONS */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: var(--nf-gap);
  font-size: 1.25rem;
  z-index: 2;
  pointer-events: none;
}

.input-field:has(.input-icon) {
  padding-left: calc(var(--nf-gap) * 2.5);
}

/* VALIDATION ERRORS */
.validation-error {
  color: var(--nf-danger);
  font-size: 0.85rem;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: var(--nf-gap-xs);
  font-weight: 500;
}

/* ALERT MESSAGES */
.alert {
  background: linear-gradient(135deg, var(--nf-danger), rgba(255, 77, 77, 0.8));
  color: white;
  border: none;
  border-radius: var(--nf-radius-lg);
  padding: var(--nf-gap);
  margin-bottom: var(--nf-gap);
  display: flex;
  align-items: center;
  gap: var(--nf-gap-xs);
  font-weight: 500;
  box-shadow: var(--nf-shadow-1);
}

.alert-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

/* BUTTONS */
.login-btn {
  padding: calc(var(--nf-gap) * 0.875) calc(var(--nf-gap) * 2);
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: var(--nf-radius-lg);
  transition: var(--nf-transition);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--nf-gap-xs);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--nf-shadow-2);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* LOADING SPINNER */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
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

/* SIGNUP PROMPT */
.signup-prompt {
  text-align: center;
  margin-top: calc(var(--nf-gap) * 1.5);
  padding-top: var(--nf-gap);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.signup-text {
  color: var(--nf-text-muted);
  font-size: 0.9rem;
  margin-bottom: var(--nf-gap-xs);
  display: block;
}

.signup-link {
  color: var(--nf-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--nf-transition);
  display: inline-block;
}

.signup-link:hover {
  color: var(--nf-primary);
  text-decoration: underline;
  transform: translateY(-1px);
}

/* LOGIN CARD STYLING */
.login-card {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--nf-primary), #ffbe2e);
  z-index: 1;
}

.text-muted {
  color: var(--nf-text-muted) !important;
}

.small {
  font-size: 0.875rem;
  line-height: 1.4;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .heading {
    font-size: var(--nf-h2);
    padding-top: var(--nf-gap);
  }

  .welcome-icon {
    font-size: 2rem;
  }

  .welcome-message {
    margin-bottom: var(--nf-gap);
    padding: var(--nf-gap-xs);
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--nf-gap);
  }

  .login-card {
    padding: var(--nf-gap);
  }

  .input-field {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}

@media (max-width: 480px) {
  .heading {
    font-size: 2rem;
    margin-bottom: var(--nf-gap);
  }

  .login-btn {
    padding: var(--nf-gap) calc(var(--nf-gap) * 1.5);
    font-size: 1rem;
  }

  .welcome-text {
    font-size: 0.9rem;
  }
}
</style>
