import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import ClientLayout from "./client-layout"
import { Info, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <ClientLayout>
      <main className="min-h-screen antialiased relative overflow-hidden">
        {/* AI-themed gradient background */}
        <div className="h-full w-full absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 bg-grid-white/[0.02]"></div>

        <div className="relative z-10">
          <Navbar />
          <Hero 
          seeHowItWorksLink={"/how-it-works#process-demo"} 
          seeExamplesLink={"/examples"} 
          seeHowItWorksText={"See How It Works"} 
          seeExamplesText={"See Examples"} 
          seeHowItWorksIcon={<Info className="mr-2 h-5 w-5" />} 
          seeExamplesIcon={<Sparkles className="mr-2 h-5 w-5" />} 
          />
        </div>
      </main>
    </ClientLayout>
  )
}
