import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "notyf/notyf.min.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import HomePage from "./pages/HomePage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import LogoutPage from "./pages/LogoutPage.vue";
import MoviePage from "./pages/MoviePage.vue";
import MovieDetailPage from "./pages/MovieDetailPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/logout",
      name: "Logout",
      component: LogoutPage,
    },
    {
      path: "/movies",
      name: "Movies",
      component: MoviePage,
    },
    {
      path: "/movies/:id",
      name: "MovieDetail",
      component: MovieDetailPage,
    },
  ],
});

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount("#app");
