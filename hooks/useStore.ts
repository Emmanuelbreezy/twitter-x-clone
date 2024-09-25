import { create, StateCreator } from "zustand";

// UserName slice
type UserNameSlice = {
  isUserNameModalOpen: boolean;
  openUserNameModal: () => void;
  closeUserNameModal: () => void;
};

const createUserNameSlice: StateCreator<
  UserNameSlice,
  [],
  [],
  UserNameSlice
> = (set) => ({
  isUserNameModalOpen: false,
  openUserNameModal: () => set({ isUserNameModalOpen: true }),
  closeUserNameModal: () => set({ isUserNameModalOpen: false }),
});

// BirthDate slice
type BirthDateSlice = {
  isBirthDateModalOpen: boolean;
  openBirthDateModal: () => void;
  closeBirthDateModal: () => void;
};

const createBirthDateSlice: StateCreator<
  BirthDateSlice,
  [],
  [],
  BirthDateSlice
> = (set) => ({
  isBirthDateModalOpen: false,
  openBirthDateModal: () => set({ isBirthDateModalOpen: true }),
  closeBirthDateModal: () => set({ isBirthDateModalOpen: false }),
});

// EditModal slice
type EditModalSlice = {
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
};

const createEditModalSlice: StateCreator<
  EditModalSlice,
  [],
  [],
  EditModalSlice
> = (set) => ({
  isEditModalOpen: false,
  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false }),
});

type StoreType = UserNameSlice & BirthDateSlice & EditModalSlice;

// Combine the slices into a single store
export const useStore = create<StoreType>()((...a) => ({
  ...createUserNameSlice(...a),
  ...createBirthDateSlice(...a),
  ...createEditModalSlice(...a),
}));
