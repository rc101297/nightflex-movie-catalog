<template>
  <div>
    <div class="logout-container">
      <div class="logout-content">
        <div class="logout-icon">👋</div>
        <h1 class="logout-title">Logging Out</h1>
        <p class="logout-subtitle">Thanks for using NightFlex!</p>
        <div class="logout-spinner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useGlobalStore } from "../stores/global.js";
import { useRouter } from "vue-router";

const { getUserDetails } = useGlobalStore();
const router = useRouter();

onBeforeMount(async () => {
  // Clear user session
  localStorage.clear();
  getUserDetails(null);

  // Add slight delay for better UX
  setTimeout(() => {
    router.push({ path: "/login" });
  }, 1000);
});
</script>

<style scoped>
.logout-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--nf-bg);
}

.logout-content {
  text-align: center;
  padding: calc(var(--nf-gap) * 2);
}

.logout-icon {
  font-size: 4rem;
  margin-bottom: var(--nf-gap);
}

.logout-title {
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-size: var(--nf-h1);
  font-weight: 700;
  margin: 0 0 var(--nf-gap) 0;
}

.logout-subtitle {
  color: var(--nf-text-muted);
  font-size: var(--nf-body);
  margin: 0 0 calc(var(--nf-gap) * 2) 0;
}

.logout-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--nf-surface);
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
</style>
