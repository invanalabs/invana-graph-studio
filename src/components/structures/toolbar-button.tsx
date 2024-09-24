import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Button } from "../ui/button"
import { ReactNode } from "react"


interface ToolBarButtonProps {
    icon: ReactNode,
    tooltip: string,
    onClick: () => void,
    isActive?: false
    label?: string | null
}


export const ToolBarButton = ({ icon, tooltip, onClick, isActive = false, label=null }: ToolBarButtonProps) => {
    // # Make sure to call `ToolBarButton` within ` <TooltipProvider>  </TooltipProvider>`
    /* 
        {
            icon: <Terminal className="h-4 w-4" />,
            tooltip: 'Terminal',
            onClick: () => alert("clicked terminal")
        }

    */
    return <Tooltip>
        <TooltipTrigger asChild>
            <Button
                variant={isActive ? "secondary" : "ghost"}
                size="default"
                onClick={onClick}
                className="h-full px-2 py-2 rounded-none text-zinc-500 hover:bg-transparent hover:text-zinc-100" >
                {icon} {label? <span className="text-xs">{label}</span>: <></> }
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p className="text-xs">{tooltip}</p>
        </TooltipContent>
    </Tooltip>

}

