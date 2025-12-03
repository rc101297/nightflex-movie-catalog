<script setup>
import { ref, onMounted } from "vue";

const videoMuted = ref(true);

const toggleVideoMute = () => {
  const video = document.querySelector(".hero-video");
  if (video) {
    video.muted = !video.muted;
    videoMuted.value = video.muted;
  }
};

// Ensure video plays when component is mounted (for autoplay restrictions)
onMounted(() => {
  const video = document.querySelector(".hero-video");
  if (video) {
    // Try to autoplay
    video.play().catch((error) => {
      console.log("Video autoplay failed:", error);
    });
  }
});
</script>

<template>
  <div>
    <!-- Enhanced Hero Section -->
    <section class="hero">
      <!-- Background Video -->
      <video
        class="hero-video"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      >
        <source src="../assets/SB19 'PAGTATAG!' Trailer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <!-- Video Controls Overlay -->
      <div class="video-controls">
        <button
          @click="toggleVideoMute"
          class="video-mute-btn"
          :aria-label="videoMuted ? 'Unmute video' : 'Mute video'"
        >
          <svg
            v-if="!videoMuted"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        </button>
      </div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="nf-badge">🎬 Now Streaming</span>
        </div>

        <h1 class="hero-title">
          Welcome to <span class="accent">NightFlex</span>
        </h1>

        <p class="hero-subtitle">
          Discover unlimited movies and TV shows. Curate your perfect collection
          with our premium streaming platform.
        </p>

        <div class="hero-actions">
          <router-link
            class="button button-primary hero-cta"
            :to="{ name: 'Movies' }"
          >
            <span>🎥 Browse Movies</span>
          </router-link>
          <router-link
            class="button button-ghost hero-secondary"
            :to="{ name: 'Login' }"
          >
            <span>✨ Sign In</span>
          </router-link>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">10K+</span>
            <span class="stat-label">Movies</span>
          </div>
          <div class="stat">
            <span class="stat-number">500+</span>
            <span class="stat-label">TV Shows</span>
          </div>
          <div class="stat">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Streaming</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="floating-card-top">
          <div class="card-icon">🎭</div>
          <div class="card-title">Drama</div>
        </div>
        <div class="floating-card-middle-left">
          <div class="card-icon">🚀</div>
          <div class="card-title">Sci-Fi</div>
        </div>
        <div class="floating-card-middle-center">
          <div class="card-icon">💥</div>
          <div class="card-title">Action</div>
        </div>
        <div class="floating-card-middle-right">
          <div class="card-icon">😂</div>
          <div class="card-title">Comedy</div>
        </div>
        <div class="floating-card-bottom-left">
          <div class="card-icon">👻</div>
          <div class="card-title">Horror</div>
        </div>
        <div class="floating-card-bottom-right">
          <div class="card-icon">💕</div>
          <div class="card-title">Romance</div>
        </div>
      </div>
    </section>

    <!-- Enhanced Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Explore Categories</h2>
          <p class="section-subtitle">
            Find your next favorite movie in our curated collections
          </p>
        </div>

        <div class="nf-grid">
          <div class="feature-card nf-card">
            <div class="card-visual">
              <div class="category-icon">💥</div>
              <div class="category-bg action-bg"></div>
            </div>
            <div class="meta">
              <h1 class="title">Action Movies</h1>
              <p class="description">
                Experience heart-pounding action, epic battles, and explosive
                entertainment.
              </p>
              <div class="card-badges">
                <span class="nf-badge">Popular</span>
                <span class="genre-count">200+ films</span>
              </div>
            </div>
          </div>

          <div class="feature-card nf-card">
            <div class="card-visual">
              <div class="category-icon">📺</div>
              <div class="category-bg tv-bg"></div>
            </div>
            <div class="meta">
              <h1 class="title">TV Shows</h1>
              <p class="description">
                Binge-watch series from award-winning dramas to cult classics.
              </p>
              <div class="card-badges">
                <span class="nf-badge">Trending</span>
                <span class="genre-count">80+ shows</span>
              </div>
            </div>
          </div>

          <div class="feature-card nf-card">
            <div class="card-visual">
              <div class="category-icon">🎭</div>
              <div class="category-bg anime-bg"></div>
            </div>
            <div class="meta">
              <h1 class="title">Anime</h1>
              <p class="description">
                Dive into stunning animations, epic storylines, and unique
                worlds from Japan.
              </p>
              <div class="card-badges">
                <span class="nf-badge">Anime</span>
                <span class="genre-count">150+ series</span>
              </div>
            </div>
          </div>

          <div class="feature-card nf-card">
            <div class="card-visual">
              <div class="category-icon">❤️</div>
              <div class="category-bg personal-bg"></div>
            </div>
            <div class="meta">
              <h1 class="title">My List</h1>
              <p class="description">
                Curate your personal favorites and never lose track of what to
                watch next.
              </p>
              <div class="card-badges">
                <span class="nf-badge">Personal</span>
                <span class="genre-count">Your picks</span>
              </div>
            </div>
          </div>

          <div class="feature-card nf-card">
            <div class="card-visual">
              <div class="category-icon">🏆</div>
              <div class="category-bg awards-bg"></div>
            </div>
            <div class="meta">
              <h1 class="title">Award Winners</h1>
              <p class="description">
                Discover critically acclaimed films that have won hearts and
                awards.
              </p>
              <div class="card-badges">
                <span class="nf-badge">Premium</span>
                <span class="genre-count">50+ films</span>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <router-link
            class="button button-primary cta-button"
            :to="{ name: 'Login' }"
          >
            <span>🔥 Start Exploring Now</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Spacing section for proper footer clearance -->
    <div class="page-footer-spacer"></div>
  </div>
