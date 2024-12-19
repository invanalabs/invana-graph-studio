import React from "react";
import { cn } from "@/lib/utils";


export const BaseNodeTemplate = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, id, selected, ...props }, ref) => {
  console.log("BaseNodeTemplate", id, selected, props);

  return (
    <div
      ref={ref}
      id={"node-" + id}
      className={cn(
        "default-node rounded-md border border-zinc-700 bg-card p-2 m-0 text-card-foreground",
        "dark:bg-zinc-800 dark:text-dark-card-foreground",
        // " text-center",
        className,
        selected ? "border-muted-foreground shadow-lg" : "",
        "hover:ring-1",
        "dark:hover:ring-dark-ring"
      )}
      tabIndex={0}
      {...props}
    />
  )
});
BaseNodeTemplate.displayName = "GenericNode";