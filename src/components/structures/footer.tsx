import { Button } from "@/components/ui/button"
import { History, Link, Terminal } from 'lucide-react'
// import { useStore } from '../store'

export default function Footer() {
//   const { toggleBottomPanel, toggleQueryConsole } = useStore()

  return (
    <div className="border-t border-b border-border flex justify-between items-center px-2 py-1 h-6 text-xs">
      <span>Zoom: 100%</span>
      <span>Position: 0, 0</span>
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm" className="h-5 px-1" onClick={() => alert('activity')}>
          <History size={12} className="mr-1" />
          Query History
        </Button>
        <Button variant="ghost" size="sm" className="h-5 px-1" onClick={() => alert('connectors')}>
          <Link size={12} className="mr-1" />
          Connectors
        </Button>
        <Button variant="ghost" size="sm" className="h-5 px-1" onClick={()=>alert("ok")}>
          <Terminal size={12} className="mr-1" />
          Query Console
        </Button>
      </div>
    </div>
  )
}