</template>

<style scoped>
/* BACKGROUND VIDEO */
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.7;
  /* mix-blend-mode: multiply; */
}

.hero-video::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(4, 18, 38, 0.4) 100%
  );
}

/* VIDEO CONTROLS */
.video-controls {
  position: absolute;
  bottom: var(--nf-gap);
  right: var(--nf-gap);
  z-index: 4;
  display: flex;
  gap: var(--nf-gap-xs);
}

.video-mute-btn {
  background: var(--nf-glass);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--nf-radius);
  width: 50px;
  height: 50px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.video-mute-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  border-color: var(--nf-primary);
}

.video-mute-btn:active {
  transform: scale(0.95);
}

/* ENHANCED HERO SECTION */
.hero {
  position: relative;
  color: var(--nf-text);
  padding: calc(var(--nf-gap) * 4) var(--nf-gap);
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 70%,
    rgba(255, 190, 46, 0.1),
    transparent 50%
  );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: 600px;
  text-align: left;
}

.hero-badge {
  margin-bottom: var(--nf-gap);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  margin: 0 0 var(--nf-gap) 0;
  line-height: 1.1;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.hero-title .accent {
  color: var(--nf-primary);
  text-shadow: 0 2px 20px rgba(255, 190, 46, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--nf-text-muted);
  margin: 0 0 calc(var(--nf-gap) * 2) 0;
  line-height: 1.6;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: var(--nf-gap);
  margin-bottom: calc(var(--nf-gap) * 3);
  flex-wrap: wrap;
}

.hero-cta,
.hero-secondary {
  padding: calc(var(--nf-gap) * 0.75) calc(var(--nf-gap) * 2);
  border-radius: var(--nf-radius-lg);
  font-size: var(--nf-body);
  font-weight: 600;
  transition: var(--nf-transition);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--nf-gap-xs);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: var(--nf-shadow-2);
}

