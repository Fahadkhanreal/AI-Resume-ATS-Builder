import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">AI Resume Builder</div>
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Create Beautiful, ATS-Friendly Resumes
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Build professional resumes with AI assistance. Get real-time ATS scoring,
            beautiful templates, and job match analysis.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg">
                Start Building
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div id="features" className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
            <p className="text-slate-300">Get AI suggestions to improve your resume content and make it stand out.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">ATS Optimized</h3>
            <p className="text-slate-300">Real-time ATS scoring ensures your resume passes applicant tracking systems.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">Beautiful Templates</h3>
            <p className="text-slate-300">Choose from professional templates and customize to match your style.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
