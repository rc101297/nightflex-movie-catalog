<template>
  <footer class="nf-footer">
    <!-- Main Footer Content -->
    <div class="footer-main">
      <div class="container">
        <!-- Top Section -->
        <div class="footer-top">
          <!-- Newsletter Section -->
          <div class="newsletter-section">
            <div class="newsletter-badge">
              <span class="nf-badge">✉️ Stay Updated</span>
            </div>
            <h3 class="newsletter-title">
              Get the latest movie recommendations
            </h3>
            <p class="newsletter-subtitle">
              Join our community and never miss a blockbuster release or hidden
              gem.
            </p>
            <div class="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                class="newsletter-input"
                v-model="email"
              />
              <button
                class="button button-primary newsletter-btn"
                @click="subscribeNewsletter"
              >
                <span>Subscribe</span>
              </button>
            </div>
          </div>

          <!-- Brand Section -->
          <div class="brand-section">
            <div class="brand-header">
              <div class="nf-brand">
                <div class="nf-logo">
                  <img
                    src="../assets/NightFlex_logo_v2.png"
                    alt="NightFlex Logo"
                    style="width: 40px; height: 40px; object-fit: contain"
                  />
                </div>
                <span>NightFlex</span>
              </div>
            </div>
            <p class="brand-description">
              Your ultimate destination for cinematic experiences. Discover,
              watch, and curate the perfect movie collection.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.349-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Links Section -->
        <div class="footer-links">
          <div class="links-column">
            <h4 class="column-title">Explore</h4>
            <nav class="links-list">
              <router-link :to="{ name: 'Movies' }" class="footer-link">
                Browse Movies
              </router-link>
              <router-link :to="{ name: 'Home' }" class="footer-link">
                Categories
              </router-link>
              <a href="#" class="footer-link">New Releases</a>
              <a href="#" class="footer-link">Top Rated</a>
            </nav>
          </div>

          <div class="links-column">
            <h4 class="column-title">Genres</h4>
            <nav class="links-list">
              <a href="#" class="footer-link">Action</a>
              <a href="#" class="footer-link">Drama</a>
              <a href="#" class="footer-link">Comedy</a>
              <a href="#" class="footer-link">Sci-Fi</a>
              <a href="#" class="footer-link">Horror</a>
              <a href="#" class="footer-link">Romance</a>
            </nav>
          </div>

          <div class="links-column">
            <h4 class="column-title">Support</h4>
            <nav class="links-list">
              <a href="#" class="footer-link">Help Center</a>
              <a href="#" class="footer-link">Contact Us</a>
              <a href="#" class="footer-link">Terms of Service</a>
              <a href="#" class="footer-link">Privacy Policy</a>
            </nav>
          </div>

          <div class="links-column">
            <h4 class="column-title">Account</h4>
            <nav class="links-list">
              <router-link
                :to="{ name: 'Login' }"
                class="footer-link"
                v-if="!user?.token"
              >
                Sign In
              </router-link>
              <router-link
                :to="{ name: 'Register' }"
                class="footer-link"
                v-if="!user?.token"
              >
                Join NightFlex
              </router-link>
              <a href="#" class="footer-link" v-if="user?.token">My List</a>
              <a href="#" class="footer-link" v-if="user?.token"
                >Account Settings</a
              >
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="footer-bottom">
      <div class="container">
        <div class="bottom-content">
          <div class="copyright">
            <p>&copy; {{ currentYear }} NightFlex. All rights reserved.</p>
          </div>
          <div class="version">
            <span class="version-badge">v2.1.0</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useGlobalStore } from "../stores/global.js";
import { Notyf } from "notyf";

const store = useGlobalStore();
const user = computed(() => store.user);

const email = ref("");
const notyf = new Notyf();

const currentYear = computed(() => new Date().getFullYear());

const subscribeNewsletter = () => {
  if (!email.value || !email.value.includes("@")) {
    notyf.error("Please enter a valid email address");
    return;
  }

  // Placeholder for newsletter subscription
  notyf.success(
    "Thank you for subscribing! We'll keep you updated with the latest movies."
  );
  email.value = "";
};
</script>

<style scoped>
/* MAIN FOOTER STYLES */
.nf-footer {
  background: linear-gradient(
    180deg,
    var(--nf-bg) 0%,
    rgba(9, 32, 52, 0.95) 30%,
    rgba(19, 56, 87, 0.9) 70%,
    var(--nf-surface-2) 100%
  );
  border-top: 1px solid rgba(255, 190, 46, 0.2);
  color: var(--nf-text);
  position: relative;
  overflow: hidden;
}

.nf-footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(255, 190, 46, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(255, 190, 46, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.nf-footer::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--nf-primary) 0%,
    #ffbe2e 50%,
    var(--nf-primary) 100%
  );
  opacity: 0.6;
}

