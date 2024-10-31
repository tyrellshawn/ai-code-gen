"use client"

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Page() {
  const [generatedCode, setGeneratedCode] = useState<string>('')
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
                  <p className="text-sm text-gray-500 mb-2">Preview not available. Implement component rendering here.</p>
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