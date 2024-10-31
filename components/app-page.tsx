"use client"

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

const DynamicComponent = dynamic(() => import('@/components/DynamicComponent'), {
  loading: () => <Loader2 className="animate-spin" />,
  ssr: false
})

export default function ComponentGenerator() {
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [key, setKey] = useState(0)
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/generate-component',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const prompt = formData.get('prompt') as string
    const result = await complete(prompt)
    if (result) {
      setGeneratedCode(result)
      setKey(prevKey => prevKey + 1) // Force re-render of DynamicComponent
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Component Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate React Component</CardTitle>
          <CardDescription>Describe the component you want to create</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              name="prompt"
              placeholder="Describe the React component you want to generate..."
              className="w-full"
              rows={4}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Component'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {(completion || generatedCode) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Generated Component</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code">
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="code">
                <Textarea
                  value={completion || generatedCode}
                  readOnly
                  className="w-full h-96 font-mono text-sm"
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="border p-4 rounded-md">
                  <DynamicComponent key={key} code={completion || generatedCode} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigator.clipboard.writeText(completion || generatedCode)}>
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}