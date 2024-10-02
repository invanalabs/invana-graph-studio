import { Copy, X } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


export default function LeftSideBar() {

    return (
        <Card
            className="h-full border-r border-border flex flex-col rounded-none shadow-none">
            <CardHeader className="bg-muted py-2">
                <CardTitle className="flex items-center justify-between ">
                    <span className="flex items-center"><Copy className='w-4 h-4 mr-2' /> Hello World </span>
                    <Button variant={"link"} className="!p-0 !h-0"
                        onClick={() => console.log('Close clicked')}>
                        <X className="w-4 h-4" />
                    </Button>
                </CardTitle>

            </CardHeader>
            <CardContent>
                <p>This is the content of the left panel. You can add any components or information here.</p>
            </CardContent>
        </Card>
    )
}
