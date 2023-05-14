import { Plus, Truck } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import useDashboardStore from "@/store/dashboard-store";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import AddBinDialog from "../dialogs/AddBinDialog";

const RouteInfoCard = () => {
  const setView = useDashboardStore((state) => state.setView);

  return (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Odvoz smeti</CardTitle>
        <CardDescription>Danes je:</CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => setView("bin_route")}
        >
          <Truck className="mr-2 h-4 w-4" /> Začni odvoz
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="secondary">
              <Plus className="mr-2 h-4 w-4" /> Dodaj smetnjak
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddBinDialog />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default RouteInfoCard;
