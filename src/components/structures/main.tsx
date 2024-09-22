'use client'
import { ReactNode } from 'react'


interface MainContentProps {
  children: ReactNode
}


export function MainContent(props: MainContentProps) {
 
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {props.children}
    </div>
  )
  
}