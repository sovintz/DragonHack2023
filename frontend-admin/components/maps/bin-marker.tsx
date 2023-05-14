import { Popup } from "react-leaflet";
import { Battery, Trash2 } from "lucide-react";
import { Marker } from "react-leaflet";
import { Badge } from "../ui/badge";
import { LatLngExpression, icon } from "leaflet";
import { Bin } from "@/api/endpoints";

interface Props {
  // position: LatLngExpression;
  bin: Bin;
}

const trashMarkerIcon = icon({
  iconUrl: "/trash.svg",
  iconSize: [40, 40],
});

const BinMarker = ({ bin }: Props): JSX.Element => {
  return (
    <Marker
      position={bin.coordinates as LatLngExpression}
      icon={trashMarkerIcon}
    >
      <Popup minWidth={350}>
        <div className="p-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-base text-ellipsis font-semibold leading-none tracking-tight">
                Smetnjak {bin._id}
              </span>
              <div className="inline-flex flex-wrap gap-1">
                {bin.public && <Badge className="w-fit">JAVNO</Badge>}
                {bin.level > 100 ? (
                  <Badge className="w-fit" variant="destructive">
                    POLNO
                  </Badge>
                ) : bin.level < 0 ? (
                  <Badge className="w-fit" variant="destructive">
                    ODPRTI SMETNJAK
                  </Badge>
                ) : null}
              </div>
              <div className="inline-flex space-x-1 items-center">
                <Battery className="h-4 w-4 fill-gray-400" />
                <div className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 100) + 1} %
                </div>
              </div>
              {bin.level > 0 && (
                <div className="inline-flex space-x-1 items-center">
                  <Trash2 className="h-4 w-4" />
                  <div className="text-xs text-muted-foreground">
                    {bin.level} % full
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground">
                Latitude: {bin.coordinates[0]}
              </div>
              <div className="text-sm text-muted-foreground">
                Longitude: {bin.coordinates[0]}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default BinMarker;
