"use client";

import { motion, type Variants } from "framer-motion";
import { FileText, Sparkles, BarChart3, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Create Resume",
    description: "Fill in your information with our intuitive form",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "AI Improve",
    description: "Get AI suggestions to enhance your content",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: BarChart3,
    title: "Check ATS Score",
    description: "Real-time ATS compatibility scoring",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Download,
    title: "Download PDF",
    description: "Export your resume in professional format",
    color: "from-orange-500 to-red-500",
  },
];

export function HowItWorks() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div id="how-it-works" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-40 w-40 rounded-full bg-emerald-500/5 blur-2xl md:h-72 md:w-72" />
        <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl md:h-72 md:w-72" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          How It Works
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Build your perfect resume in just 4 simple steps
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div key={index} variants={stepVariants} className="relative">
              {/* Step Card */}
              <div className="relative group">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-xl blur transition-opacity duration-300`}
                />

                {/* Card */}
                <div className="relative bg-slate-800/80 p-6 md:p-8 rounded-xl border border-slate-700/50 group-hover:border-emerald-500/30 transition-colors duration-300 h-full flex flex-col">
                  {/* Step Number */}
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 font-bold text-white text-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${step.color} p-3 mb-4`}
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-full h-full text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-slate-400 group-hover:text-slate-300 transition-colors flex-grow">
                    {step.description}
                  </p>

                  {/* Bottom Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <ArrowRight className="w-6 h-6 text-emerald-500" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
        </div>
      </div>
    </div>
  );
}
