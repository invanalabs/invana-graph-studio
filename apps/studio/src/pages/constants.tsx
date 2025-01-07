import { SideBarNavitemProps } from "@invana/ui";
import { CircleHelp, Compass, Database, Network, Package } from "lucide-react";


export const LogoComponent = <Package className="h-5 w-5 text-foreground" />


export const sideBarTopNavitems: SideBarNavitemProps[] = [
  // { name: "Home", href: "/home", icon: Home },
  { name: "Explorer", href: "/explorer", icon: Compass },
  { name: "Modeller", href: "/modeller", icon: Network },
  { name: "Database Connection", href: "/connections", icon: Database },
  // { name: "Activity", href: "#", icon: Clock },
]

export const sideBarBottomNavitems: SideBarNavitemProps[] = [
  // { name: "Activity", href: "/activity", icon: Activity },
  { name: "Invana", href: "https://invana.ai", icon: CircleHelp },
]
