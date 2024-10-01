'use client'
import { ReactNode } from 'react'


interface MainProps {
  children: ReactNode
}


export function Main(props: MainProps) {
 
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {props.children}
    </div>
  )
  
}