"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Share2, Heart, Mail } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Templates", href: "/#templates" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resume Tools",
    links: [
      { label: "AI Resume Builder", href: "/dashboard" },
      { label: "ATS Score Checker", href: "/dashboard" },
      { label: "PDF Export", href: "/dashboard" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Get Started", href: "/sign-up" },
      { label: "Sign In", href: "/sign-in" },
      { label: "Contact", href: "mailto:support@airesumebuilder.local" },
    ],
  },
];

const socialLinks = [
  { icon: Code, href: "/dashboard", label: "Dashboard" },
  { icon: Share2, href: "/#templates", label: "Templates" },
  { icon: Heart, href: "/sign-up", label: "Get Started" },
  { icon: Mail, href: "mailto:support@airesumebuilder.local", label: "Email" },
];

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              AI Resume Builder
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Build beautiful, ATS-friendly resumes with AI assistance.
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 my-8" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <motion.p variants={itemVariants} className="text-slate-400 text-sm">
            © 2026 AI Resume Builder. All rights reserved.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
