import { Github, Star, GitBranch, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-100">
      <div className="flex items-center space-x-2">
        <Github className="h-5 w-5" />
        <span className="font-semibold">acme-org / project-repo</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gray-100">
          <Star className="h-4 w-4 mr-2" />
          Star
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gray-100">
          <GitBranch className="h-4 w-4 mr-2" />
          Fork
        </Button>
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-gray-300 hover:text-gray-100">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  )
}