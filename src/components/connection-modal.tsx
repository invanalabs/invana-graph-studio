import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2, X, Server } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Connection {
  id: string
  name: string
  url: string
  username?: string
  password?: string
}

export function ConnectionModalComponent() {
  const [connections, setConnections] = useState<Connection[]>([])
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [activeTab, setActiveTab] = useState("create")

  const handleAddConnection = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newConnection: Connection = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    }
    setConnections([...connections, newConnection])
    event.currentTarget.reset()
    toast({
      title: "Success",
      description: "Connection added successfully.",
    })
  }

  const handleEditConnection = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingConnection) return
    const formData = new FormData(event.currentTarget)
    const updatedConnection: Connection = {
      ...editingConnection,
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    }
    setConnections(connections.map(c => c.id === updatedConnection.id ? updatedConnection : c))
    setEditingConnection(null)
    setActiveTab("connections")
    toast({
      title: "Success",
      description: "Connection updated successfully.",
    })
  }

  const handleDeleteConnection = (id: string) => {
    setConnections(connections.filter(c => c.id !== id))
    toast({
      title: "Success",
      description: "Connection deleted successfully.",
    })
  }

  const startEditing = (connection: Connection) => {
    setEditingConnection(connection)
    setActiveTab("create")
  }

  const cancelEditing = () => {
    setEditingConnection(null)
    setActiveTab("connections")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Server className="h-4 w-4" />
          Manage Connections
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Invana Studio Connections</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {editingConnection ? "Edit Connection" : "Create Connection"}
            </TabsTrigger>
            <TabsTrigger value="connections" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Connections
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="mt-0">
            {editingConnection && (
              <div className="mb-4 flex items-center justify-between bg-muted p-2 rounded-md">
                <Badge variant="secondary" className="text-sm font-medium">Editing Connection</Badge>
                <Button variant="ghost" size="icon" onClick={cancelEditing} className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel editing</span>
                </Button>
              </div>
            )}
            <form onSubmit={editingConnection ? handleEditConnection : handleAddConnection} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Connection Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="My Connection" 
                  required 
                  defaultValue={editingConnection?.name}
                  className="border-input bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url" className="text-sm font-medium">Invana engine url</Label>
                <Input 
                  id="url" 
                  name="url" 
                  placeholder="https://megamind-ws/graphql" 
                  required 
                  defaultValue={editingConnection?.url}
                  className="border-input bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  placeholder="Username" 
                  defaultValue={editingConnection?.username}
                  className="border-input bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  defaultValue={editingConnection?.password}
                  className="border-input bg-background"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {editingConnection ? "Update Connection" : "Create Connection"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="connections" className="mt-0">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {connections.map(connection => (
                  <div key={connection.id} className="flex items-center justify-between p-3 border rounded-lg transition-colors hover:bg-muted">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{connection.name}</span>
                      <span className="text-sm text-muted-foreground">{connection.url}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => startEditing(connection)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit connection</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteConnection(connection.id)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete connection</span>
                      </Button>
                    </div>
                  </div>
                ))}
                {connections.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>No connections yet</p>
                    <p className="text-sm">Create a new connection to get started</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}