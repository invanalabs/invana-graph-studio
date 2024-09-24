'use client'

import { useState } from 'react'
import WorkspaceLayout from '../../layouts/workspace'
import ExplorerMainToolBar from './main-toolbar'
import PageListFooter from './pages-list'
import PageSection from './page-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button'


export default function ExplorerPage() {
  const [activePage, setActivePage] = useState(0)
  const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])


  const addPage = () => {
    const newPage = `Page ${pages.length + 1}`
    setPages([...pages, newPage])
    setActivePage(pages.length)
  }

  return (
    <WorkspaceLayout>
      <ExplorerMainToolBar />
      <PageSection />
      {/* Right Side bar  starts */}
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
      {/* Right side bar ends */}
      <PageListFooter />
    </WorkspaceLayout>


  )
}