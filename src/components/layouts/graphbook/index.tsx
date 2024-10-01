'use client'
import { Header } from '@/components/structures/header'
import { LeftNav } from '@/components/structures/left-nav'
import { MainBody } from '@/components/structures/main-body'
import { ReactNode } from 'react'
import { Main } from '../../structures/main'


interface GraphBookLayoutProps {
    children: ReactNode
}
  

export default function GraphBookLayout(props: GraphBookLayoutProps) {

    return (
        <div className="flex h-screen bg-background text-foreground">
            <LeftNav />
            <Main>
                <Header />
                <MainBody>{props.children}</MainBody>
            </Main>
        </div>
    )
}