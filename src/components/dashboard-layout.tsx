'use client'

import { useState } from 'react'
import { Header } from './ui/structure/header'
import { LeftNav } from './ui/structure/left-nav'
import { MainContent } from './ui/structure/main'


export default function DarkThemeDashboardLayout() {
  const [currentWorkspace, setCurrentWorkspace] = useState('Personal')
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const addPage = () => {
    const newPage = `Page ${pages.length + 1}`
    setPages([...pages, newPage])
    setCurrentPageIndex(pages.length)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="flex flex-1 overflow-hidden">
        <LeftNav currentWorkspace={currentWorkspace} setCurrentWorkspace={setCurrentWorkspace} />
        <MainContent
          pages={pages}
          currentPageIndex={currentPageIndex}
          setCurrentPageIndex={setCurrentPageIndex}
          addPage={addPage}
        />
      </div>
    </div>
  )
}