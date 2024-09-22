'use client'

import { useState } from 'react'
import WorkspaceLayout from '../../layouts/workspace'
import ExplorerMainToolBar from './main-toolbar'


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
      <ExplorerMainToolBar></ExplorerMainToolBar>
    </WorkspaceLayout>


  )
}