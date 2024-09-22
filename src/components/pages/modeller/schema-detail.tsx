"use client"

import { ChevronDown, MoreVertical, Check, X, Plus } from "lucide-react"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Property {
  id: string
  name: string
  value: string
}

export default function Component() {
  const [openAccordion, setOpenAccordion] = useState<string | undefined>("properties")
  const [properties, setProperties] = useState<Property[]>([
    { id: "1", name: "name", value: "Ravi Raja" },
    { id: "2", name: "email", value: "ravi@invana.io" },
    { id: "3", name: "bio", value: "Enjoys mountains, camping in the forests." },
  ])
  const [editingProperty, setEditingProperty] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editValue, setEditValue] = useState("")
  const [newPropertyName, setNewPropertyName] = useState("")
  const [newPropertyValue, setNewPropertyValue] = useState("")
  const [showAddProperty, setShowAddProperty] = useState(false)

  const handleEdit = (id: string, name: string, value: string) => {
    setEditingProperty(id)
    setEditName(name)
    setEditValue(value)
  }

  const handleSave = (id: string) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, name: editName, value: editValue } : prop
    ))
    setEditingProperty(null)
  }

  const handleCancel = () => {
    setEditingProperty(null)
  }

  const handleDelete = (id: string) => {
    setProperties(properties.filter(prop => prop.id !== id))
  }

  const handleAddProperty = () => {
    if (newPropertyName && newPropertyValue) {
      setProperties([...properties, { 
        id: Date.now().toString(), 
        name: newPropertyName, 
        value: newPropertyValue 
      }])
      setNewPropertyName("")
      setNewPropertyValue("")
      setShowAddProperty(false)
    }
  }

  return (
    <div className="h-screen p-4 bg-gray-100">
      <Card className="h-full max-w-md mx-auto overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="p-4 border-l-4 border-red-500 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">Person: #8701264159012365</h2>
            <p className="text-2xl font-bold mt-2">Ravi</p>
            <p className="text-sm text-gray-600">label: Person</p>
            <p className="text-sm text-gray-600">id: 8701264159012365</p>
          </div>

          <Accordion 
            type="single" 
            collapsible 
            value={openAccordion} 
            onValueChange={setOpenAccordion}
            className="flex-grow overflow-auto"
          >
            <AccordionItem value="properties">
              <AccordionTrigger className="px-4 py-2 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800">PROPERTIES</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <div className="space-y-3">
                  {properties.map((property) => (
                    <div key={property.id} className="flex justify-between items-center">
                      {editingProperty === property.id ? (
                        <div className="flex items-center space-x-2 w-full">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-1/3"
                            placeholder="Name"
                          />
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-1/3"
                            placeholder="Value"
                          />
                          <Button size="icon" onClick={() => handleSave(property.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-600">{property.name} :</p>
                          <div className="flex items-center">
                            <p className="text-gray-800 mr-2">{property.value}</p>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-5 w-5 text-gray-400" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => handleEdit(property.id, property.name, property.value)}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleDelete(property.id)} className="text-red-600">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {showAddProperty ? (
                    <div className="flex items-center space-x-2 mt-4">
                      <Input
                        value={newPropertyName}
                        onChange={(e) => setNewPropertyName(e.target.value)}
                        placeholder="New property name"
                        className="w-1/3"
                      />
                      <Input
                        value={newPropertyValue}
                        onChange={(e) => setNewPropertyValue(e.target.value)}
                        placeholder="New property value"
                        className="w-1/3"
                      />
                      <Button onClick={handleAddProperty}>
                        <Plus className="h-4 w-4 mr-2" /> Add
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddProperty(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setShowAddProperty(true)} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" /> Add New Property
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="relationships">
              <AccordionTrigger className="px-4 py-2 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800">RELATIONSHIPS</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-4 bg-red-500 rounded"></div>
                    <div className="border border-gray-300 rounded px-2">authored</div>
                    <div className="w-16 h-4 bg-teal-500 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-4 bg-red-500 rounded"></div>
                    <div className="border border-gray-300 rounded px-2">knows</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-4 bg-gray-500 rounded"></div>
                    <div className="border border-gray-300 rounded px-2">authored</div>
                    <div className="w-16 h-4 bg-red-500 rounded"></div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="display-settings">
              <AccordionTrigger className="px-4 py-2 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800">DISPLAY SETTINGS</h3>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-2">
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 mb-1">display property name</p>
                    <Select defaultValue="name">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">name</SelectItem>
                        <SelectItem value="email">email</SelectItem>
                        <SelectItem value="full_name">full_name</SelectItem>
                        <SelectItem value="is_active">is_active</SelectItem>
                        <SelectItem value="created_at">created_at</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">display color</p>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-black rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">display shape</p>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                      <div className="w-6 h-6 bg-gray-200 transform rotate-45"></div>
                      <div className="w-6 h-6 text-gray-200 flex items-center justify-center">★</div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}