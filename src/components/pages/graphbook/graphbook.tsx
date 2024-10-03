'use client'

import { useState } from 'react'
import WorkspaceLayout from '../../layouts/workspace'
import ExplorerMainToolBar from './main-toolbar'
import PageListSection from './pages-list'
import PageSection from './page-section'
import RightSideBar from '@/components/structures/right-sidebar'
import DefaultLayout from '@/components/layouts/default'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { GripVertical } from 'lucide-react'
import LeftSideBar from '@/components/structures/left-sidebar'
import Footer from '@/components/structures/footer'
import { useAppStore } from "@/store/appStore"
import { Notebook } from 'lucide-react'

export default function GraphBookPage() {
  // const [activePage, setActivePage] = useState(0)
  // const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])
  // const [showQueryConsole, setShowQueryConsole] = useState(false)
  const { rightSidebar, setRightSidebar, addPage, pages, setActivePage, leftSidebar, setLeftSidebar } = useAppStore()


  // const addPage = () => {
  //   const newPage = `Page ${pages.length + 1}`
  //   setPages([...pages, newPage])
  //   setActivePage(pages.length)
  // }

  // const [leftSidebarContent, setLeftSidebarContent] = useState<'database' | 'settings' | null>("database")

  return (
    <DefaultLayout>

      <div className="flex-1 flex overflow-hidden relative">
        <ResizablePanelGroup direction="horizontal">
          {leftSidebar && (
            <>
              <ResizablePanel defaultSize={22} minSize={17} maxSize={40}>
                <LeftSideBar onClose={() => setLeftSidebar(null)}
                  title={<div className='flex'><Notebook className='w-4 h-4 mr-2' /> Hello World</div>}>
                  <p>content here</p>
                </LeftSideBar>
              </ResizablePanel>
              <ResizableHandle withHandle>
                <div className="w-1.5 h-full bg-border flex items-center justify-center">
                  <GripVertical size={12} className="text-muted-foreground" />
                </div>
              </ResizableHandle>
            </>
          )}

          <ResizablePanel defaultSize={leftSidebar ? 80 : 100}>
            <div className="flex flex-col h-full border-r">
              {/* {showQueryConsole ? (
                <LeftSideBar />
              ) : ( */}
              <>
                <PageListSection />
                <PageSection />
              </>
              {/* )} */}

              <Footer />
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
    </DefaultLayout>


  )
}