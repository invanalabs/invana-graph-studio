'use client'
import PageListSection from './pages-list'
import PageSection from './page-section'
import DefaultLayout from '@/components/layouts/default'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import {  GripVertical, SearchCode } from 'lucide-react'
import LeftSideBar from '@/components/structures/left-sidebar'
import Footer from '@/components/structures/footer'
import { useAppStore } from "@/store/appStore"
import { Header } from '@/components/structures/header'
import CanvasToolBar from './canvas/toolbar'
import RightSideBar from '@/components/structures/right-sidebar'

export default function ExplorerPage() {
  // const [activePage, setActivePage] = useState(0)
  // const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])
  // const [showQueryConsole, setShowQueryConsole] = useState(false)
  const { rightSidebar, setRightSidebar, addPage, pages, setActivePage, leftSidebar, setLeftSidebar } = useAppStore()

  const defaultLeftSize = 35;
  return (
    <DefaultLayout>

      <Header
        left={<span className="font-bold">Explorer</span> }       
        middle={<CanvasToolBar />}
        ></Header>
      <div className="flex-1 flex overflow-hidden relative">
        <ResizablePanelGroup direction="horizontal">
          { (leftSidebar && leftSidebar == "query-console") && (
            <>
              <ResizablePanel defaultSize={defaultLeftSize} minSize={17} maxSize={40}>
                <LeftSideBar onClose={() => setLeftSidebar(null)}
                  header={<div className='flex text-xs'><SearchCode className='w-4 h-4 mr-2' /> Query Console</div>}>
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
          <ResizablePanel defaultSize={leftSidebar ? 100-defaultLeftSize : 100}>

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

        {rightSidebar &&
          <RightSideBar onClose={() => setRightSidebar(null)}
          header={<div className='flex text-xs'><SearchCode className='w-4 h-4 mr-2' /> Right sidebar test</div>}>
          <p>content here</p>
        </RightSideBar>
       }

   
      </div>
    </DefaultLayout>


  )
}