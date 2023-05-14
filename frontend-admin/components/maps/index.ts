import dynamic from "next/dynamic";

// Needed to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./maps"), {
  ssr: false,
});

export { MapComponent };
