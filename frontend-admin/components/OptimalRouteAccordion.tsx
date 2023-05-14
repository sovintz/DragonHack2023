import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Bin } from "@/api/endpoints";

interface Props {
  bins: Bin[];
}

const OptimalRouteAccordion = ({ bins }: Props): JSX.Element => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {bins.map((bin, index) => (
        <AccordionItem value={bin._id.toString()} key={bin._id}>
          <AccordionTrigger>
            {index + 1}. Smetnjak #{bin._id}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground">
                Latitude: {bin.coordinates[0]}
              </div>
              <div className="text-sm text-muted-foreground">
                Longitude: {bin.coordinates[0]}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default OptimalRouteAccordion;
