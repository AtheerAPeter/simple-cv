import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Discover Our AI-Powered CV Services
        </h1>
        <div className="gap-8">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">CV Builder</CardTitle>
              <CardDescription>
                Create a professional CV in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="CV Builder Illustration"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-gray-600">
                Our AI-powered CV builder helps you create a standout resume
                tailored to your industry and experience level. Get expert
                suggestions and formatting in real-time.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started with CV Builder</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
