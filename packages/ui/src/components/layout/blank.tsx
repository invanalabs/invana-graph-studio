import * as React from "react"
import { Package, } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { Separator } from "../ui/separator"

export interface SideBarNavitemProps {
  name: string
  href: string
  icon: React.ElementType
}

export interface BlankLayoutProps {
  children: React.ReactNode;
  logo: React.ReactNode;
  sideBarTopNavitems?: SideBarNavitemProps[];
  sideBarBottomNavitems?: SideBarNavitemProps[];
}


export function BlankLayout(props: BlankLayoutProps) {

  return (
    <TooltipProvider delayDuration={0}>
      <div className="grid min-h-screen w-full lg:grid-cols-[50px_1fr]">
        <nav className="hidden border-r border-border bg-background lg:block">
          <div className="flex h-[50px] items-center justify-center border-b">
            <a href="">
              <Package className="h-5 w-5 text-foreground" />
            </a>
          </div>
          <div className="flex flex-col justify-between h-[calc(100vh-50px)]">
            <div className="">
              {props.sideBarTopNavitems?.map((item) => (
                <>
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <a
                        href={item.href}
                        className="flex h-[50px] w-full items-center justify-center 
                      rounded-md text-muted-foreground transition-colors 
                      hover:bg-accent hover:text-accent-foreground px-2 py-2"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.name}</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                  <Separator />
                </>

              ))}
            </div>
            <div className="">
              {props.sideBarBottomNavitems?.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      className="flex h-[50px] w-full px-2 py-2 items-center justify-center 
                      rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
          {/* <div className="border-t">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-[50px] w-full justify-center rounded-none p-0 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User Profile</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                John Doe
                <br />
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </TooltipContent>
            </Tooltip>
          </div> */}
        </nav>
        <div className="flex flex-col">
          {props.children}
        </div>
      </div>
    </TooltipProvider>
  )
}

