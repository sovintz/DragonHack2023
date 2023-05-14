import { Truck } from "lucide-react";
import OptimalRouteAccordion from "../OptimalRouteAccordion";
import { Card, CardContent } from "../ui/card";

const BinRouteView = () => {
  return (
    <div className="flex flex-col gap-4 px-12 justify-center items-center">
      <div className="w-full inline-flex gap-1 justify-end items-center font-semibold text-2xl">
        <Truck />
        <span>Optimalna pot pobiranja</span>
      </div>
      <Card className="w-[420px] min-h-[100px]">
        <CardContent>
          <OptimalRouteAccordion
            steps={[{ binId: 1232, coordinates: [46.056946, 14.505751] }]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BinRouteView;
