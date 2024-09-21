'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ConnectPage() {
    const [connectionName, setConnectionName] = useState('')
    const [connectionString, setConnectionString] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setSubmitStatus('success')
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto ">
            <CardHeader>
                <CardTitle>Connect to Database</CardTitle>
                <CardDescription>Enter your database connection details below.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="connectionName">Connection Name</Label>
                        <Input
                            id="connectionName"
                            placeholder="e.g., My Production DB"
                            value={connectionName}
                            onChange={(e) => setConnectionName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="connectionString">Connection String</Label>
                        <Input
                            id="connectionString"
                            placeholder="mysql://username:password@host:port/database"
                            value={connectionString}
                            onChange={(e) => setConnectionString(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Connecting...' : 'Connect'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                {submitStatus === 'success' && (
                    <Alert variant="default" className="w-full">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Successfully connected to the database.</AlertDescription>
                    </Alert>
                )}
                {submitStatus === 'error' && (
                    <Alert variant="destructive" className="w-full">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Failed to connect to the database. Please try again.</AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
    )
}