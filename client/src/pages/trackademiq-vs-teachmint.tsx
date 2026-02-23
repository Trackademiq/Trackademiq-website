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
    feature: "AI Analytics",
    trackademiq: "Deep AI-powered insights with at-risk student detection, trend prediction, and natural language queries",
    competitor: "Basic analytics dashboards; limited AI-driven insight generation",
    trackademiqHas: true,
    competitorHas: false
  },
  {
    feature: "Attendance Automation",
    trackademiq: "AI attendance analytics with pattern detection, at-risk alerts, and automated follow-ups saving 2-3 hrs/week",
    competitor: "Digital attendance marking with basic reports and notifications",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Report Card Generation",
    trackademiq: "AI-automated report generation with insights, grade analysis, and performance tracking",
    competitor: "Template-based report cards with manual customization",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Fee Management",
    trackademiq: "Comprehensive fee management with AI-driven payment predictions and automated reminders",
    competitor: "Online fee collection with payment gateway integration",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Multi-School Support",
    trackademiq: "Centralized multi-campus dashboard with cross-school analytics and unified reporting",
    competitor: "Multi-branch support available with separate management views",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Customization",
    trackademiq: "Highly customizable workflows, role-specific dashboards, and configurable modules for each school",
    competitor: "Standard templates with limited customization options",
    trackademiqHas: true,
    competitorHas: false
  },
  {
    feature: "Data Privacy",
    trackademiq: "GDPR & local compliance, region-specific data hosting, end-to-end encryption",
    competitor: "Basic data protection with standard security measures",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Parent Communication",
    trackademiq: "AI-generated progress summaries, real-time notifications, and intelligent communication scheduling",
    competitor: "In-app messaging and notifications with parent app",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Implementation",
    trackademiq: "2-4 weeks with guided onboarding, data migration support, and dedicated success manager",
    competitor: "Quick setup for basic features; advanced configuration takes longer",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Offline Support",
    trackademiq: "Progressive web app with offline data sync and automatic reconciliation when back online",
    competitor: "Limited offline functionality; primarily cloud-dependent",
    trackademiqHas: true,
    competitorHas: false
  }
];

