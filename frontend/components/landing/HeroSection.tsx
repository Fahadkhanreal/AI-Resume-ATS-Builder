"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Zap, Target } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)",
    transition: {
      duration: 0.3,
    },
  },
};

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Get AI suggestions to improve your resume content and make it stand out.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Target,
    title: "ATS Optimized",
    description: "Real-time ATS scoring ensures your resume passes applicant tracking systems.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Beautiful Templates",
    description: "Choose from professional templates and customize to match your style.",
    color: "from-purple-500 to-pink-500",
  },
];

export function HeroSection() {
  const { isSignedIn, isLoaded } = useUser();
  const isAuthenticated = isLoaded && isSignedIn;

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl md:h-72 md:w-72" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl md:h-72 md:w-72" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 border-b border-slate-700/50 bg-slate-900/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center">
            <motion.div
              className="text-lg md:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI Resume Builder
            </motion.div>
            <div className="flex gap-2 md:gap-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="text-xs md:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-3 md:px-4">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="outline" className="text-xs md:text-sm border-slate-600 hover:border-emerald-500 hover:text-emerald-400 px-3 md:px-4">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="text-xs md:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-3 md:px-4">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <motion.div
            className="text-center space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Create Beautiful,{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ATS-Friendly
                </span>{" "}
                Resumes
              </motion.h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-2"
            >
              Build professional resumes with AI assistance. Get real-time ATS scoring, beautiful templates, and job match analysis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-2">
              <Link href={isAuthenticated ? "/dashboard" : "/sign-up"} className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full text-base md:text-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/30"
                  >
                    {isAuthenticated ? "Go to Dashboard" : "Start Building"}
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={scrollToHowItWorks}
                  className="w-full text-base md:text-lg border-slate-600 hover:border-emerald-500 hover:bg-slate-800/50"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            id="features"
            className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative"
                >
                  {/* Card Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl blur transition-opacity duration-300`} />

                  {/* Card Content */}
                  <div className="relative bg-slate-800/80 p-6 md:p-8 rounded-xl border border-slate-700/50 group-hover:border-emerald-500/30 transition-colors duration-300 h-full">
                    {/* Icon */}
                    <motion.div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2 md:p-2.5 mb-4`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-full h-full text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-emerald-400 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
