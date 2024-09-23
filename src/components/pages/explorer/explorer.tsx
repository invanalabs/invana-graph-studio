'use client'

import { useState } from 'react'
import WorkspaceLayout from '../../layouts/workspace'
import ExplorerMainToolBar from './main-toolbar'
import PageListFooter from './pages-list'
import PageSection from './page-section'


export default function ExplorerPage() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])


  const addPage = () => {
    const newPage = `Page ${pages.length + 1}`
    setPages([...pages, newPage])
    setCurrentPageIndex(pages.length)
  }

  return (
    <WorkspaceLayout>
      <ExplorerMainToolBar/>
      <PageSection />
      <PageListFooter />
    </WorkspaceLayout>


  )
}