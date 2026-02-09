import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Brain, 
  UserCheck, 
  CreditCard, 
  BookOpen, 
  MessageSquare, 
  Building2,
  Clock,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2
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

const features = [
  {
    icon: Brain,
    title: "AI Analytics Dashboard",
    description: "Get real-time insights into student performance, attendance patterns, and predictive analytics to identify at-risk students before issues arise.",
    benefits: ["Predict student dropouts", "Identify learning gaps", "Track performance trends"],
    color: "from-indigo-500 to-violet-500"
  },
  {
    icon: UserCheck,
    title: "Automated Attendance",
    description: "Biometric and app-based attendance with instant parent notifications. No more manual tracking or paper registers.",
    benefits: ["Instant parent alerts", "Biometric integration", "Attendance reports"],
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: CreditCard,
    title: "Fee Management",
    description: "Complete fee lifecycle management with online payments, automated reminders, and detailed financial reports.",
    benefits: ["Online payments", "Auto reminders", "Financial analytics"],
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: BookOpen,
    title: "Marks & Homework",
    description: "Digital gradebook with exam scheduling, homework assignments, and automatic report card generation.",
    benefits: ["Digital gradebook", "Auto report cards", "Assignment tracking"],
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "Parent Communication",
    description: "Two-way messaging between teachers and parents with broadcast announcements and group messaging.",
    benefits: ["Instant messaging", "Broadcast alerts", "PTM scheduling"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Clock,
    title: "Leave Management",
    description: "Digital leave applications for staff and students with approval workflows and calendar integration.",
    benefits: ["Digital applications", "Approval workflow", "Calendar sync"],
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Building2,
    title: "Multi-Branch Support",
    description: "Manage multiple school branches from a single dashboard with branch-wise analytics and comparison.",
    benefits: ["Unified dashboard", "Branch comparison", "Centralized control"],
    color: "from-slate-500 to-gray-600"
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Enterprise-grade security with encrypted data, role-based access, and GDPR compliance.",
    benefits: ["Encrypted storage", "Role-based access", "Audit logs"],
    color: "from-red-500 to-rose-500"
  }
];

export default function FeaturesPage() {
  useEffect(() => {
    document.title = "Features | Trackademiq School ERP Software";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore Trackademiq's AI-powered Education ERP features: AI automates every school operation, catches problems early, and delivers role-specific insights. Attendance, fees, reports, and more.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Features | Trackademiq School ERP Software");
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
              <Link href="/contact">
                <Button variant="ghost" data-testid="button-contact">Contact</Button>
              </Link>
              <Link href="/pricing">
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
                  <Sparkles className="w-3 h-3 mr-1" />
                  Complete School ERP Features
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                Powerful Features for{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Modern Schools
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Comprehensive modules to digitize every aspect of school operations. From attendance to analytics, we've got you covered.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeInUp}
                    className="group p-6 rounded-2xl bg-card border border-border hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg transition-all duration-300"
                    data-testid={`feature-card-${idx}`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-request-demo">
                  Request a Free Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
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
