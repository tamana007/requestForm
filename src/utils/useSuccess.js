// import create from 'zustand';
import { create } from "zustand"

const useSuccsess = create((set) => ({
  isSuccess: false,
  setIsSuccess: (flag) => set({ isSuccess: flag }),
}));

export default useSuccsess;