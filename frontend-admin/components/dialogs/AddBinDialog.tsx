import useGeolocation from "@/hooks/useGeolocation";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import Loading from "../Loading";
import { Button } from "../ui/button";
import { Check, Trash2 } from "lucide-react";
import apiHooks from "@/api/api";
import { CreateBin } from "@/api/endpoints";
import { toast } from "react-toastify";

const AddBinDialog = (): JSX.Element => {
  const { location, error } = useGeolocation();

  const { mutate, isSuccess } = apiHooks.useCreateBin();

  const handleAddBin = (location: GeolocationPosition) => {
    const bin: CreateBin = {
      coordinates: [location.coords.latitude, location.coords.longitude],
      public: false,
    };

    mutate(bin);
    toast.success("Smetnjak uspešno dodan");
  };

  if (isSuccess) {
    return (
      <DialogHeader>
        <DialogTitle>Dodajte novi smetnjak</DialogTitle>
        <DialogDescription>
          Za dodajanje smetnjaka morate dovoliti pravice lokacije.
        </DialogDescription>
        <div className="w-full inline-flex justify-center py-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            <Check />
            <span className="text-sm text-muted-foreground">
              Smetnjak uspešno dodan
            </span>
          </div>
        </div>
      </DialogHeader>
    );
  }

  return (
    <DialogHeader>
      <DialogTitle>Dodajte novi smetnjak</DialogTitle>
      <DialogDescription>
        Za dodajanje smetnjaka morate dovoliti pravice lokacije.
      </DialogDescription>
      <div className="w-full inline-flex justify-center py-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          {!location ? (
            <>
              <Loading />
              <span className="text-sm text-muted-foreground">
                Čakam lokacijo...
              </span>
            </>
          ) : error ? (
            <>
              <span className="text-sm text-muted-foreground">
                Napaka pri zaznavanju lokacije
              </span>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">
                Latitude: {location.coords.latitude}
              </span>
              <span className="text-sm text-muted-foreground">
                Longitude: {location.coords.longitude}
              </span>
            </>
          )}
        </div>
      </div>
      {location && (
        <Button onClick={() => handleAddBin(location)} className="w-full">
          <Trash2 className="mr-2 h-4 w-4" /> Dodaj smetnjak
        </Button>
      )}
    </DialogHeader>
  );
};

export default AddBinDialog;
