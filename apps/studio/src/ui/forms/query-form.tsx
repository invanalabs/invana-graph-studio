import {
  Card, CardHeader, CardTitle, Select, SelectTrigger,
  SelectValue, SelectContent, SelectItem, Button, CardContent
} from "@invana/ui"
import { Play } from "lucide-react"
import Editor from '@monaco-editor/react'
import { useState } from "react"


type QueryLanguage = 'gremlin' | 'cypher'


export const QueryForm = (props) => {

  const [language, setLanguage] = useState<QueryLanguage>('gremlin')
  const [query, setQuery] = useState(`-- Write your ${language} query here
SELECT * FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;`)

  const handleExecuteQuery = () => {
    console.log('Executing query:', query)
    // Here you would typically send the query to your backend
  }

  const handleLanguageChange = (newLanguage: QueryLanguage) => {
    setLanguage(newLanguage)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Query Console</CardTitle>
          <div className="flex items-center gap-4">
            <Select
              value={language}
              onValueChange={(value) => handleLanguageChange(value as QueryLanguage)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExecuteQuery} className="gap-2">
              <Play className="w-4 h-4" />
              Execute Query
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-background">
            <Editor
              height="400px"
              defaultLanguage="sql"
              language="sql"
              theme="vs-dark"
              value={query}
              onChange={(value) => setQuery(value || '')}
              options={{
                minimap: { enabled: false },
                lineNumbers: 'on',
                lineHeight: 24,
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                fontSize: 14,
                tabSize: 2,
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>
          <div className="mt-4 p-4 rounded-lg border bg-muted/40">
            <h3 className="font-semibold mb-2">Results</h3>
            <p className="text-muted-foreground">Execute a query to see results here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
