import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const sonodStore = create((set) => {
  return {
    allSonod: [],
    myAllSonod: [],
    applySonod: async (data) => {
      try {
        const res = await axiosInstance.post("/sonod/create-sonod", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    getMySonods: async () => {
      try {
        const res = await axiosInstance.get("/sonod/get-mysonod-list");
        set({ myAllSonod: res.data.mySonods || [] });
        return res?.data?.mySonods;
      } catch (error) {
        console.log(error);
      }
    },
    getAllSonods: async () => {
      try {
        const res = await axiosInstance.get("/sonod/get-allsonod-list");
        set({ allSonod: res.data.allSonods || [] });
        return res?.data?.allSonods;
      } catch (error) {
        console.log(error);
      }
    },
    updateSonodStatus: async (id, status) => {
      try {
        const res = await axiosInstance.put(
          `/sonod/updateSonodStatus/${id}`,
          status
        );
        console.log(res);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    getSonodById: async (id) => {
      try {
        const res = await axiosInstance.get(`/sonod/get-sonod/${id}`);
        return res.data.sonod;
      } catch (error) {
        console.log(error);
      }
    },
  };
});

export default sonodStore;
