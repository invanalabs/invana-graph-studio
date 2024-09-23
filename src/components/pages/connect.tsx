'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import BlankLayout from '../layouts/blank'
import { useWorkspaceStore } from '@/store/workspaceStore'
import { Workspace } from '@/models/workspace'
import { useNavigate } from 'react-router-dom';


export default function ConnectPage() {


    const navigate = useNavigate();

    const { createWorkspace, setActiveWorkspace } = useWorkspaceStore();
    const [connectionName, setConnectionName] = useState('')
    const [connectionString, setConnectionString] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')
        const workspacePromise: Promise<Workspace> = createWorkspace({name: connectionName, connectionString: connectionString})
        console.log("====workspacePromise", workspacePromise)
        workspacePromise.then((workspace: Workspace)=>{
            setSubmitStatus('success')
            console.log("====workspace", workspace)
            setActiveWorkspace(workspace)
            navigate("/explorer?workspace" + workspace.name )
        }).catch((error)=>{
            console.log("error", error)
            setSubmitStatus('error')

        }).finally(()=>{
            setIsSubmitting(false)

        })

    }

    return (
        <BlankLayout>
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md mx-auto ">
                    <CardHeader>
                        <CardTitle>Connect to Invana </CardTitle>
                        <CardDescription>Enter your database connection details below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="connectionName">Workspace Name</Label>
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
                                    placeholder="e.g., http://localhost:8300"
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
            </div>
        </BlankLayout>
    )
}