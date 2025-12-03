<template>
  <nav class="navbar navbar-expand-lg nf-navbar">
    <div class="container-fluid">
      <router-link
        class="navbar-brand d-flex align-items-center"
        active-class="active-link"
        exact-active-class="exact-active-link"
        :to="{ name: 'Home' }"
      >
        <img
          src="../assets/NightFlex_logo_v2.png"
          alt="NightFlex Logo"
          class="brand-logo me-2"
        />
        <span class="brand-text">NIGHTFLEX</span>
      </router-link>

      <!-- Mobile Toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Movies' }"
              >Movies</router-link
            >
          </li>

          <!-- Auth Buttons - Show Login/Register when NOT logged in -->
          <li
            v-if="!user.token"
            class="nav-item d-flex align-items-center ms-lg-3"
          >
            <router-link
              class="btn-login me-2"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Login' }"
              >Login</router-link
            >
            <router-link
              class="btn-register"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Register' }"
              >Register</router-link
            >
          </li>

          <!-- Logout - Show only when logged in -->
          <li v-else class="nav-item ms-lg-3">
            <router-link
              class="nav-link logout-link"
              active-class="active-link"
              exact-active-class="exact-active-link"
              :to="{ name: 'Logout' }"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { useGlobalStore } from "../stores/global.js";

const { user } = useGlobalStore();
</script>

<style scoped>
/* Navbar styling aligned with NightFlex theme from main.css */
/* Enhanced with sophisticated effects matching footer and page styles */
.nf-navbar {
  background: linear-gradient(
    180deg,
    var(--nf-bg) 0%,
    rgba(11, 42, 69, 0.95) 40%,
    rgba(15, 59, 89, 0.9) 80%,
    var(--nf-surface-2) 100%
  );
  border-radius: var(--nf-radius);
  box-shadow: var(--nf-shadow-1);
  backdrop-filter: blur(10px);
  border: none;
  padding: 0;
  margin-bottom: var(--nf-gap);
  position: relative;
  overflow: hidden;
}

.nf-navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 50%,
    rgba(255, 190, 46, 0.08) 0%,
    transparent 40%
  );
  pointer-events: none;
}

.nf-navbar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--nf-primary) 0%,
    #ffbe2e 50%,
    var(--nf-primary) 100%
  );
  opacity: 0.4;
}

.container-fluid {
  padding-left: 16px;
  padding-right: 16px;
}

/* Brand styling - maintaining Bootstrap flexbox but with theme colors */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.2px;
  color: var(--nf-text);
  text-decoration: none;
  padding: 12px 0;
  transition: color var(--nf-transition);
}

.navbar-brand:hover {
  color: var(--nf-accent-muted);
}

.brand-logo {
  width: 44px;
  height: 44px;
  display: inline-grid;
  place-items: center;
  background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 190, 46, 0.14),
      transparent 22%
    ),
    linear-gradient(135deg, var(--nf-surface), var(--nf-surface-2));
  border-radius: 10px;
  box-shadow: var(--nf-shadow-1);
  transition: transform var(--nf-transition);
}

.brand-logo:hover {
  transform: scale(1.05);
}

.brand-text {
  color: var(--nf-text);
}

/* Navigation menu container */
.navbar-collapse {
  padding: 12px 0;
}

/* Navigation links - centered horizontally in desktop */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: calc(var(--nf-gap) * 1.5);
  margin: 0 auto;
  padding: 0;
}

.nav-item {
  list-style: none;
  margin: 0;
}

/* Navigation links styling */
.nav-link {
  color: var(--nf-text);
  font-weight: 600;
  position: relative;
  padding: 8px 16px;
  text-decoration: none;
  transition: color var(--nf-transition);
  margin: 0 4px;
}

.nav-link:hover {
  color: var(--nf-accent-muted);
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 4px;
  height: 2px;
  background: linear-gradient(90deg, var(--nf-primary), var(--nf-primary-600));
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--nf-transition);
}

.nav-link.active-link::after,
.nav-link.exact-active-link::after {
  transform: scaleX(1);
}

/* Auth buttons container - right aligned */
.nav-item.d-flex {
  margin-left: auto;
  gap: 8px;
  flex-direction: row;
}

/* Auth buttons */
.btn-login,
.btn-register {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--nf-transition);
  user-select: none;
  text-decoration: none;
  border: none;
  margin: 0;
  font-size: var(--nf-body);
}

.btn-login {
  background: var(--nf-glass);
  color: var(--nf-text);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.btn-login:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
}

.btn-register {
  background: linear-gradient(180deg, var(--nf-primary), var(--nf-primary-600));
  color: #091821;
  box-shadow: 0 8px 28px rgba(255, 190, 46, 0.12), 0 2px 6px rgba(2, 8, 20, 0.5);
}

.btn-login:active,
.btn-register:active {
  transform: translateY(1px);
}

/* Mobile toggle button */
.navbar-toggler {
  background: var(--nf-glass);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 8px;
  color: var(--nf-text);
  margin: 12px 0;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 190, 46, 0.25);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

/* Responsive adjustments - Bootstrap breakpoints */
@media (max-width: 991.98px) {
  /* Mobile layout - stack vertically */
  .nf-navbar {
    flex-direction: column;
    align-items: stretch;
  }

  .container-fluid {
    padding-left: 12px;
    padding-right: 12px;
  }

  .navbar-brand {
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 12px;
    padding-bottom: 16px;
  }

  .navbar-collapse {
    padding: 0;
  }

  .navbar-nav {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 0;
    width: 100%;
  }

  .nav-item {
    width: 100%;
    text-align: center;
  }

  .nav-link {
    padding: 12px 16px;
    margin: 0;
    width: 100%;
    justify-content: center;
  }

  /* Auth buttons in mobile - stack below nav links */
  .nav-item.d-flex {
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .btn-login,
  .btn-register {
    width: 100%;
    justify-content: center;
    min-width: 160px;
  }
}

@media (min-width: 992px) {
  /* Desktop - horizontal layout with proper spacing */
  .navbar-nav {
    margin: 0 auto 0 0;
    flex-direction: row;
  }

  .nav-item.d-flex {
    margin-left: auto;
    flex-direction: row;
  }
}

/* Focus states for accessibility */
.nav-link:focus,
.btn-login:focus,
.btn-register:focus {
  outline: 2px solid var(--nf-primary);
  outline-offset: 2px;
}
</style>
