'use client'
import { Header } from '../structures/header'
import { ReactNode } from 'react'
import { Main } from '../structures/main'
import { LeftNav } from '../structures/left-nav'
import { MainBody } from '../structures/main-body'


interface BlankLayoutProps {
    children: ReactNode
}

export default function BlankLayout({children}: BlankLayoutProps) {

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <LeftNav />
            <Main>
                <Header />
                <MainBody>{children}</MainBody>
            </Main>
        </div>
    )
}