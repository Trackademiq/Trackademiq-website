import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Brain, Users, GraduationCap, Shield, Clock, TrendingUp } from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stats = [
  { value: "8hrs→15min", label: "Report Card Generation" },
  { value: "2-3hrs", label: "Saved Per Teacher Weekly" },
  { value: "Real-Time", label: "At-Risk Detection" },
  { value: "4 Roles", label: "Personalized Dashboards" },
  { value: "Multi-School", label: "Platform Management" },
  { value: "99.9%", label: "Uptime Guarantee" }
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    description: "Auto-detects at-risk students through attendance pattern analysis, saves 2-3 hours per teacher weekly"
  },
  {
    icon: Users,
    title: "Complete Student Management",
    description: "Admissions, enrollment, profiles, academic records all in one place"
  },
  {
    icon: Clock,
    title: "Automated Attendance",
    description: "Biometric integration with real-time parent notifications"
  },
  {
    icon: TrendingUp,
    title: "Grade & Exam Management",
    description: "Online assessments, report cards, progress tracking"
  },
  {
    icon: Shield,
    title: "Secure Fee Collection",
    description: "Online payments, automated reminders, payment gateway integration"
  },
  {
    icon: GraduationCap,
    title: "Parent & Teacher Portals",
    description: "Real-time communication, homework tracking, meeting scheduling"
  }
];

export default function WhatIsTrackademiqPage() {
  useEffect(() => {
    document.title = "What is Trackademiq? | AI-Powered School ERP Platform";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Trackademiq is a next-generation AI-powered School ERP for schools worldwide. AI attendance analytics, smart report cards (8hrs to 15min), role-specific insights, real-time notifications, and multi-school management.");
    }

    const pageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "What is Trackademiq?",
      "description": "Complete overview of Trackademiq AI-powered School ERP platform",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Trackademiq",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web, iOS, Android",
        "description": "Trackademiq is a next-generation AI-powered School ERP platform for schools worldwide. It features AI-driven attendance analytics that auto-detect at-risk students (saves 2-3 hrs/week per teacher), smart report card generation (8 hours to 15 minutes per class), role-specific AI insights engine, real-time notifications, multi-school management, and automated fee tracking."
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Trackademiq?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trackademiq is a next-generation AI-powered School ERP platform built for schools worldwide. It features AI attendance analytics that auto-detect at-risk students, smart report card generation (8 hrs to 15 min), role-specific AI insights, real-time notifications, multi-school management, and automated fee tracking."
          }
        },
        {
          "@type": "Question",
          "name": "How does Trackademiq's AI work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trackademiq's AI analyzes attendance patterns, grade trends, and engagement metrics to identify at-risk students early. The system flags potential issues and provides role-specific recommendations — principals see school-wide trends while teachers get class-level insights. Each teacher saves 2-3 hours per week through automated analytics."
          }
        },
        {
          "@type": "Question",
          "name": "Who uses Trackademiq?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trackademiq is designed for school administrators, principals, teachers, parents, and students. It scales from small schools with 100 students to large school networks with multiple campuses."
          }
        }
      ]
    };

    const existingPage = document.querySelector('script[data-schema="what-is-page"]');
    const existingFaq = document.querySelector('script[data-schema="what-is-faq"]');
    if (existingPage) existingPage.remove();
    if (existingFaq) existingFaq.remove();

    const pageScript = document.createElement('script');
    pageScript.type = 'application/ld+json';
    pageScript.setAttribute('data-schema', 'what-is-page');
    pageScript.textContent = JSON.stringify(pageSchema);
    document.head.appendChild(pageScript);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.setAttribute('data-schema', 'what-is-faq');
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      const pageEl = document.querySelector('script[data-schema="what-is-page"]');
      const faqEl = document.querySelector('script[data-schema="what-is-faq"]');
      if (pageEl) pageEl.remove();
      if (faqEl) faqEl.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
              <img src={trackademiqLogo} alt="Trackademiq Logo" className="w-10 h-10 rounded-lg object-contain" />
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Trackademiq
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-get-demo">
                  Get Demo
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="py-16 sm:py-20 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                Complete Overview
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                What is{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Trackademiq?
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 sm:p-8 text-white mb-12"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Answer</h2>
              <p className="text-lg leading-relaxed">
                <strong>Trackademiq is a next-generation AI-powered School ERP platform</strong> built for schools worldwide. It features AI-driven attendance analytics that auto-detect at-risk students (<strong>saves 2-3 hrs/week per teacher</strong>), smart report card generation (<strong>8 hours to 15 minutes</strong>), role-specific AI insights, real-time notifications, and <strong>multi-school management</strong>.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="prose prose-slate dark:prose-invert max-w-none mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground">Detailed Explanation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Trackademiq combines traditional Enterprise Resource Planning (ERP) functionality with advanced artificial intelligence to provide comprehensive school management. Unlike conventional school software that merely stores data, Trackademiq's AI actively analyzes patterns, predicts outcomes, and recommends interventions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The platform serves educational institutions of all sizes — from small schools with 100 students to large school networks with multiple campuses. Trackademiq's AI automates attendance analysis, generates smart report cards, and provides actionable insights tailored to each user's role.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">What Makes Trackademiq Different?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Traditional school ERP systems focus on data storage and basic reporting. Trackademiq goes further with AI-powered predictive analytics that identify at-risk students 2-3 months before they fall behind, automated insight generation that surfaces patterns human analysis might miss, and natural language query interfaces that let administrators ask questions in plain English.
              </p>
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <Card className="p-5 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50">
                        <feature.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-12"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Who Uses Trackademiq?</h2>
              <ul className="space-y-3">
                {[
                  "School Administrators & Principals – Centralized control and real-time insights",
                  "Teachers – Automated attendance, gradebooks, and student analytics",
                  "Parents – Anytime access to attendance, grades, fees, and direct messaging",
                  "Students – Assignment tracking, exam schedules, and performance dashboards",
                  "School Networks – Multi-campus management with consolidated reporting"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-schedule-demo">
                  Schedule a Demo
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-3">
                See Trackademiq in action with a personalized walkthrough
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={trackademiqLogo} alt="Trackademiq" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold">Trackademiq</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-white/40">© {new Date().getFullYear()} Trackademiq Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
