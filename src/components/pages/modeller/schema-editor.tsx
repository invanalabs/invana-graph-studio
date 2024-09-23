import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus, Trash2, Edit, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function Component() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [properties, setProperties] = useState([
    { name: 'name', type: 'string', cardinality: 'single' },
    { name: 'email', type: 'string', cardinality: 'single' },
    { name: 'bio', type: 'string', cardinality: 'single' },
  ])
  const [indexes, setIndexes] = useState([
    { name: 'name', type: 'composite', properties: ['name'] },
  ])
  const [relationships, setRelationships] = useState([
    { from: 'Person', type: 'authored', cardinality: 'MULTI', to: 'Project' },
  ])
  const [showAddForm, setShowAddForm] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<{ type: string; index: number } | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
    setShowAddForm(null)
    setEditingItem(null)
  }

  const handleAdd = (type: string, item: any) => {
    switch (type) {
      case 'properties':
        setProperties(prevProperties => [...prevProperties, item])
        break
      case 'indexes':
        setIndexes(prevIndexes => [...prevIndexes, item])
        break
      case 'relationships':
        setRelationships(prevRelationships => [...prevRelationships, item])
        break
    }
    setShowAddForm(null)
  }

  const handleEdit = (type: string, index: number, item: any) => {
    switch (type) {
      case 'properties':
        setProperties(properties.map((prop, i) => i === index ? item : prop))
        break
      case 'indexes':
        setIndexes(indexes.map((idx, i) => i === index ? item : idx))
        break
      case 'relationships':
        setRelationships(relationships.map((rel, i) => i === index ? item : rel))
        break
    }
    setEditingItem(null)
  }

  const handleDelete = (type: string, index: number) => {
    switch (type) {
      case 'properties':
        setProperties(properties.filter((_, i) => i !== index))
        break
      case 'indexes':
        setIndexes(indexes.filter((_, i) => i !== index))
        break
      case 'relationships':
        setRelationships(relationships.filter((_, i) => i !== index))
        break
    }
  }

  const PropertyForm = ({ onSubmit, onCancel, initialData = {} }) => (
    <form className="space-y-4 mt-2" onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      onSubmit({
        name: formData.get('name') as string,
        type: formData.get('type') as string,
        cardinality: formData.get('cardinality') as string,
      })
    }}>
      <Input name="name" placeholder="Property Name" defaultValue={initialData.name || ''} className="h-8 text-sm" />
      <Select name="type" defaultValue={initialData.type || ''}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Data Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="string">string</SelectItem>
          <SelectItem value="number">number</SelectItem>
          <SelectItem value="boolean">boolean</SelectItem>
        </SelectContent>
      </Select>
      <Select name="cardinality" defaultValue={initialData.cardinality || ''}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Cardinality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single">single</SelectItem>
          <SelectItem value="multiple">multiple</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm">{initialData.name ? 'Update' : 'Add'} Property</Button>
      </div>
    </form>
  )

  const IndexForm = ({ onSubmit, onCancel, initialData = {} }) => (
    <form className="space-y-4 mt-2" onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      onSubmit({
        name: formData.get('name') as string,
        type: formData.get('type') as string,
        properties: [formData.get('property') as string],
      })
    }}>
      <Input name="name" placeholder="Index Name" defaultValue={initialData.name || ''} className="h-8 text-sm" />
      <Select name="type" defaultValue={initialData.type || ''}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Index Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="composite">Composite Index</SelectItem>
          <SelectItem value="unique">Unique Constraint</SelectItem>
        </SelectContent>
      </Select>
      <Select name="property" defaultValue={initialData.properties?.[0] || ''}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Select Property" />
        </SelectTrigger>
        <SelectContent>
          {properties.map((prop) => (
            <SelectItem key={prop.name} value={prop.name}>{prop.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm">{initialData.name ? 'Update' : 'Add'} Index</Button>
      </div>
    </form>
  )

  const RelationshipForm = ({ onSubmit, onCancel, initialData = {} }) => (
    <form className="space-y-4 mt-2" onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      onSubmit({
        from: 'Person',
        type: formData.get('type') as string,
        cardinality: formData.get('cardinality') as string,
        to: formData.get('to') as string,
      })
    }}>
      <Input name="type" placeholder="Relationship Type" defaultValue={initialData.type || ''} className="h-8 text-sm" />
      <Select name="cardinality" defaultValue={initialData.cardinality || ''}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Cardinality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SINGLE">SINGLE</SelectItem>
          <SelectItem value="MULTI">MULTI</SelectItem>
        </SelectContent>
      </Select>
      <Input name="to" placeholder="To Node" defaultValue={initialData.to || ''} className="h-8 text-sm" />
      <div className="flex justify-end space-x-2">
        <Button type="button" size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm">{initialData.type ? 'Update' : 'Add'} Relationship</Button>
      </div>
    </form>
  )

  const DeleteConfirmation = ({ onConfirm, onCancel, itemType, itemName }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this {itemType}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {itemType} "{itemName}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <Card className="w-full h-full max-w-md mx-auto flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>NODE LABEL DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <h2 className="text-xl font-semibold mb-4">Person</h2>
          
          <div className="space-y-4">
            <div className="p-2 rounded-lg transition-colors hover:bg-secondary/80">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('properties')}>
                <h3 className="text-lg font-semibold">PROPERTIES</h3>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation()
                    setShowAddForm(showAddForm === 'properties' ? null : 'properties')
                    setEditingItem(null)
                    setActiveSection('properties')
                  }}>
                    {showAddForm === 'properties' ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                  {activeSection === 'properties' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              {activeSection === 'properties' && (
                <div className="mt-2 space-y-2">
                  {properties.map((prop, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm">{prop.name}</span>
                      <span className="text-xs text-gray-500">{prop.type}</span>
                      <span className="text-xs text-gray-500">{prop.cardinality}</span>
                      <Button variant="ghost" size="icon" onClick={() => setEditingItem({ type: 'properties', index })}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmation
                        onConfirm={() => handleDelete('properties', index)}
                        onCancel={() => {}}
                        itemType="property"
                        itemName={prop.name}
                      />
                    </div>
                  ))}
                  {showAddForm === 'properties' && (
                    <PropertyForm 
                      onSubmit={(item) => handleAdd('properties', item)} 
                      onCancel={() => setShowAddForm(null)}
                    />
                  )}
                  {editingItem?.type === 'properties' && (
                    <PropertyForm 
                      onSubmit={(item) => handleEdit('properties', editingItem.index, item)} 
                      onCancel={() => setEditingItem(null)}
                      initialData={properties[editingItem.index]}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="p-2 rounded-lg transition-colors hover:bg-secondary/80">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('indexes')}>
                <h3 className="text-lg font-semibold">INDEXES</h3>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation()
                    setShowAddForm(showAddForm === 'indexes' ? null : 'indexes')
                    setEditingItem(null)
                    setActiveSection('indexes')
                  }}>
                    {showAddForm === 'indexes' ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                  {activeSection === 'indexes' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              {activeSection === 'indexes' && (
                <div className="mt-2 space-y-2">
                  {indexes.map((index, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-sm">{index.name}</span>
                      <span className="text-xs text-gray-500">{index.type}</span>
                      <span className="text-xs text-gray-500">{index.properties.join(', ')}</span>
                      <Button variant="ghost" size="icon" onClick={() => setEditingItem({ type: 'indexes', index: i })}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmation
                        onConfirm={() => handleDelete('indexes', i)}
                        onCancel={() => {}}
                        itemType="index"
                        itemName={index.name}
                      />
                    </div>
                  ))}
                  {showAddForm === 'indexes' && (
                    <IndexForm 
                      onSubmit={(item) => handleAdd('indexes', item)} 
                      onCancel={() => setShowAddForm(null)}
                    />
                  )}
                  {editingItem?.type === 'indexes' && (
                    <IndexForm 
                      onSubmit={(item) => handleEdit('indexes', editingItem.index, item)} 
                      onCancel={() => setEditingItem(null)}
                      initialData={indexes[editingItem.index]}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="p-2 rounded-lg transition-colors hover:bg-secondary/80">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('relationships')}>
                <h3 className="text-lg font-semibold">RELATIONSHIPS</h3>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation()
                    setShowAddForm(showAddForm === 'relationships' ? null : 'relationships')
                    setEditingItem(null)
                    setActiveSection('relationships')
                  }}>
                    {showAddForm === 'relationships' ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                  {activeSection === 'relationships' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              {activeSection === 'relationships' && (
                <div className="mt-2 space-y-2">
                  {relationships.map((rel, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-sm">{rel.from}</span>
                      <span className="text-xs">{rel.type}({rel.cardinality})</span>
                      <span className="text-sm">{rel.to}</span>
                      <Button variant="ghost" size="icon" onClick={() => setEditingItem({ type: 'relationships', index: i })}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmation
                        onConfirm={() => handleDelete('relationships', i)}
                        onCancel={() => {}}
                        itemType="relationship"
                        itemName={`${rel.from}-${rel.type}-${rel.to}`}
                      />
                    </div>
                  ))}
                  {showAddForm === 'relationships' && (
                    <RelationshipForm 
                      onSubmit={(item) => handleAdd('relationships', item)} 
                      onCancel={() => setShowAddForm(null)}
                    />
                  )}
                  {editingItem?.type === 'relationships' && (
                    <RelationshipForm 
                      onSubmit={(item) => handleEdit('relationships', editingItem.index, item)} 
                      onCancel={() => setEditingItem(null)}
                      initialData={relationships[editingItem.index]}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}