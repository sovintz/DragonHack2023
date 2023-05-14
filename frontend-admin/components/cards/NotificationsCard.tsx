import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const notifications = [
  {
    title: "Koš #33 izpraznjen.",
    description: "Pred 1 uro",
  },
  {
    title: "Koš #133 izpraznjen.",
    description: "Pred 1 uro",
  },
  {
    title: "Koš #133 je POLN!",
    description: "Pred 2 urama",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

const NotificationsCard = ({ className, ...props }: CardProps) => {
  return (
    <Card className={cn("w-[420px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Sporočila</CardTitle>
        <CardDescription>Imate 3 neprebrana sporočila.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Sporočila o dogodkih
            </p>
            <p className="text-sm text-muted-foreground">
              Prejemate sporočila o napolnjenosti košev in ostalih dogodkih.
            </p>
          </div>
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="secondary">
          <Check className="mr-2 h-4 w-4" /> Označi vse kot prebrano
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsCard;
