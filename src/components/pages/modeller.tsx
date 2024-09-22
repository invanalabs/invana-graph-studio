'use client'

import { useState } from 'react'
import { Header } from '@/components/structures/header'
import { LeftNav } from '@/components/structures/left-nav'
import { MainContent } from '@/components/structures/main'


export default function ModellerPage() {
  const [workspaces, setWorkspaces] = useState([])
  const [activeWorkspace, setActiveWorkspace] = useState('Personal')
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [pages, setPages] = useState(['Page 1', 'Page 2', 'Page 3'])
  const [theme, setTheme] = useState('dark')

  const initialWorkspaces = [
    { id: 1, name: "Personal", connectionString: "mongodb://localhost:27017/personal" },
    // { id: 2, name: "Team A", connectionString: "mongodb://localhost:27017/teamA" },
    // { id: 3, name: "Team B", connectionString: "mongodb://localhost:27017/teamB" },
    // { id: 4, name: "Client Project", connectionString: "mongodb://localhost:27017/client" },
  ]

  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const addPage = () => {
    const newPage = `Page ${pages.length + 1}`
    setPages([...pages, newPage])
    setCurrentPageIndex(pages.length)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background  text-base">
      <Header theme={theme} toggleTheme={toggleTheme} initialWorkspaces={initialWorkspaces} />
      <div className="flex flex-1 overflow-hidden">
        <LeftNav />
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