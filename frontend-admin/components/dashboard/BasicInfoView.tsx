import { Trash2 } from "lucide-react";
import NotificationsCard from "../cards/NotificationsCard";
import RouteInfoCard from "../cards/RouteInfoCard";

const BasicInfoView = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="w-full inline-flex gap-1 px-12 justify-end items-center font-semibold text-2xl">
        <Trash2 />
        <span>SmetnJAKI</span>
      </div>
      <RouteInfoCard />
      <NotificationsCard className="h-min" />
    </div>
  );
};

export default BasicInfoView;
