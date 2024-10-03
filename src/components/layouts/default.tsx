'use client'
import { Header } from '@/components/structures/header'
import { LeftNav } from '@/components/structures/left-nav'
import { MainBody } from '@/components/structures/main-body'
import { ReactNode } from 'react'
import { Main } from '../structures/main'


interface DefaultLayoutProps {
    children: ReactNode
    // header: ReactNode
    // Main: ReactNode
}
  

export default function DefaultLayout(props: DefaultLayoutProps) {

    return (
        <div className="flex h-screen bg-background text-foreground">
            <LeftNav />
            <Main>
               {props.children}
            </Main>
        </div>
    )
}