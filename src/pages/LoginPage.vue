<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useGlobalStore } from "../stores/global.js";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import api from "../api";

const router = useRouter();
const store = useGlobalStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);
const error = ref("");
const emailError = ref("");

const notyf = new Notyf();

// Form validation
watch(email, () => {
  const emailValue = email.value.trim();
  if (emailValue === "") {
    emailError.value = "Email is required";
  } else if (!emailValue.includes("@")) {
    emailError.value = "Please enter a valid email address";
  } else {
    emailError.value = "";
  }
});

const passwordError = ref("");

watch(password, () => {
  const passwordValue = password.value;
  if (passwordValue === "") {
    passwordError.value = "Password is required";
  } else if (passwordValue.length < 6) {
    passwordError.value = "Password must be at least 6 characters";
  } else {
    passwordError.value = "";
  }
});

const isEnabled = computed(
  () =>
    email.value.trim() &&
    password.value.trim() &&
    emailError.value === "" &&
    passwordError.value === "" &&
    !loading.value
);

async function handleSubmit(e) {
  e.preventDefault();
  if (!isEnabled.value || loading.value) return;

  loading.value = true;
  error.value = "";

  try {
    let res = await api.post("/users/login", {
      email: email.value,
      password: password.value,
    });

    if (res.data.message === "User logged in successfully") {
      notyf.success("Login Successfully");

      localStorage.setItem("token", res.data.access);
      await store.getUserDetails(res.data.access);

      // If remember me is checked, we could extend session (depends on backend)
      if (rememberMe.value) {
        // This would typically be handled by the auth system
        console.log("Remember me selected");
      }

      // Clear form
      email.value = "";
      password.value = "";
      router.push({ name: "Movies" });
    } else {
      error.value = res.data.message;
      notyf.error(res.data.message);
    }
  } catch (err) {
    error.value = "Login failed. Please try again.";
    notyf.error("An error occurred during login");
  } finally {
    loading.value = false;
  }
}

onBeforeMount(() => {
  if (store.user.token) {
    router.push({ name: "Movies" });
  }
});
</script>

<template>
  <div>
    <h1 class="heading text-center">🎬 Welcome Back to NightFlex!</h1>

    <div class="container">
      <div class="nf-card login-card">
        <div class="meta">
          <form v-on:submit="handleSubmit">
            <!-- Welcome Message -->
            <div class="welcome-message">
              <span class="welcome-icon">🎭</span>
              <p class="welcome-text">
                Sign in to access your movie collection
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
                  placeholder="Enter your password"
                />
              </div>
              <div v-if="passwordError" class="validation-error">
                ✗ {{ passwordError }}
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="form-options mb-4">
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                  class="checkbox-input"
                />
                <span class="checkmark"></span>
                <span class="checkbox-text">Keep me signed in</span>
              </label>
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="alert text-center" role="alert">
              <span class="alert-icon">⚠️</span>
              {{ error }}
            </div>

            <!-- Submit Button -->
            <div class="d-grid mt-4">
              <button
                type="submit"
                class="button button-primary login-btn"
                :disabled="!isEnabled"
              >
                <span v-if="loading" class="spinner"></span>
                {{ loading ? "Signing You In..." : "🔐 Sign In" }}
              </button>
            </div>

            <!-- Sign Up Link -->
            <div class="signup-prompt">
              <span class="signup-text">New to NightFlex?</span>
              <router-link class="signup-link" :to="{ name: 'Register' }">
                Create your account
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

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

/* FORM OPTIONS */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--nf-gap);
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  user-select: none;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  height: 18px;
  width: 18px;
  background: var(--nf-surface);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-right: var(--nf-gap-xs);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox-container:hover .checkmark {
  border-color: var(--nf-primary);
}

.checkbox-input:checked ~ .checkmark {
  background: var(--nf-primary);
  border-color: var(--nf-primary);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-text {
  color: var(--nf-text-muted);
  font-size: 0.9rem;
  font-weight: 500;
}

.forgot-password {
  color: var(--nf-primary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: var(--nf-transition);
}

.forgot-password:hover {
  color: var(--nf-primary);
  text-decoration: underline;
  transform: translateX(2px);
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
}
</style>
