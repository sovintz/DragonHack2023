import { useCallback, useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<boolean>(false);

  const getCurrentLocation = useCallback(async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        setError(false);
        setLocation(position);
        console.log(position);
      } catch (error) {
        console.error("Error getting user location");
        setError(true);
      }
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return { location, error };
};

export default useGeolocation;
