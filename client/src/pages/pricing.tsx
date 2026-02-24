import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare
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

const PRICING_PLANS = [
  {
    name: "Starter",
    tagline: "Core digitization for small schools",
    price: 120,
    period: "per student / year",
    features: [
      "Student info & basic SIS",
      "Digital attendance & history",
      "Fee tracking & reminders",
      "Timetable & academic calendar",
      "Basic dashboards (principal, teachers, parents)",
      "Mobile access (web & app)",
      "Single school only",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "Full AI & automation for one school",
    price: 180,
    period: "per student / year",
    features: [
      "Everything in Starter",
      "AI at-risk student detection",
      "AI-automated report cards & grade analysis",
      "Homework & assignment management with AI",
      "Parent-teacher messaging & real-time notifications",
      "Online fee payments (payment gateway)",
      "Leave management & approvals",
      "AI analytics dashboard",
      "Staff & leave management",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "Multi-school & scale",
    price: 240,
    period: "per student / year",
    features: [
      "Everything in Growth",
      "Multi-school / multi-tenant (multiple branches)",
      "AI comparison across branches",
      "Central + branch-level dashboards",
      "Dedicated success manager (optional)",
      "Priority onboarding & training",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing | Trackademiq School ERP Software";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get custom pricing for Trackademiq AI-powered school ERP. Flexible plans based on school size. AI attendance analytics, smart report cards, real-time notifications. Request a free demo.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Pricing | Trackademiq School ERP");
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
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-contact">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main id="main" aria-label="Main content">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                  Flexible Pricing
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                Simple, Transparent{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Pricing
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Per student per year. Total = (Rate × Number of students). All plans include cloud hosting, security, and updates.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
            >
              {PRICING_PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col p-6 sm:p-8 ${
                    plan.highlighted
                      ? "border-2 border-indigo-500 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/20 scale-[1.02] md:scale-105"
                      : "border border-border"
                  }`}
                  data-testid={`card-plan-${plan.name.toLowerCase()}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-indigo-600 text-white border-0">Most popular</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">₹{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contact" className="block">
                    <Button
                      className={plan.highlighted ? "bg-indigo-600 hover:bg-indigo-700 w-full" : "w-full"}
                      variant={plan.highlighted ? "default" : "outline"}
                      data-testid={`button-plan-${plan.name.toLowerCase()}`}
                    >
                      Request quote
                    </Button>
                  </Link>
                </Card>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 max-w-3xl mx-auto p-4 sm:p-6 rounded-xl bg-muted/50 dark:bg-muted/20 border border-border text-center"
            >
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong className="text-foreground">Example:</strong> 500 students × ₹180/year = ₹90,000/year (ex. GST). Final pricing depends on student count and contract term.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/#contact">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-request-demo">
                  Request Demo & Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+919894836016">
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-call-now">
                  <Phone className="w-4 h-4 mr-2" />
                  Call +91 98948 36016
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Card className="p-6 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 border-0">
                <MessageSquare className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Have Questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Our team is ready to help you find the perfect plan for your school.
                </p>
                <a href="mailto:info@trackademiq.com">
                  <Button variant="outline" data-testid="button-email-us">
                    Email us at info@trackademiq.com
                  </Button>
                </a>
              </Card>
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
