'use client'
import { ReactNode } from 'react'


interface MainProps {
  children: ReactNode
}


export function Main(props: MainProps) {
 
  return (
    // flex-1 flex flex-col  flex-1 h-screen  overflow-hidden
    <div className="flex flex-col flex-1  h-screen overflow-hidden">
      {props.children}
    </div>
  )
  
}