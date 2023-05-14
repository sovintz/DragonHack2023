import apiHooks from "@/api/api";
import Loading from "@/components/Loading";
import BasicInfoView from "@/components/dashboard/BasicInfoView";
import BinRouteView from "@/components/dashboard/BinRouteView";
import { MapComponent } from "@/components/maps/index";
import useDashboardStore from "@/store/dashboard-store";
import { LatLngExpression } from "leaflet";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const view = useDashboardStore((state) => state.view);

  const { data: bins, isLoading } = apiHooks.useGetAllBins();
  const { data: pathsData } = apiHooks.useGetPaths();

  const pathPositions: LatLngExpression[] | undefined = pathsData?.map(
    (path) => [path.coordinates[0], path.coordinates[1]]
  );

  if (isLoading || !bins)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading />
      </div>
    );

  return (
    <main
      className={`flex flex-col items-center justify-between ${inter.className}`}
    >
      <div className="relative w-screen grid grid-cols-12">
        {/* Map component */}
        <div className="h-screen z-10 col-span-8">
          <MapComponent bins={bins} pathPositions={pathPositions} />
        </div>
        {/* Trashcan list card */}
        <div className="col-span-4 flex relative flex-col px-2 py-8">
          {view === "basic_info" ? (
            <BasicInfoView />
          ) : (
            <BinRouteView bins={pathsData} />
          )}
        </div>
      </div>
    </main>
  );
}
