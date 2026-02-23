import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Check, X, ArrowRight } from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const comparisons = [
  {
    feature: "AI-Powered Analytics",
    trackademiq: "Auto-detects at-risk students, saves 2-3 hrs/week per teacher",
    traditional: "Manual reporting only, no predictive capabilities",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Implementation Time",
    trackademiq: "2-4 weeks typical setup",
    traditional: "3-6 months average",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Administrative Time Savings",
    trackademiq: "AI automates every repetitive task — reports, attendance, fees, communication",
    traditional: "20-30% at best",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Student Outcome Improvement",
    trackademiq: "Role-specific insights: principal sees school trends, teachers see class-level data",
    traditional: "No direct impact on outcomes",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Natural Language Queries",
    trackademiq: "Ask questions in plain English, get instant answers",
    traditional: "Complex report builders required",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Automated Insights",
    trackademiq: "AI surfaces patterns and recommendations automatically",
    traditional: "Manual analysis required",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Parent Portal",
    trackademiq: "Real-time updates, instant notifications",
    traditional: "Basic portal with delayed updates",
    trackademiqHas: true,
    traditionalHas: true
  },
  {
    feature: "Mobile Apps",
    trackademiq: "iOS & Android mobile apps",
    traditional: "Limited mobile functionality",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Multi-Campus Support",
    trackademiq: "Centralized control with campus-specific views",
    traditional: "Separate instances per campus",
    trackademiqHas: true,
    traditionalHas: false
  },
  {
    feature: "Support",
    trackademiq: "Email, phone, and chat support with onboarding help",
    traditional: "Business hours only, ticket-based",
    trackademiqHas: true,
    traditionalHas: false
  }
];

export default function TrackademiqVsTraditionalErpPage() {
  useEffect(() => {
    document.title = "Trackademiq vs Traditional ERP | Complete Comparison";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Compare Trackademiq AI-powered Education ERP vs traditional systems. AI automates every operation, catches problems early, and delivers role-specific insights with 2-4 week implementation.");
    }

    const comparisonSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Trackademiq vs Traditional School ERP Comparison",
      "description": "Detailed comparison between Trackademiq AI-powered School ERP and traditional school management systems",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": comparisons.map((comp, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": comp.feature,
          "description": `Trackademiq: ${comp.trackademiq}. Traditional ERP: ${comp.traditional}`
        }))
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between Trackademiq and traditional school ERP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The main difference is AI capability. Trackademiq uses AI to auto-detect at-risk students and provide role-specific insights for principals and teachers. Traditional ERPs only store and report data without predictive analytics. Trackademiq also implements in 2-4 weeks vs 3-6 months for traditional systems."
          }
        },
        {
          "@type": "Question",
          "name": "Why should schools switch from traditional ERP to Trackademiq?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Schools switch to Trackademiq because AI automates every operation and catches problems early — at-risk students are detected before they fall behind, attendance anomalies are flagged instantly, and fee defaults are predicted. Plus faster 2-4 week implementation and role-specific insights for every stakeholder."
          }
        }
      ]
    };

    const existingComp = document.querySelector('script[data-schema="comparison-page"]');
    const existingFaq = document.querySelector('script[data-schema="comparison-faq"]');
    if (existingComp) existingComp.remove();
    if (existingFaq) existingFaq.remove();

    const compScript = document.createElement('script');
    compScript.type = 'application/ld+json';
    compScript.setAttribute('data-schema', 'comparison-page');
    compScript.textContent = JSON.stringify(comparisonSchema);
    document.head.appendChild(compScript);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.setAttribute('data-schema', 'comparison-faq');
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      const compEl = document.querySelector('script[data-schema="comparison-page"]');
      const faqEl = document.querySelector('script[data-schema="comparison-faq"]');
      if (compEl) compEl.remove();
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
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-get-demo">
                  Get Demo
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main id="main" aria-label="Main content">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                Comparison Guide
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Trackademiq vs{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Traditional ERP
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See why next-generation AI-powered school management outperforms traditional systems
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-6 sm:p-8 text-white mb-12"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Summary</h2>
              <p className="text-lg leading-relaxed">
                Traditional school ERPs store data. <strong>Trackademiq thinks with it.</strong> AI automates every operation, catches problems early through predictive analytics, and delivers role-specific insights — all with 2-4 week implementation (vs 3-6 months). Measurable outcomes, not just reports.
              </p>
            </motion.div>

            <div className="mb-12 overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-left p-4 font-semibold text-indigo-600 dark:text-indigo-400">Trackademiq</th>
                    <th className="text-left p-4 font-semibold text-slate-500">Traditional ERP</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comp, idx) => (
                    <motion.tr
                      key={comp.feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="border-t border-slate-200 dark:border-slate-700"
                    >
                      <td className="p-4 font-medium text-foreground">{comp.feature}</td>
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{comp.trackademiq}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          {comp.traditionalHas ? (
                            <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-sm text-muted-foreground">{comp.traditional}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid sm:grid-cols-2 gap-6 mb-12"
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Why Schools Switch</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Proactive vs Reactive:</strong> AI alerts before problems occur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Speed:</strong> 2-4 weeks vs months of implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Outcomes:</strong> Role-specific insights for principals & teachers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Efficiency:</strong> 2-3 hrs/week saved per teacher</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Real Results</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>AI attendance analytics with at-risk detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Every operation automated by AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Role-specific insights for every stakeholder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Cloud-hosted with high availability</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <div className="text-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-schedule-demo">
                  See the Difference - Get a Demo
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-3">
                Compare Trackademiq to your current system in a live demo
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
              <Link href="/what-is-trackademiq" className="hover:text-white transition-colors">What is Trackademiq?</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-white/40">© {new Date().getFullYear()} Trackademiq Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
