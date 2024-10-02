'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, PenTool } from "lucide-react"
import Link from "next/link"

export function GetStartedComponent() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to AI-Powered CV Creator</h1>
      <p className="text-xl text-center mb-8">
        Create your CV and cover letter with the power of AI.
      </p>

      <div className="space-y-4">
        <Link href="/cv-builder" passHref className="w-full">
          <Button variant="outline" className="w-full justify-between text-lg py-8 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-200">
            <div className="flex items-center">
              <FileText className="h-6 w-6 mr-4" />
              CV Builder
            </div>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/cover-letter-creator" passHref className="w-full">
          <Button variant="outline" className="w-full justify-between text-lg py-8 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-200">
            <div className="flex items-center">
              <PenTool className="h-6 w-6 mr-4" />
              AI Cover Letter Creator
            </div>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Why Choose Our AI-Powered Tools?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Tailored content based on your industry and experience</li>
            <li>Professional templates designed to impress employers</li>
            <li>AI-driven suggestions to highlight your strengths</li>
            <li>Easy-to-use interface for quick creation and editing</li>
            <li>Instant generation of cover letters matched to job descriptions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}