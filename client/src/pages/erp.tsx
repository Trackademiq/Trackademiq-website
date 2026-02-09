import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Brain, 
  UserCheck, 
  CreditCard, 
  BookOpen, 
  MessageSquare, 
  Building2,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
  Smartphone
} from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const erpModules = [
  { icon: Brain, title: "AI Analytics", desc: "Predictive insights & reports" },
  { icon: UserCheck, title: "Attendance", desc: "Biometric & app-based tracking" },
  { icon: CreditCard, title: "Fee Management", desc: "Online payments & reminders" },
  { icon: BookOpen, title: "Academics", desc: "Marks, exams & report cards" },
  { icon: MessageSquare, title: "Communication", desc: "Parent-teacher messaging" },
  { icon: Building2, title: "Multi-Branch", desc: "Manage multiple schools" }
];

const benefits = [
  "Smart report cards: 8 hours to 15 minutes",
  "Instant parent notifications",
  "Paperless school operations",
  "Real-time data & analytics",
  "Mobile apps for all users",
  "Cloud-based access anytime"
];

export default function ErpPage() {
  useEffect(() => {
    document.title = "School ERP Software | Trackademiq - AI-Powered Solution";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Trackademiq is a next-generation AI-powered school ERP. AI attendance analytics, smart report cards, real-time notifications, multi-school management & automated fee tracking. Built for schools worldwide.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "School ERP Software | Trackademiq");
    }
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
              <Link href="/features">
                <Button variant="ghost" data-testid="button-features">Features</Button>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered School ERP
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                Complete Education ERP{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  for Schools
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Trackademiq is a next-generation AI-powered school ERP software. AI attendance analytics, smart report cards (8hrs→15min), role-specific insights, and real-time notifications. Built for modern schools.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-request-demo">
                    Request Free Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" data-testid="button-view-features">
                    View All Features
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
            >
              {erpModules.map((module, idx) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={module.title}
                    variants={fadeInUp}
                    className="p-5 rounded-xl bg-card border border-border hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg transition-all text-center"
                    data-testid={`erp-module-${idx}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">{module.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Why Schools Choose Trackademiq ERP
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 border-indigo-100 dark:border-indigo-900">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">8hrs→15min</div>
                      <div className="text-sm text-muted-foreground">Report Cards</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">2-3hrs</div>
                      <div className="text-sm text-muted-foreground">Saved Weekly/Teacher</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">Real-Time</div>
                      <div className="text-sm text-muted-foreground">At-Risk Detection</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={fadeInUp} className="p-6 rounded-xl bg-card border border-border text-center">
                <Globe className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Cloud-Based</h3>
                <p className="text-sm text-muted-foreground">Access from anywhere, anytime with secure cloud hosting</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="p-6 rounded-xl bg-card border border-border text-center">
                <Smartphone className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Mobile Apps</h3>
                <p className="text-sm text-muted-foreground">Native Android & iOS apps for parents, teachers, students</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="p-6 rounded-xl bg-card border border-border text-center">
                <Shield className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">Enterprise-grade security with encrypted data storage</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Trackademiq Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
