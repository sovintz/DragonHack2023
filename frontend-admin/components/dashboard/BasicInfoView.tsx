import NotificationsCard from "../cards/NotificationsCard";
import RouteInfoCard from "../cards/RouteInfoCard";
import Image from "next/image";

const BasicInfoView = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="w-full inline-flex gap-1 px-12 justify-end items-center font-semibold text-2xl">
        <Image src="/limonca6.png" width={32} height={32} alt="Lemonbin" />
        <span>Lemonbin</span>
      </div>
      <RouteInfoCard />
      <NotificationsCard className="h-min" />
    </div>
  );
};

export default BasicInfoView;