export default function TrackademiqVsTeachmintPage() {
  useEffect(() => {
    document.title = "Trackademiq vs Teachmint | AI-Powered School ERP Comparison";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Compare Trackademiq vs Teachmint: AI attendance analytics, smart report cards, predictive insights, and deep customization. See why Trackademiq is the best Teachmint alternative for AI-driven school management.");
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute("content", "Trackademiq vs Teachmint | AI-Powered School ERP Comparison");
    if (ogDesc) ogDesc.setAttribute("content", "Compare Trackademiq vs Teachmint for school ERP. AI analytics, attendance automation, report cards, and more. Find the best school management platform.");

    const comparisonSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Trackademiq vs Teachmint Comparison",
      "description": "Detailed comparison between Trackademiq and Teachmint AI-powered school ERP platforms",
      "keywords": "Trackademiq vs Teachmint, Teachmint alternative, school ERP comparison, AI attendance analytics",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": comparisons.map((comp, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": comp.feature,
          "description": `Trackademiq: ${comp.trackademiq}. Teachmint: ${comp.competitor}`
        }))
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between Trackademiq and Teachmint?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both are modern school ERP platforms, but Trackademiq is an AI-powered Education ERP that automates every operation and catches problems early — from at-risk student detection to predictive analytics across attendance, fees, and academics. Teachmint offers basic digital school management. Trackademiq provides deeper AI automation and role-specific insights."
          }
        },
        {
          "@type": "Question",
          "name": "Is Trackademiq a good Teachmint alternative?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Trackademiq is an excellent Teachmint alternative for schools that need AI-powered automation across all operations, deeper customization, role-specific dashboards, and early problem detection. While Teachmint covers basic school management, Trackademiq automates everything and catches issues before they escalate."
          }
        },
        {
          "@type": "Question",
          "name": "Which school ERP has better AI attendance analytics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trackademiq offers superior AI attendance analytics with pattern detection, at-risk student alerts, automated follow-ups, and predictive absence modeling. While Teachmint provides digital attendance marking, Trackademiq's AI layer adds actionable insights that save teachers 2-3 hours per week."
          }
        }
      ]
    };

    const existingComp = document.querySelector('script[data-schema="teachmint-comparison-page"]');
    const existingFaq = document.querySelector('script[data-schema="teachmint-comparison-faq"]');
    if (existingComp) existingComp.remove();
    if (existingFaq) existingFaq.remove();

    const compScript = document.createElement('script');
    compScript.type = 'application/ld+json';
    compScript.setAttribute('data-schema', 'teachmint-comparison-page');
    compScript.textContent = JSON.stringify(comparisonSchema);
    document.head.appendChild(compScript);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.setAttribute('data-schema', 'teachmint-comparison-faq');
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      const compEl = document.querySelector('script[data-schema="teachmint-comparison-page"]');
      const faqEl = document.querySelector('script[data-schema="teachmint-comparison-faq"]');
      if (compEl) compEl.remove();
      if (faqEl) faqEl.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
              <img src={trackademiqLogo} alt="Trackademiq Logo" className="w-10 h-10 rounded-md object-contain" />
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
                  Teachmint
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Two modern school ERP platforms compared. See how Trackademiq's AI-driven approach delivers deeper insights and better outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-md p-6 sm:p-8 text-white mb-12"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Summary</h2>
              <p className="text-lg leading-relaxed">
                Both Trackademiq and Teachmint are modern school management platforms. The key difference? <strong>Trackademiq is an AI-powered Education ERP that automates everything.</strong> From predictive at-risk detection to automated operations across attendance, fees, reports, and communication — Trackademiq catches problems early and turns school data into actionable intelligence.
              </p>
            </motion.div>

            <div className="mb-12 overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-md overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-left p-4 font-semibold text-indigo-600 dark:text-indigo-400">Trackademiq</th>
                    <th className="text-left p-4 font-semibold text-slate-500">Teachmint</th>
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
                      data-testid={`row-comparison-${idx}`}
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
                          {comp.competitorHas ? (
                            <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-sm text-muted-foreground">{comp.competitor}</span>
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
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Why Choose Trackademiq Over Teachmint</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Deeper AI:</strong> Predictive analytics, at-risk detection, and natural language queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Full AI Automation:</strong> Every operation automated — reports, fees, attendance, and more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Customization:</strong> Role-specific dashboards and configurable workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Offline Support:</strong> Progressive web app with automatic data sync</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Teachmint Strengths</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Quick initial setup for basic school management needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Integrated live class and video teaching features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Strong presence in the Indian education market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Parent app with basic communication features</span>
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
                Compare Trackademiq to Teachmint in a personalized live demo
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={trackademiqLogo} alt="Trackademiq" className="w-8 h-8 rounded-md" />
              <span className="font-semibold">Trackademiq</span>
            </div>
            <div className="flex items-center gap-6 flex-wrap text-sm text-white/60">
              <Link href="/what-is-trackademiq" className="hover:text-white transition-colors" data-testid="link-what-is-trackademiq">What is Trackademiq?</Link>
              <Link href="/trackademiq-vs-traditional-erp" className="hover:text-white transition-colors" data-testid="link-vs-traditional-erp">vs Traditional ERP</Link>
              <Link href="/trackademiq-vs-powerschool" className="hover:text-white transition-colors" data-testid="link-vs-powerschool">vs PowerSchool</Link>
              <Link href="/faq" className="hover:text-white transition-colors" data-testid="link-faq">FAQ</Link>
              <Link href="/#contact" className="hover:text-white transition-colors" data-testid="link-contact">Contact</Link>
            </div>
            <p className="text-sm text-white/40">&copy; {new Date().getFullYear()} Trackademiq Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
