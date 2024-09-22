'use client'
import { Header } from '@/components/structures/header'
import { LeftNav } from '@/components/structures/left-nav'
import { MainContent } from '@/components/structures/main'
import { ReactNode } from 'react'


interface WorkspaceLayoutProps {
    children: ReactNode
}
  

export default function WorkspaceLayout(props: WorkspaceLayoutProps) {

    return (
        <div className="flex flex-col min-h-screen bg-background  text-base">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <LeftNav />
                <MainContent>{props.children}</MainContent>
            </div>
        </div>
    )
}