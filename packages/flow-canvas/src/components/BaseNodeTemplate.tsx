import React from "react";
import { cn } from "@/lib/utils";


export const BaseNodeTemplate = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, id, selected, ...props }, ref) => (
  <div
    ref={ref}
    id={"node-" + id}
    className={cn(
      "rounded-md border bg-card p-3 text-card-foreground",
      "dark:bg-dark-card dark:text-dark-card-foreground",
      className,
      selected ? "border-muted-foreground shadow-lg" : "",
      "hover:ring-1",
      "dark:hover:ring-dark-ring"
    )}
    tabIndex={0}
    {...props}
  />
));
BaseNodeTemplate.displayName = "BaseNode";