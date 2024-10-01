import { Copy, X } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"






export default function RightSideBar() {

    return (
        <Card
            className="w-[320px] h-[calc(100vh-109px)] absolute right-0 top-[80px] rounded-none shadow-none">
            <CardHeader className="bg-muted">
                <CardTitle className="flex items-center"><Copy className='w-4 h-4 mr-2' /> Hello World</CardTitle>
                <Button variant={"ghost"} className="hover:bg-transparent hover:text-primary p-2 absolute right-0 -top-2"
                    onClick={() => console.log('Close clicked')}>
                    <X className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <p>This is the content of the right panel. You can add any components or information here.</p>
            </CardContent>
        </Card>
    )
}


