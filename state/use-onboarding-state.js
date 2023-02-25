import { createStore } from "state/helpers";

const useOnboardingState = createStore((set) => ({
  userName: "Raghav",
  setUserName: (name) =>
    set((draft) => {
      draft.userName = name;
    }),
}));

export const selectors = {
  selectStateUserName: (state) => state.userName,
  selectUpdateUserName: (state) => state.setUserName,
};

export default useOnboardingState;
