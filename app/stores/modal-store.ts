"use client";

import { create } from "zustand";

interface ModalStore {
  openClear: boolean;
  openForm: boolean;

  setOpenForm: (openForm: boolean) => void;
  setOpenClear: (openClear: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openClear: false,
  openForm: false,

  setOpenForm: (openForm: boolean) => set(() => ({ openForm })),
  setOpenClear: (openClear) => set(() => ({ openClear })),
}));
