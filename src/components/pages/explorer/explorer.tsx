'use client'

import { useState } from 'react'
import WorkspaceLayout from '../../layouts/workspace'
import ExplorerMainToolBar from './main-toolbar'
import PageListSection from './pages-list'
import PageSection from './page-section'
import RightSideBar from '@/components/structures/right-sidebar'
import DefaultLayout from '@/components/layouts/default'


export default function ExplorerPage() {
  const [activePage, setActivePage] = useState(0)
  const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])


  const addPage = () => {
    const newPage = `Page ${pages.length + 1}`
    setPages([...pages, newPage])
    setActivePage(pages.length)
  }

  return (
    <DefaultLayout>
      <ExplorerMainToolBar />
      <PageSection />
      <PageListSection />
      <RightSideBar />

    </DefaultLayout>


  )
}