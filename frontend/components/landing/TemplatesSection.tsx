"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_RESUME_TEMPLATES } from "@/components/resume/templates";

const featuredTemplates = ALL_RESUME_TEMPLATES.slice(0, 6);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function TemplatesSection() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [creatingTemplateId, setCreatingTemplateId] = useState<string | null>(null);

  const useTemplate = async (templateId: string, templateName: string) => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    setCreatingTemplateId(templateId);

    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${templateName} Resume`,
          templateId,
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Failed to create resume");

      router.push(`/resume/${result.data.id}/edit`);
    } catch (error) {
      console.error("Error creating resume from template:", error);
      router.push("/dashboard");
    } finally {
      setCreatingTemplateId(null);
    }
  };

  return (
    <section id="templates" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
            <FileText className="h-4 w-4" />
            Professional Resume Templates
          </div>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Choose a real template and start fast
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Pick from ATS-friendly layouts built for developers, executives, consultants, product managers, and clean recruiter screening.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredTemplates.map((template) => {
            const isCreating = creatingTemplateId === template.id;

            return (
              <motion.div key={template.id} variants={cardVariants} className="group relative h-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/80 p-5 transition-colors duration-300 group-hover:border-emerald-500/40">
                  <div className="mb-5 rounded-xl bg-white p-4 shadow-xl shadow-slate-950/20">
                    <div className={template.headerClass}>
                      <div>
                        <div className={template.nameClass}>Your Name</div>
                        <div className={template.titleClass}>Professional Title</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className={`mb-2 text-sm font-bold ${template.headingClass}`}>SUMMARY</div>
                        <div className="space-y-1">
                          <div className="h-2 rounded bg-slate-200" />
                          <div className="h-2 w-4/5 rounded bg-slate-200" />
                        </div>
                      </div>
                      <div>
                        <div className={`mb-2 text-sm font-bold ${template.headingClass}`}>EXPERIENCE</div>
                        <div className="space-y-1">
                          <div className="h-2 w-11/12 rounded bg-slate-200" />
                          <div className="h-2 w-3/4 rounded bg-slate-200" />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className={`rounded-full px-2 py-1 text-xs ${template.skillClass}`}>Skill</span>
                        <span className={`rounded-full px-2 py-1 text-xs ${template.skillClass}`}>ATS</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-emerald-300">
                        {template.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {template.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-sm text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      ATS-friendly and PDF-ready
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      onClick={() => useTemplate(template.id, template.name)}
                      disabled={creatingTemplateId !== null}
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Use Template
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
