import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  MousePointerClick,
  Zap,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Puzzle,
  DollarSign,
  Check,
  X,
  Sparkles,
  BarChart3,
  Clock,
  Users,
} from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const criteria = [
  {
    icon: Brain,
    title: "AI Capabilities",
    description:
      "Look for predictive analytics, at-risk student detection, and AI-driven insights that go beyond basic reporting.",
  },
  {
    icon: MousePointerClick,
    title: "Ease of Use",
    description:
      "The best school ERP software should require minimal training with intuitive interfaces for teachers, admins, and parents.",
  },
  {
    icon: Zap,
    title: "Implementation Speed",
    description:
      "Top systems deploy in weeks, not months. Avoid solutions that require 6+ months of painful migration.",
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description:
      "Native iOS and Android apps with real-time notifications keep stakeholders connected from anywhere.",
  },
  {
    icon: ShieldCheck,
    title: "Data Security",
    description:
      "Enterprise-grade encryption, role-based access controls, and compliance with education data privacy standards.",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description:
      "Cloud-based architecture that grows with your institution, from a single campus to a multi-school network.",
  },
  {
    icon: Puzzle,
    title: "Integration Options",
    description:
      "Seamless connections to payment gateways, communication tools, government portals, and third-party apps.",
  },
  {
    icon: DollarSign,
    title: "Cost Effectiveness",
    description:
      "Transparent pricing with measurable ROI. The best school ERP pays for itself through time savings and efficiency.",
  },
];

const featureComparison = [
  { feature: "AI-Powered Analytics", aiErp: true, basicErp: false, spreadsheets: false },
  { feature: "At-Risk Student Detection", aiErp: true, basicErp: false, spreadsheets: false },
  { feature: "Smart Report Cards", aiErp: true, basicErp: true, spreadsheets: false },
  { feature: "Automated Attendance", aiErp: true, basicErp: true, spreadsheets: false },
  { feature: "Fee Management", aiErp: true, basicErp: true, spreadsheets: false },
  { feature: "Parent Communication Portal", aiErp: true, basicErp: true, spreadsheets: false },
  { feature: "Natural Language Queries", aiErp: true, basicErp: false, spreadsheets: false },
  { feature: "Role-Specific Dashboards", aiErp: true, basicErp: false, spreadsheets: false },
  { feature: "Multi-Campus Management", aiErp: true, basicErp: false, spreadsheets: false },
  { feature: "Real-Time Notifications", aiErp: true, basicErp: false, spreadsheets: false },
  { feature: "Implementation < 4 Weeks", aiErp: true, basicErp: false, spreadsheets: true },
  { feature: "Mobile Apps (iOS & Android)", aiErp: true, basicErp: false, spreadsheets: false },
];

const aiTransformations = [
  {
    icon: Sparkles,
    title: "Predictive Student Insights",
    description:
      "AI algorithms analyze attendance, grades, and behavior patterns to identify at-risk students before they fall behind, enabling proactive intervention.",
  },
  {
    icon: BarChart3,
    title: "Automated Reporting",
    description:
      "Generate comprehensive report cards and analytics in minutes instead of hours. Smart report card generation reduces time from 8 hours to 15 minutes per class.",
  },
  {
    icon: Clock,
    title: "Administrative Automation",
    description:
      "From timetable optimization to fee reconciliation, AI handles repetitive tasks so administrators can focus on strategic decisions and student outcomes.",
  },
  {
    icon: Users,
    title: "Personalized Stakeholder Experience",
    description:
      "Role-specific dashboards ensure principals see school-wide trends, teachers see class-level data, and parents get real-time updates on their child.",
  },
];

