import MockSteps from "@/components/landingPage/MockSteps";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { FileText, Zap, Star, Bot, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full container mx-auto lg:h-screen h-auto">
        <header className="w-full  py-4 mb-8">
          <nav className="flex justify-between items-center container mx-auto lg:px-0 px-4">
            <Logo />
            <div className="gap-4 flex itmes-center">
              <Link href="/cv-builder">
                <Button className="font-bold" size={"lg"}>
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </header>
        <div className="flex items-center lg:space-x-8">
          <div className="flex flex-col items-center space-y-4 justify-center h-full my-20 text-center lg:text-start">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Create Your Perfect CV in Minutes
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Our AI-powered CV maker helps you build a professional CV that
                stands out and matches job descriptions. Get started for free!
              </p>
            </div>
            <div className="w-full flex justify-center lg:justify-start space-x-4">
              <Link href="/cv-builder">
                <Button className="font-bold" size={"lg"}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <MockSteps />
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Features
          </h2>
          <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Zap className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Easy to Use</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Intuitive interface that guides you through the CV creation
                process step by step.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <FileText className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Professional Templates</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose from a variety of professionally designed templates to
                make your CV stand out.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <Star className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">ATS-Friendly</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our CVs are optimized for Applicant Tracking Systems to increase
                your chances of getting an interview.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <Bot className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">AI-Powered Customization</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our AI tailors your CV to match specific job descriptions,
                improving your chances of landing interviews.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full py-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Smart CV
              </p>
            </div>
            <nav className="flex space-x-4 text-sm">
              <Link
                href="/cv-builder"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                CV Builder
              </Link>
              <Link
                href="#features"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Features
              </Link>
            </nav>
            <div className="flex space-x-4 text-sm items-center">
              <Link
                href="https://github.com/AtheerAPeter"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
              >
                <Github className="h-4 w-4 mr-1" />
                Github
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/atheer-a-peter-6723b9191/"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
