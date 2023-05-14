import { Truck } from "lucide-react";
import OptimalRouteAccordion from "../OptimalRouteAccordion";
import { Bin } from "@/api/endpoints";
import { Button } from "../ui/button";
import useDashboardStore from "@/store/dashboard-store";

interface Props {
  bins?: Bin[];
}

const BinRouteView = ({ bins }: Props) => {
  const setView = useDashboardStore((state) => state.setView);

  return (
    <div className="flex flex-col gap-4 px-8 justify-center items-center">
      <div className="inline-flex w-full justify-between items-center">
        <Button variant="secondary" onClick={() => setView("basic_info")}>
          Nazaj
        </Button>
        <div className="w-full inline-flex gap-1 justify-end items-center font-semibold text-2xl">
          <Truck />
          <span>Pot pobiranja</span>
        </div>
      </div>
      {bins ? (
        <div className="w-[420px] min-h-[100px]">
          <OptimalRouteAccordion bins={bins} />
        </div>
      ) : null}
    </div>
  );
};

export default BinRouteView;
