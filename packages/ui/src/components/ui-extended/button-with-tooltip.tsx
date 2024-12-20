import { Button, ButtonProps } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export interface ButtonWithTooltipProps extends ButtonProps {
  tooltip: React.ReactNode
}

export default function ButtonWithTooltip(props: ButtonWithTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="ghost" {...props}>
            {props.children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {props.tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

