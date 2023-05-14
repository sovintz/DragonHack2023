import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import BinMarker from "./bin-marker";
import { Bin } from "@/api/endpoints";

const MAPBOX_KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY;

interface Props {
  bins: Bin[];
  pathPositions?: LatLngExpression[];
}

const Maps = ({ bins, pathPositions }: Props): JSX.Element => {
  return (
    <MapContainer
      className="h-full w-full"
      center={bins[0].coordinates as LatLngExpression}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/horvatz/clhm0e3q201o701qyfwhpf4x2/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_KEY}`}
      />
      {bins.map((bin, index) => (
        <BinMarker bin={bin} key={index} />
      ))}
      {pathPositions && <Polyline positions={pathPositions} />}
    </MapContainer>
  );
};

export default Maps;
