'use client'
import { Header } from '@/components/structures/header'
import { LeftNav } from '@/components/structures/left-nav'
import { MainBody } from '@/components/structures/main-body'
import { ReactNode } from 'react'


interface WorkspaceLayoutProps {
    children: ReactNode
}
  

export default function WorkspaceLayout(props: WorkspaceLayoutProps) {

    return (
        <div className="flex h-screen bg-background text-foreground">
            <LeftNav />
            <div className="flex-1 flex flex-col  flex-1 h-screen">
                <Header />
                <MainBody>{props.children}</MainBody>
            </div>
        </div>
    )
}