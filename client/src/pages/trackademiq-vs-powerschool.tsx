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
    trackademiq: "Built-in AI detects at-risk students, predicts trends, and surfaces actionable insights automatically",
    competitor: "Basic reporting dashboards with limited analytics; no predictive AI capabilities",
    trackademiqHas: true,
    competitorHas: false
  },
  {
    feature: "Implementation Time",
    trackademiq: "2-4 weeks typical setup with guided onboarding and migration support",
    competitor: "3-12 months depending on school size; complex configuration process",
    trackademiqHas: true,
    competitorHas: false
  },
  {
    feature: "Report Card Generation",
    trackademiq: "AI-automated report generation with insights and grade analysis",
    competitor: "Template-based report cards requiring significant manual data entry",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Cost",
    trackademiq: "Startup-friendly pricing with transparent per-student plans, no hidden fees",
    competitor: "Enterprise pricing model with long-term contracts; costly add-on modules",
    trackademiqHas: true,
    competitorHas: false
  },
  {
    feature: "User Interface",
    trackademiq: "Modern, intuitive UI built with latest web technologies; minimal training needed",
    competitor: "Legacy interface that has evolved over decades; steeper learning curve",
    trackademiqHas: true,
    competitorHas: false
  },
  {
    feature: "Mobile App",
    trackademiq: "Full-featured iOS & Android apps with real-time sync and offline capabilities",
    competitor: "Mobile apps available but with limited functionality compared to desktop",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Parent Portal",
    trackademiq: "Real-time updates, AI-generated progress summaries, instant notifications",
    competitor: "Established parent portal with grade viewing and basic communication tools",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Multi-School Management",
    trackademiq: "Centralized dashboard with school-specific views and cross-campus analytics",
    competitor: "Multi-district support available but requires complex configuration per site",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Data Privacy",
    trackademiq: "GDPR & local compliance built-in; data hosted in region-specific servers",
    competitor: "FERPA compliant with established security; primarily US-focused data centers",
    trackademiqHas: true,
    competitorHas: true
  },
  {
    feature: "Cloud Architecture",
    trackademiq: "Cloud-native architecture with auto-scaling and high availability",
    competitor: "Transitioning from on-premise to cloud; hybrid deployment model",
    trackademiqHas: true,
    competitorHas: false
  }
];

export default function TrackademiqVsPowerschoolPage() {
  useEffect(() => {
    document.title = "Trackademiq vs PowerSchool | Modern AI-Powered School ERP Alternative";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Compare Trackademiq vs PowerSchool: AI-powered school ERP with smart report cards, predictive analytics, modern UX, and startup-friendly pricing. The best PowerSchool alternative for AI school management.");
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute("content", "Trackademiq vs PowerSchool | Modern AI-Powered School ERP Alternative");
    if (ogDesc) ogDesc.setAttribute("content", "Compare Trackademiq vs PowerSchool: AI analytics, faster implementation, modern UX, and affordable pricing. See why schools choose Trackademiq over legacy ERP systems.");

    const comparisonSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Trackademiq vs PowerSchool Comparison",
      "description": "Detailed comparison between Trackademiq AI-powered School ERP and PowerSchool for school management",
      "keywords": "Trackademiq vs PowerSchool, PowerSchool alternative, best school ERP software, AI school management",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": comparisons.map((comp, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": comp.feature,
          "description": `Trackademiq: ${comp.trackademiq}. PowerSchool: ${comp.competitor}`
        }))
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between Trackademiq and PowerSchool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trackademiq is an AI-powered Education ERP that automates every school operation and catches problems early through predictive analytics, with 2-4 week implementation. PowerSchool is an established legacy system with wide integrations but lacks built-in AI capabilities and has a longer implementation timeline of 3-12 months."
          }
        },
        {
          "@type": "Question",
          "name": "Is Trackademiq a good PowerSchool alternative?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Trackademiq is an excellent PowerSchool alternative for schools seeking AI-powered analytics, modern user experience, faster implementation, and startup-friendly pricing. While PowerSchool has established market presence, Trackademiq offers next-generation AI capabilities that legacy systems cannot match."
          }
        },
        {
          "@type": "Question",
          "name": "Which is the best school ERP software with AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trackademiq is the best AI-powered school ERP software, offering built-in predictive analytics, at-risk student detection, AI-generated report cards, and natural language queries. Unlike traditional ERPs like PowerSchool, Trackademiq was built AI-first from the ground up."
          }
        }
      ]
    };

    const existingComp = document.querySelector('script[data-schema="powerschool-comparison-page"]');
    const existingFaq = document.querySelector('script[data-schema="powerschool-comparison-faq"]');
    if (existingComp) existingComp.remove();
    if (existingFaq) existingFaq.remove();

    const compScript = document.createElement('script');
    compScript.type = 'application/ld+json';
    compScript.setAttribute('data-schema', 'powerschool-comparison-page');
    compScript.textContent = JSON.stringify(comparisonSchema);
    document.head.appendChild(compScript);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.setAttribute('data-schema', 'powerschool-comparison-faq');
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      const compEl = document.querySelector('script[data-schema="powerschool-comparison-page"]');
      const faqEl = document.querySelector('script[data-schema="powerschool-comparison-faq"]');
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
                  PowerSchool
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The modern AI-powered school ERP alternative to legacy systems. Compare features, pricing, and capabilities side by side.
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
                PowerSchool is an established player with wide integrations. <strong>Trackademiq is the AI-first alternative</strong> — an AI-powered Education ERP that automates every operation and catches problems early through predictive analytics. Get started in 2-4 weeks instead of months, at a fraction of the cost.
              </p>
            </motion.div>

            <div className="mb-12 overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-md overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-left p-4 font-semibold text-indigo-600 dark:text-indigo-400">Trackademiq</th>
                    <th className="text-left p-4 font-semibold text-slate-500">PowerSchool</th>
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
                <h3 className="text-lg font-bold text-foreground mb-4">Why Choose Trackademiq Over PowerSchool</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>AI-First Design:</strong> Predictive analytics and at-risk detection built into every feature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Modern UX:</strong> Intuitive interface requiring minimal training vs legacy UI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Affordable:</strong> Transparent per-student pricing vs enterprise contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Fast Setup:</strong> 2-4 weeks implementation vs 3-12 months</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">PowerSchool Strengths</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Established market presence with decades of experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Wide third-party integrations and partner ecosystem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Strong US K-12 market coverage and compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Large existing user community and support resources</span>
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
                Compare Trackademiq to PowerSchool in a personalized live demo
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
              <Link href="/trackademiq-vs-teachmint" className="hover:text-white transition-colors" data-testid="link-vs-teachmint">vs Teachmint</Link>
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
