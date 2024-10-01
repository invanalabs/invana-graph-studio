'use client'

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { X, GripVertical } from 'lucide-react'
import ActivityDetailPage from './ActivityDetailPage'

interface MainBottomProps {
  showBottomPanel: boolean
  bottomPanelTab: 'activity' | 'connectors'
  setBottomPanelTab: (tab: 'activity' | 'connectors') => void
  setShowBottomPanel: (show: boolean) => void
  selectedQuery: string | null
  setSelectedQuery: (query: string | null) => void
}

export function MainBottomComponent({ showBottomPanel, bottomPanelTab, setBottomPanelTab, setShowBottomPanel, selectedQuery, setSelectedQuery }: MainBottomProps) {
  const queryHistory = [
    { id: '#123k91277d99DU88821g', status: 'SUCCESS', timestamp: '5 min ago', duration: '300ms', request: '{ "query": "SELECT * FROM users" }', response: '{ "data": [...] }' },
    { id: '#456k91277d99DU88822g', status: 'ERROR', timestamp: '10 min ago', duration: '500ms', request: '{ "query": "UPDATE products SET price = 19.99 WHERE id = 1" }', response: '{ "error": "Permission denied" }' },
    { id: '#789k91277d99DU88823g', status: 'SUCCESS', timestamp: '15 min ago', duration: '200ms', request: '{ "query": "INSERT INTO orders (user_id, product_id) VALUES (1, 2)" }', response: '{ "data": { "id": 123 } }' },
  ]

  const connectors = [
    { id: 'conn1', name: 'PostgreSQL Database', type: 'Database', status: 'Connected' },
    { id: 'conn2', name: 'S3 Data Lake', type: 'Storage', status: 'Disconnected' },
    { id: 'conn3', name: 'Kafka Stream', type: 'Streaming', status: 'Connected' },
  ]

  if (!showBottomPanel) return null

  return (
    <div className="absolute bottom-6 left-0 right-0 h-64 border-t border-border bg-background overflow-hidden">
      <Tabs value={bottomPanelTab} onValueChange={(value) => setBottomPanelTab(value as 'activity' | 'connectors')}>
        <div className="flex items-center justify-between border-b border-border h-8">
          <TabsList>
            <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
            <TabsTrigger value="connectors" className="text-xs">Connectors</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="icon" onClick={() => setShowBottomPanel(false)} className="h-8 w-8"><X size={16} /></Button>
        </div>
        <TabsContent value="activity" className="h-[calc(100%-32px)]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
              <ul className="h-full overflow-auto text-xs">
                {queryHistory.map((item, index) => (
                  <li 
                    key={index} 
                    className={`px-2 py-1 cursor-pointer hover:bg-secondary/50 ${selectedQuery === item.id ? 'bg-secondary' : ''}`}
                    onClick={() => setSelectedQuery(item.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.id}</span>
                      <span className={`px-1 py-0.5 rounded text-[10px] ${item.status === 'SUCCESS' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground mt-0.5">
                      <span>{item.timestamp}</span>
                      <span>took {item.duration}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </ResizablePanel>
            <ResizableHandle withHandle>
              <div className="w-1.5 h-full bg-border flex items-center justify-center">
                <GripVertical size={12} className="text-muted-foreground" />
              </div>
            </ResizableHandle>
            <ResizablePanel defaultSize={50}>
              {selectedQuery && (
                <ActivityDetailPage
                  activity={queryHistory.find(q => q.id === selectedQuery)!}
                  onBack={() => setSelectedQuery(null)}
                />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
        <TabsContent value="connectors" className="h-[calc(100%-32px)] overflow-auto">
          <ul className="text-xs">
            {connectors.map((connector, index) => (
              <li key={index} className="px-2 py-1 hover:bg-secondary/50">
                <div className="flex justify-between items-center">
                  <span>{connector.name}</span>
                  <span className={`px-1 py-0.5 rounded text-[10px] ${connector.status === 'Connected' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {connector.status}
                  </span>
                </div>
                <div className="text-muted-foreground mt-0.5">
                  {connector.type}
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}