/* FOOTER MAIN CONTENT */
.footer-main {
  padding: calc(var(--nf-gap) * 3) 0;
  position: relative;
  z-index: 2;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: calc(var(--nf-gap) * 3);
  margin-bottom: calc(var(--nf-gap) * 3);
  padding-bottom: calc(var(--nf-gap) * 2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* NEWSLETTER SECTION */
.newsletter-section {
  background: var(--nf-glass);
  backdrop-filter: blur(10px);
  border-radius: var(--nf-radius-lg);
  padding: calc(var(--nf-gap) * 2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.newsletter-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 20% 80%,
    rgba(255, 190, 46, 0.1),
    transparent
  );
  pointer-events: none;
}

.newsletter-badge {
  margin-bottom: var(--nf-gap);
}

.newsletter-title {
  font-size: var(--nf-h1);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0 0 var(--nf-gap) 0;
  background: linear-gradient(135deg, var(--nf-text), var(--nf-primary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.newsletter-subtitle {
  color: var(--nf-text-muted);
  line-height: 1.6;
  margin: 0 0 calc(var(--nf-gap) * 1.5) 0;
  font-size: 1rem;
}

.newsletter-form {
  display: flex;
  gap: var(--nf-gap);
  align-items: center;
}

.newsletter-input {
  flex: 1;
  padding: calc(var(--nf-gap) * 0.75) var(--nf-gap);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--nf-radius);
  background: var(--nf-surface);
  color: var(--nf-text);
  font-family: var(--nf-font-main);
  font-size: 1rem;
  transition: var(--nf-transition);
}

.newsletter-input:focus {
  border-color: var(--nf-primary);
  box-shadow: 0 0 0 3px rgba(255, 190, 46, 0.1);
  outline: none;
}

.newsletter-input::placeholder {
  color: var(--nf-text-muted);
}

.newsletter-btn {
  padding: calc(var(--nf-gap) * 0.75) calc(var(--nf-gap) * 1.5);
  font-weight: 600;
  white-space: nowrap;
  transition: var(--nf-transition);
}

.newsletter-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--nf-shadow-2);
}

/* BRAND SECTION */
.brand-section {
  display: flex;
  flex-direction: column;
  height: fit-content;
}

.brand-header {
  margin-bottom: calc(var(--nf-gap) * 1.25);
}

.nf-brand {
  display: flex;
  align-items: center;
  gap: var(--nf-gap-xs);
  font-weight: 800;
  font-size: var(--nf-h2);
}

.nf-brand span {
  color: var(--nf-primary);
}

.brand-description {
  color: var(--nf-text-muted);
  line-height: 1.6;
  margin: 0 0 calc(var(--nf-gap) * 1.5) 0;
}

.social-links {
  display: flex;
  gap: var(--nf-gap);
  align-items: center;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--nf-radius);
  background: var(--nf-glass);
  color: var(--nf-text);
  transition: var(--nf-transition);
  text-decoration: none;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-link:hover {
  background: var(--nf-primary);
  color: #091821;
  transform: translateY(-2px);
  box-shadow: var(--nf-shadow-1);
}

/* FOOTER LINKS */
.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: calc(var(--nf-gap) * 2);
}

.links-column {
  display: flex;
  flex-direction: column;
}

.column-title {
  font-size: var(--nf-h2);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0 0 var(--nf-gap) 0;
  letter-spacing: 0.5px;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: var(--nf-gap-xs);
}

.footer-link {
  color: var(--nf-text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: var(--nf-transition);
  display: inline-block;
}

.footer-link:hover {
  color: var(--nf-primary);
  transform: translateX(4px);
}

.footer-link.router-link-active {
  color: var(--nf-primary);
  font-weight: 600;
}

/* FOOTER BOTTOM */
.footer-bottom {
  padding: var(--nf-gap) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    90deg,
    rgba(4, 18, 38, 0.8),
    rgba(11, 42, 69, 0.6)
  );
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright p {
  margin: 0;
  color: var(--nf-text-muted);
  font-size: 0.9rem;
}

.version-badge {
  background: var(--nf-glass);
  color: var(--nf-text);
  padding: 4px 8px;
  border-radius: var(--nf-radius);
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--nf-gap);
  }

  .column-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: calc(var(--nf-gap) * 2) 0;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: calc(var(--nf-gap) * 2);
    margin-bottom: var(--nf-gap);
  }

  .newsletter-section {
    padding: var(--nf-gap);
  }

  .newsletter-title {
    font-size: var(--nf-h2);
  }

  .newsletter-form {
    flex-direction: column;
    align-items: stretch;
  }

  .newsletter-btn {
    width: 100%;
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: calc(var(--nf-gap) * 1.5);
    text-align: center;
  }

  .links-list {
    align-items: center;
  }

  .footer-link:hover {
    transform: none;
  }

  .bottom-content {
    flex-direction: column;
    gap: var(--nf-gap);
    text-align: center;
  }
}

@media (max-width: 480px) {
  .newsletter-section {
    padding: var(--nf-gap-xs);
  }

  .newsletter-title {
    font-size: 1.5rem;
  }

  .column-title {
    font-size: 1.1rem;
  }

  .brand-header {
    text-align: center;
  }

  .brand-description {
    text-align: center;
  }
}
</style>
