'use client'
import { Header } from '../structures/header'
import { ReactNode } from 'react'

interface BlankLayoutProps {
    children: ReactNode
}


export default function BlankLayout({children}: BlankLayoutProps) {

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    )
}