import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const authUser = create((set) => {
  return {
    user: null,
    loading: false,
    error: null,
    message: "",
    token: null,
    file: null,

    sendCode: async (email) => {
      set({ loading: true, error: null });

      try {
        let res = await axiosInstance.post("/user/sendCode", { email });
        set({ message: res.data.message, error: null, loading: false });
        return { success: true };
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
        return { success: false };
      }
    },

    createUser: async (formData) => {
      set({ loading: true, error: null });

      try {
        let res = await axiosInstance.post("/user/register", formData);
        set({
          user: res.data.user,
          token: res.data.token,
          message: res.data.message,
          error: null,
          loading: false,
        });
        localStorage.setItem("token", authUser.getState().token);
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    login: async (email, password) => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.post("/user/login", {
          email,
          password,
        });
        set({
          user: res.data.user,
          message: res.data.message,
          loading: false,
          error: null,
        });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    profile: async () => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.get("/user/profile");
        set({
          user: res.data.user,
          message: res.data.message,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.warn("User not logged in or session expired.");
        set({
          user: null,
          loading: false,
        });
      }
    },

    logout: async () => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.post("/user/logout");
        set({
          user: null,
          error: null,
          loading: false,
          message: res.data.message,
        });
        localStorage.removeItem("token");
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    setFile: (file) => set({ file: file }),
    updateProfilePicture: async () => {
      try {
        const file = authUser.getState().file;
        if (!file) {
          set({ error: "Image Not found" });
        }
        let formData = new FormData();
        formData.append("profilePic", file);

        set({ loading: true, error: null });

        const res = await axiosInstance.put("/user/updateProfilePicture", {
          formData,
        });
        set({
          user: res.data.user,
          loading: false,
          error: null,
          message: res.data.message,
        });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    updateProfile: async (name, birthDate, age, gender, address, phone) => {
      try {
        set({ loading: true, error: null });

        const res = await axiosInstance.put("/user/updateProfile", {
          name,
          birthDate,
          age,
          gender,
          address,
          phone,
        });
        set({ user: res.data.user, loading: false, message: res.data.message });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    updatePassword: async (oldPass, newPass) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.put("/user/updatePassword", {
          oldPass,
          newPass,
        });
        set({ message: res.data.message, loading: false });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    forgetPasswordCode: async (email) => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.post("/user/sendForgetPassCode", {
          email,
        });
        set({ message: res.data.message, loading: false });
        return { success: true };
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
        return { success: false };
      }
    },

    forgetPassword: async (email, verificationCode, newPassword) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.post("/user/forgetPassword", {
          email,
          verificationCode,
          newPassword,
        });
        set({ message: res.data.message, loading: false });
        return { success: true };
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
        return { success: false };
      }
    },

    resetMessage: () => set({ error: null, message: null }),
  };
});

export default authUser;
