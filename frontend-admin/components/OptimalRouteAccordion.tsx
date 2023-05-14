import { LatLngExpression } from "leaflet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

type RouteStep = {
  binId: number;
  coordinates: LatLngExpression;
};

interface Props {
  steps: RouteStep[];
}

const OptimalRouteAccordion = ({ steps }: Props): JSX.Element => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {steps.map((step, index) => (
        <AccordionItem value={step.binId.toString()} key={step.binId}>
          <AccordionTrigger>
            {index + 1}. Smetnjak #{step.binId}
          </AccordionTrigger>
          <AccordionContent>Koordinate:</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default OptimalRouteAccordion;
