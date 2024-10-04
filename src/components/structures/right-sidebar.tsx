import { Copy, X } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useAppStore } from "@/store/appStore"
import { ReactNode } from "react"



export interface RightSideBarProps {
    header : ReactNode
    onClose: () => void
    children : ReactNode
}



export default function RightSideBar(props: RightSideBarProps) {



    return (
        <Card
            className="w-[320px] h-[calc(100vh-103px)] absolute right-0 top-[30px] rounded-none shadow-none">
            <CardHeader className="bg-muted">
                <CardTitle className="flex items-center">{props.header}</CardTitle>
                <Button variant={"ghost"} className="hover:bg-transparent hover:text-primary p-2 absolute right-0 -top-2"
                    onClick={props.onClose}>
                    <X className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    )
}


