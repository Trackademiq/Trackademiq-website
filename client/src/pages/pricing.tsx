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

const includedFeatures = [
  "AI Analytics Dashboard",
  "Automated Attendance Tracking",
  "Fee Management & Online Payments",
  "Marks & Report Card Generation",
  "Parent-Teacher Communication",
  "Homework & Assignment Management",
  "Leave Management System",
  "Multi-Branch Support",
  "Mobile Apps (Android & iOS)",
  "Email & SMS Notifications",
  "Data Export & Reports",
  "Dedicated Support"
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

      <main>
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
                Custom pricing based on your school's size and requirements. Request a demo to get a personalized quote.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="p-8 sm:p-10 border-2 border-indigo-200 dark:border-indigo-800">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Complete School ERP Package</h2>
                  <p className="text-muted-foreground">Everything you need to digitize your school</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-indigo-600">Custom Quote</span>
                    <p className="text-sm text-muted-foreground mt-1">Based on student count & features</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {includedFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                </div>
              </Card>
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
