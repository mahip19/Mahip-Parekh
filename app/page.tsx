"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Code2,
} from "lucide-react";

const profile = {
  name: "Mahip Parekh",
  initials: "MP",
  title: "Software Engineer · MSCS @ Northeastern University",
  location: "Boston, MA",
  email: "parekh.mahi@northeastern.edu",
  github: "https://github.com/mahip19",
  linkedin: "https://linkedin.com/in/mahip-parekh",
  intro:
    "I build reliable software across full-stack products, distributed systems, cloud infrastructure, and machine learning — with a strong bias toward debugging, performance, and practical engineering.",
};

const skills = [
  "Python",
  "C++",
  "C",
  "Java",
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Next.js",
  "Node.js",
  "Drupal CMS",
  "SQL",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Jenkins",
  "Git/GitLab",
  "JIRA",
  "Linux/Unix",
  "Bash",
  "Distributed Systems",
  "Machine Learning",
  "Performance Optimization",
  "Unit Testing",
];

const experiences = [
  {
    role: "Software Engineer",
    company: "IDX India Pvt Ltd",
    period: "Feb 2023 — Jan 2024",
    summary:
      "Engineered B2B investor-relations websites for publicly listed companies, working across React, Vue, Next.js, Drupal CMS, Varnish Cache, production upgrades, go-live checks, incident handling, and release reliability.",
  },
  {
    role: "Student Intern",
    company: "Allsoft Solutions Pvt Ltd",
    period: "Jun 2022 — Aug 2022",
    summary:
      "Applied supervised learning, exploratory data analysis, and feature engineering using Python, Scikit-learn, Pandas, and NumPy on large customer churn datasets.",
  },
  {
    role: "MSCS Student",
    company: "Northeastern University, Khoury College of Computer Sciences",
    period: "Jan 2025 — Dec 2026",
    summary:
      "Studying computer science with coursework across cloud computing, machine learning, scalable distributed systems, programming design paradigms, databases, algorithms, and web development.",
  },
];

const projects = [
  {
    title: "Distributed File Storage System",
    description:
      "Distributed storage system using DHT-style peer networking, file chunking, SHA-256 verification, primary-backup replication, and consensus-inspired metadata consistency.",
    tags: ["C++", "Python", "Linux", "Distributed Systems"],
  },
  {
    title: "Lightweight Intrusion Detection for IoT Networks",
    description:
      "PyTorch-based multi-class intrusion detection pipeline for IoT traffic, exploring feature reduction, imbalance handling, and lightweight model tradeoffs.",
    tags: ["Python", "PyTorch", "Scikit-learn", "ML"],
  },
  {
    title: "Kambaz Learning Management System",
    description:
      "Full-stack Canvas-style LMS with course management, grading workflows, REST APIs, WebSockets, and a responsive React frontend.",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
  },
  {
    title: "Calendar Event Manager",
    description:
      "Java MVC calendar application with Swing UI, recurring events, conflict detection, design patterns, and a rigorous JUnit testing strategy.",
    tags: ["Java", "MVC", "Swing", "JUnit"],
  },
];

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.76 2.72 1.25 3.38.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v12H3v-12Zm6.25 0h3.84v1.64h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.21v6.25h-4v-5.54c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93v5.63h-4V9.5Z" />
    </svg>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-zinc-600">{description}</p>}
    </div>
  );
}

export default function PortfolioLandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-zinc-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          MP<span className="text-zinc-400">.</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
          <a href="#about" className="transition hover:text-zinc-950">About</a>
          <a href="#skills" className="transition hover:text-zinc-950">Skills</a>
          <a href="#experience" className="transition hover:text-zinc-950">Experience</a>
          <a href="#projects" className="transition hover:text-zinc-950">Projects</a>
          <a href="#contact" className="transition hover:text-zinc-950">Contact</a>
        </div>
      </nav>

      <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-8 md:px-8 md:pt-16">
        <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="mb-8 h-36 w-36 overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-200 shadow-xl shadow-zinc-300/50">
  <Image
    src="/images/profile.jpg"
    alt="Mahip Parekh"
    width={144}
    height={144}
    className="h-full w-full object-cover"
    priority
  />
</div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/55 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur">
            <MapPin size={15} /> {profile.location}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-7xl">
            Building software that stays calm under pressure.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              View projects
            </a>
            <a href="#contact" className="rounded-full border border-zinc-300 bg-white/60 px-5 py-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-500">
              Contact me
            </a>
          </div>
        </motion.div>
      </section>

      <section id="about" className="border-y border-zinc-200 bg-white/55">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <SectionHeader
            eyebrow="About"
            title="A product-support engineer’s debugging mindset, now applied to systems and cloud."
            description="I like working close to real problems: broken flows, confusing failures, slow systems, and unclear user behavior. My experience building and supporting investor-relations platforms shaped how I approach engineering — observe carefully, isolate the issue, communicate clearly, and fix with discipline."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Systems", "Distributed storage, replication, coordination, Linux tooling, and performance-aware design."],
              ["Web", "Responsive full-stack products using React, Vue, Next.js, Node.js, Drupal CMS, and REST APIs."],
              ["ML + Data", "Feature engineering, supervised learning, PyTorch models, imbalance handling, and lightweight model evaluation."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[1.5rem] border border-zinc-200 bg-[#f7f5f0] p-6">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <SectionHeader eyebrow="Skills" title="Tools I use to turn ideas into working systems." />
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full border border-zinc-300 bg-white/55 px-4 py-2 text-sm text-zinc-700 shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="experience" className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">Experience</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Engineering experience shaped by ownership and debugging.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((item) => (
              <div key={`${item.role}-${item.company}`} className="rounded-[1.5rem] border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="mt-1 text-zinc-400">{item.company}</p>
                  </div>
                  <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">{item.period}</span>
                </div>
                <p className="mt-5 leading-7 text-zinc-300">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          description="A compact snapshot of projects that show backend thinking, cloud fundamentals, and clean software design."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group rounded-[1.5rem] border border-zinc-200 bg-white/65 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-300/30">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                <Code2 size={20} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                <ArrowUpRight className="mt-1 text-zinc-400 transition group-hover:text-zinc-950" size={19} />
              </div>
              <p className="mt-4 leading-7 text-zinc-600">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-zinc-200 bg-[#f7f5f0] px-3 py-1 text-xs text-zinc-600">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="rounded-[2rem] bg-zinc-950 p-8 text-white md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-500">Contact</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Let’s build something reliable, useful, and fast.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
                I’m open to software engineering internships, full-stack roles, machine learning projects, cloud work, and systems-focused opportunities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950">
                <Mail size={16} /> Email
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-200">
                <GitHubIcon size={16} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-200">
                <LinkedInIcon size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