export default function BestSchoolErpPage() {
  useEffect(() => {
    document.title =
      "Best School ERP Software 2025 | AI-Powered School Management Systems Compared";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Compare the best school ERP software in 2025. Discover top AI-powered school management systems, features comparison, and why cloud-based school ERPs outperform traditional solutions."
      );
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Best School ERP Software 2025 | AI-Powered School Management Systems Compared",
      description:
        "Compare the best school ERP software in 2025. Discover top AI-powered school management systems, features comparison, and why cloud-based school ERPs outperform traditional solutions.",
      keywords:
        "best school ERP software, top school management system 2025, school ERP comparison, AI school ERP, cloud school management software",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: criteria.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.title,
          description: item.description,
        })),
      },
    };

    const existing = document.querySelector('script[data-schema="best-school-erp"]');
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "best-school-erp");
    script.textContent = JSON.stringify(webPageSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.querySelector('script[data-schema="best-school-erp"]');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
              <img
                src={trackademiqLogo}
                alt="Trackademiq Logo"
                className="w-10 h-10 rounded-md object-contain"
              />
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Trackademiq
              </span>
            </Link>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/#contact">
                <Button
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                  data-testid="button-header-demo"
                >
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="py-16 sm:py-24 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center"
            >
              <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                2025 Comparison Guide
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Best School ERP Software{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  2025
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                A comprehensive guide to choosing the top school management system in 2025.
                Compare AI-powered school ERPs, cloud school management software, and find the
                right fit for your institution.
              </p>
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                  data-testid="button-hero-demo"
                >
                  Get a Free Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                What to Look for in a School ERP
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Before comparing school ERP solutions, understand the key criteria that separate
                the best school ERP software from average options.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {criteria.map((item) => (
                <motion.div key={item.title} variants={fadeInUp}>
                  <Card className="p-5 h-full" data-testid={`card-criteria-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-md bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Top School ERP Features Comparison
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how AI-powered school ERPs stack up against basic ERP systems and manual
                spreadsheet-based management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-md overflow-hidden shadow-sm" data-testid="table-feature-comparison">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center p-4 font-semibold text-indigo-600 dark:text-indigo-400">
                      AI School ERP
                    </th>
                    <th className="text-center p-4 font-semibold text-slate-500">Basic ERP</th>
                    <th className="text-center p-4 font-semibold text-slate-400">Spreadsheets</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, idx) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + idx * 0.04 }}
                      className="border-t border-slate-200 dark:border-slate-700"
                    >
                      <td className="p-4 font-medium text-foreground text-sm">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.aiErp ? (
                          <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.basicErp ? (
                          <Check className="w-5 h-5 text-amber-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.spreadsheets ? (
                          <Check className="w-5 h-5 text-amber-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-sm text-muted-foreground text-center mt-6"
            >
              AI-powered cloud school management software like Trackademiq delivers capabilities
              that basic ERPs and spreadsheets simply cannot match.
            </motion.p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                The Future of Education
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Why AI-Powered School ERPs Are the Future
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The best school ERP software in 2025 leverages artificial intelligence to
                transform school management from reactive record-keeping to proactive,
                data-driven decision-making.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 gap-6 mb-12"
            >
              {aiTransformations.map((item) => (
                <motion.div key={item.title} variants={fadeInUp}>
                  <Card className="p-6 h-full" data-testid={`card-ai-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-md p-6 sm:p-8 text-white"
            >
              <h3 className="text-xl font-semibold mb-3">
                The Shift from Data Storage to Data Intelligence
              </h3>
              <p className="text-white/90 leading-relaxed mb-4">
                Traditional school ERPs act as digital filing cabinets — they store data but
                don't help you act on it. The top school management systems in 2025 use AI to
                surface patterns, predict outcomes, and recommend actions. Schools using
                AI-powered ERPs report saving 2-3 hours per teacher weekly and reducing report
                card generation time from 8 hours to just 15 minutes per class.
              </p>
              <p className="text-white/80 text-sm">
                Cloud school management software with AI capabilities isn't just an upgrade — it's
                a fundamental shift in how schools operate and improve student outcomes.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Ready to Experience the Best School ERP?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                See why schools across India trust Trackademiq as their AI-powered school
                management platform. Schedule a personalized demo today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                    data-testid="button-cta-demo"
                  >
                    Request a Free Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="outline" size="lg" data-testid="button-cta-features">
                    Explore Features
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No commitment required. See Trackademiq in action with your school's data.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src={trackademiqLogo}
                alt="Trackademiq"
                className="w-8 h-8 rounded-md"
              />
              <span className="font-semibold">Trackademiq</span>
            </div>
            <div className="flex items-center gap-6 flex-wrap text-sm text-white/60">
              <Link href="/what-is-trackademiq" className="hover:text-white transition-colors" data-testid="link-footer-what-is">
                What is Trackademiq?
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors" data-testid="link-footer-faq">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors" data-testid="link-footer-contact">
                Contact
              </Link>
            </div>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Trackademiq Technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
