'use client'

import { useState } from 'react'
import WorkspaceLayout from '../../layouts/workspace'
import ExplorerMainToolBar from './main-toolbar'
import PageListSection from './pages-list'
import PageSection from './page-section'
import RightSideBar from '@/components/structures/right-sidebar'
import GraphBookLayout from '@/components/layouts/graphbook'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { GripVertical } from 'lucide-react'
import LeftSideBar from '@/components/structures/left-sidebar'
import Footer from '@/components/structures/footer'


export default function GraphBookPage() {
  const [activePage, setActivePage] = useState(0)
  const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])
  const [showQueryConsole, setShowQueryConsole] = useState(false)


  const addPage = () => {
    const newPage = `Page ${pages.length + 1}`
    setPages([...pages, newPage])
    setActivePage(pages.length)
  }

  const [leftSidebarContent, setLeftSidebarContent] = useState<'database' | 'settings' | null>("database")

  return (
    <GraphBookLayout>

<div className="flex-1 flex overflow-hidden relative">
          <ResizablePanelGroup direction="horizontal">
            {leftSidebarContent && (
              <>
                <ResizablePanel defaultSize={22} minSize={17} maxSize={40}>
                  <LeftSideBar  />
                </ResizablePanel>
                <ResizableHandle withHandle>
                  <div className="w-1.5 h-full bg-border flex items-center justify-center">
                    <GripVertical size={12} className="text-muted-foreground" />
                  </div>
                </ResizableHandle>
              </>
            )}

            <ResizablePanel defaultSize={leftSidebarContent ? 80 : 100}>
              <div className="flex flex-col h-full border-r">
                {showQueryConsole ? (
                  <LeftSideBar />
                ) : (
                  <>
                    <PageListSection />
                    <PageSection />
                  </>
                )}

                <Footer                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>

          {/* {showRightSidebar && <RightSidebar />} */}

          {/* <MainBottom
            showBottomPanel={showBottomPanel}
            bottomPanelTab={bottomPanelTab}
            setBottomPanelTab={setBottomPanelTab}
            setShowBottomPanel={setShowBottomPanel}
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
          /> */}
        </div>
    </GraphBookLayout>


  )
}