import React from "react";
import {
  FileAudio,
  Mic,
  Youtube,
  Brain,
  MessageSquare,
  Search,
  Languages,
  Users,
  Clock,
  BookOpen,
  Copy,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Transform Audio into
          <span className="text-blue-600"> Actionable Intelligence</span>
        </h1>
        <p className="text-xl text-slate-600  max-w-2xl mx-auto">
          Upload audio, record directly, or analyze YouTube videos. Get instant
          transcripts, insights, and more with our powerful AI platform.
        </p>
        <p className="text-lg max-w-2xl text-blue-600 mt-4 font-bold italic mx-auto mb-12">
          Powered by AssemblyAI
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Button className="gap-2">
            Try Now <ArrowRight size={20} />
          </Button>
          <Button variant="secondary">Watch Demo</Button>
        </div>

        {/* Input Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <FileAudio className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Audio File</h3>
            <p className="text-slate-600 text-sm">
              Upload MP3, WAV, or other audio formats
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <Mic className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Record Audio</h3>
            <p className="text-slate-600 text-sm">
              Record directly in your browser
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <Youtube className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">YouTube Video</h3>
            <p className="text-slate-600 text-sm">
              Analyze any YouTube video URL
            </p>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Powerful Features for Deep Audio Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain />}
              title="Smart Summaries"
              description="Get concise summaries and key takeaways from your audio content"
            />
            <FeatureCard
              icon={<MessageSquare />}
              title="Interactive Chat"
              description="Chat with your transcript to find specific information quickly"
            />
            <FeatureCard
              icon={<Search />}
              title="Advanced Search"
              description="Search through transcripts to find exactly what you need"
            />
            <FeatureCard
              icon={<Languages />}
              title="Translation"
              description="Translate transcripts into multiple languages instantly"
            />
            <FeatureCard
              icon={<Users />}
              title="Speaker Labels"
              description="Automatically identify and label different speakers"
            />
            <FeatureCard
              icon={<Clock />}
              title="Timeline View"
              description="Navigate content with precise timestamp markers"
            />
            <FeatureCard
              icon={<BookOpen />}
              title="Blog Generation"
              description="Automatically generate blog posts from your audio content"
            />
            <FeatureCard
              icon={<Copy />}
              title="Easy Export"
              description="Copy and export content in multiple formats"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
