import { Copy, X } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ReactNode } from "react"


export interface LeftSideBarProps {
    header : ReactNode
    onClose: () => void
    children : ReactNode
}

export default function LeftSideBar(props: LeftSideBarProps) {

    /*
        <LeftSideBar header={<span><Copy className='w-4 h-4 mr-2' /> "Hello World" </span>} onClose={()=> alert('clicked')}>
            <p>content here</p>
        </LeftSideBar>
    */

    return (
        <Card
            className="h-full border-r border-border flex flex-col rounded-none shadow-none">
            <CardHeader className="bg-muted py-2">
                <CardTitle className="flex items-center justify-between ">
                    <span className="flex items-center">{props.header}</span>
                    <Button variant={"link"} className="!p-0 !h-0" onClick={props.onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </CardTitle>

            </CardHeader>
            <CardContent>{props.children}</CardContent>
        </Card>
    )
}