.hero-stats {
  display: flex;
  gap: calc(var(--nf-gap) * 2);
  margin-top: var(--nf-gap);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--nf-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--nf-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* HERO VISUAL ELEMENTS */
.hero-visual {
  position: absolute;
  right: var(--nf-gap);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: calc(var(--nf-gap) * 0.5);
  z-index: 3;
  max-width: 300px;
}

.floating-card-top,
.floating-card-middle-left,
.floating-card-middle-center,
.floating-card-middle-right,
.floating-card-bottom-left,
.floating-card-bottom-right {
  background: var(--nf-glass);
  backdrop-filter: blur(10px);
  border-radius: var(--nf-radius);
  padding: calc(var(--nf-gap) * 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--nf-shadow-1);
  text-align: center;
  animation: float 8s ease-in-out infinite;
  min-width: 90px;
  transition: var(--nf-transition);
}

.floating-card-top {
  animation-delay: 0s;
  align-self: center;
}

.floating-card-middle-left {
  animation-delay: 1s;
  align-self: flex-start;
}

.floating-card-middle-center {
  animation-delay: 2s;
  align-self: center;
  border-color: rgba(255, 190, 46, 0.3);
}

.floating-card-middle-center:hover {
  border-color: var(--nf-primary);
  transform: scale(1.05);
}

.floating-card-middle-right {
  animation-delay: 3s;
  align-self: flex-end;
}

.floating-card-bottom-left {
  animation-delay: 4s;
  align-self: flex-start;
}

.floating-card-bottom-right {
  animation-delay: 5s;
  align-self: flex-end;
}

/* Hover effects for floating cards */
.floating-card-top:hover,
.floating-card-middle-left:hover,
.floating-card-middle-right:hover,
.floating-card-bottom-left:hover,
.floating-card-bottom-right:hover {
  transform: scale(1.08);
  border-color: rgba(255, 190, 46, 0.5);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--nf-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* FEATURES SECTION */
.features-section {
  padding: calc(var(--nf-gap) * 4) 0;
  background: var(--nf-bg);
}

.section-header {
  text-align: center;
  margin-bottom: calc(var(--nf-gap) * 3);
}

.section-title {
  font-size: var(--nf-h1);
  font-weight: 700;
  color: var(--nf-text);
  margin: 0 0 var(--nf-gap-xs) 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--nf-text-muted);
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

/* FEATURE CARDS */
.feature-card {
  height: 100%;
  background: linear-gradient(180deg, var(--nf-surface), var(--nf-surface-2));
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--nf-transition);
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--nf-shadow-2);
  border-color: var(--nf-primary);
}

.card-visual {
  position: relative;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.category-icon {
  font-size: 4rem;
  z-index: 2;
  position: relative;
}

.category-bg {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  transition: var(--nf-transition);
}

.feature-card:hover .category-bg {
  opacity: 0.3;
  transform: scale(1.1);
}

.action-bg {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
}

.tv-bg {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}

.anime-bg {
  background: linear-gradient(135deg, #ff0080, #ff4081, #8000ff);
}

.personal-bg {
  background: linear-gradient(135deg, #ec4899, #f97316);
}

.awards-bg {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.feature-card .meta {
  padding: var(--nf-gap);
}

.feature-card .title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--nf-text);
  margin: 0 0 var(--nf-gap-xs) 0;
}

.feature-card .description {
  color: var(--nf-text-muted);
  line-height: 1.5;
  margin: 0 0 var(--nf-gap) 0;
  flex: 1;
}

.card-badges {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.genre-count {
  font-size: 0.875rem;
  color: var(--nf-text-muted);
  font-weight: 500;
}

/* CTA SECTION */
.cta-section {
  text-align: center;
  margin-top: calc(var(--nf-gap) * 3);
}

.cta-button {
  padding: calc(var(--nf-gap) * 0.875) calc(var(--nf-gap) * 2.5);
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: var(--nf-radius-lg);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--nf-gap-xs);
  transition: var(--nf-transition);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--nf-shadow-2);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: calc(var(--nf-gap) * 3) var(--nf-gap);
  }

  .hero-content {
    text-align: center;
    max-width: none;
  }

  .hero-visual {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
    gap: var(--nf-gap);
    margin-top: var(--nf-gap);
  }

  .floating-card-left,
  .floating-card-center,
  .floating-card-right {
    min-width: 100px;
    padding: var(--nf-gap-xs);
    transform: none;
  }

  .card-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: calc(var(--nf-gap) * 2) var(--nf-gap);
    min-height: 70vh;
  }

  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
    gap: var(--nf-gap);
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .video-controls {
    bottom: var(--nf-gap-xs);
    right: var(--nf-gap-xs);
  }

  .video-mute-btn {
    width: 40px;
    height: 40px;
  }

  .features-section {
    padding: calc(var(--nf-gap) * 3) 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .feature-card .meta {
    padding: var(--nf-gap-xs);
  }

  .feature-card .title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .hero-visual {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: calc(var(--nf-gap) * 0.75);
    max-width: 280px;
  }

  .floating-card-top,
  .floating-card-middle-left,
  .floating-card-middle-center,
  .floating-card-middle-right,
  .floating-card-bottom-left,
  .floating-card-bottom-right {
    width: 120px;
    align-self: auto;
    margin-bottom: var(--nf-gap-xs);
  }

  .card-icon {
    font-size: 1.5rem;
  }

  .card-title {
    font-size: 0.75rem;
  }
}

/* FOOTER SPACER */
.page-footer-spacer {
  height: calc(var(--nf-gap) * 2);
  background: transparent;
}

@media (max-width: 768px) {
  .page-footer-spacer {
    height: var(--nf-gap);
  }
}
</style>
