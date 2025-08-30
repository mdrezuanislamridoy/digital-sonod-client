import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const sonodStore = create((set) => {
  return {
    applySonod: async (data) => {
      try {
        const res = await axiosInstance.post("/sonod/create-sonod", data);

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
});

export default sonodStore;
