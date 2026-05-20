"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const defaultStats: StatItem[] = [
  { value: 0, label: "Resumes Built" },
  { value: 0, label: "Average ATS Score", suffix: "%" },
  { value: 0, label: "Active Users" },
];

const Counter = ({ value, suffix }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 900;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>(defaultStats);

  useEffect(() => {
    let active = true;

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Failed to fetch stats");
        if (!active) return;

        setStats([
          { value: result.data?.resumesBuilt ?? 0, label: "Resumes Built" },
          { value: result.data?.averageATSScore ?? 0, label: "Average ATS Score", suffix: "%" },
          { value: result.data?.activeUsers ?? 0, label: "Active Users" },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();

    return () => {
      active = false;
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <motion.div
      className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-8 md:p-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            variants={itemVariants}
          >
            <motion.div
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
            </motion.div>
            <p className="text-slate-300 text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
