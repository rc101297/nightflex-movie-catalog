import { defineStore } from "pinia";
import { reactive } from "vue";
import api from "../api";

export const useGlobalStore = defineStore("global", () => {
  const token = localStorage.getItem("token");

  let decodedToken = null;
  try {
    decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  } catch (err) {
    console.error("Invalid token format:", err);
  }

  const user = reactive({
    token,
    email: decodedToken ? decodedToken.email : null,
    isAdmin: decodedToken ? Boolean(decodedToken.isAdmin) : null,
    firstName: null,
    lastName: null,
    mobileNo: null,
    isLoading: false,
  });

  async function getUserDetails(token) {
    if (!token) {
      Object.assign(user, {
        token: null,
        email: null,
        isAdmin: null,
        firstName: null,
        lastName: null,
        mobileNo: null,
        isLoading: false,
      });
      return;
    }

    user.isLoading = true;

    try {
      const { data } = await api.get("/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Object.assign(user, {
        token,
        email: user.email,
        isAdmin: data.user.isAdmin,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        mobileNo: data.user.mobileNo,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      user.isLoading = false;
    }
  }

  async function login(email, password) {
    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      if (res.data.message === "User logged in successfully") {
        const token = res.data.access;
        localStorage.setItem("token", token);
        await getUserDetails(token);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      if (err.response && [404, 401, 400].includes(err.response.status)) {
        return { success: false, message: err.response.data.message };
      } else {
        return {
          success: false,
          message: "Login failed. Please contact administrator",
        };
      }
    }
  }

  return {
    user,
    getUserDetails,
    login,
  };
});
