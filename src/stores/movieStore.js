import { defineStore } from "pinia";
import { reactive } from "vue";
import api from "../api";

export const useMovieStore = defineStore("movie", () => {
  const movieData = reactive({
    movies: [],
    currentMovie: {},
    comments: [],
    loading: false,
    movieLoading: false,
    commentsLoading: false,
    error: "",
  });

  async function getMovies() {
    movieData.loading = true;
    movieData.error = "";

    try {
      const res = await api.get("/movies/getMovies");
      movieData.movies = res.data.movies || [];
    } catch (err) {
      console.error("Error fetching movies:", err);
      movieData.error = err.response
        ? err.response.data.message || "Failed to load movies"
        : "Network error";
      movieData.movies = [];
    } finally {
      movieData.loading = false;
    }
  }

  async function getMovieDetails(id) {
    movieData.movieLoading = true;
    movieData.error = "";

    try {
      const res = await api.get(`/movies/getMovie/${id}`);
      movieData.currentMovie = res.data || {};
    } catch (err) {
      console.error("Error fetching movie:", err);
      movieData.error = err.response
        ? err.response.data.message || "Failed to load movie"
        : "Network error";
      movieData.currentMovie = {};
    } finally {
      movieData.movieLoading = false;
    }
  }

  async function getComments(movieId) {
    movieData.commentsLoading = true;

    try {
      const res = await api.get(`/movies/getComments/${movieId}`);
      movieData.comments = res.data.comments || [];
    } catch (err) {
      console.error("Error fetching comments:", err);
      movieData.comments = [];
    } finally {
      movieData.commentsLoading = false;
    }
  }

  return {
    movieData,
    getMovies,
    getMovieDetails,
    getComments,
  };
});
