import { create } from "zustand";

type DashboardView = "basic_info" | "bin_route";

interface DashboardState {
  view: DashboardView;
  // eslint-disable-next-line no-unused-vars
  setView: (view: DashboardView) => void;
}

const useDashboardStore = create<DashboardState>()((set) => ({
  view: "basic_info" as DashboardView,
  setView: (view: DashboardView) => set({ view }),
}));

export default useDashboardStore;
