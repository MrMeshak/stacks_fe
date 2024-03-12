import { create } from 'zustand';

interface IProjectPageState {
  isSideBarOpen: boolean;

  actions: {
    toggleSideBarOpen: () => void;
  };
}

const useProjectPageStore = create<IProjectPageState>((set) => {
  return {
    isSideBarOpen: true,
    actions: {
      toggleSideBarOpen: () => {
        set((state) => ({
          isSideBarOpen: !state.isSideBarOpen,
        }));
      },
    },
  };
});

export const useProjectPageActions = () =>
  useProjectPageStore((state) => state.actions);

export const useProjectPageIsSideBarOpen = () =>
  useProjectPageStore((state) => state.isSideBarOpen);
