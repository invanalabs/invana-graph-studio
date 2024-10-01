'use client'
import { ReactNode } from 'react'


interface MainBodyProps {
  children: ReactNode
}


export function MainBody(props: MainBodyProps) {
 
  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {props.children}
    </div>
  )
  
}