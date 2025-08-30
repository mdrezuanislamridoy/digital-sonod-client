import { create } from "zustand";

const AdminState = create((set) => {
  return {
    selectedPortion: "profile",
    setSelectedPortion: (portion) => {
      set({ selectedPortion: portion });
    },
  };
});

export default AdminState;
