import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import trackademiqLogo from "@/assets/trackademiq-logo.png";
import { 
  ArrowLeft, 
  ArrowRight,
  Brain,
  UserCheck,
  CreditCard,
  BookOpen,
  MessageSquare,
  Building2,
  CheckCircle2,
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

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

const tourSteps = [
  {
    id: 1,
    title: "AI-Powered Analytics Dashboard",
    icon: Brain,
    description: "Get intelligent insights about student performance, attendance patterns, and learning gaps. Our AI identifies at-risk students before they fall behind.",
    features: [
      "Real-time performance tracking",
      "Predictive analytics for early intervention",
      "Customizable dashboards for each role",
      "Automated report generation"
    ],
    color: "from-teal-500 to-cyan-600"
  },
  {
    id: 2,
    title: "Smart Attendance System",
    icon: UserCheck,
    description: "Track attendance in seconds with biometric or app-based check-ins. Parents receive instant notifications when their child is marked absent.",
    features: [
      "Biometric and app-based options",
      "Instant parent notifications",
      "Pattern recognition for truancy",
      "Detailed attendance reports"
    ],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 3,
    title: "Automated Fee Management",
    icon: CreditCard,
    description: "Streamline fee collection with multiple payment options, automated reminders, and comprehensive financial reporting.",
    features: [
      "UPI, cards, and net banking",
      "Smart payment reminders",
      "Installment plan management",
      "Digital receipts and invoices"
    ],
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    title: "Homework & Assignment Hub",
    icon: BookOpen,
    description: "Create, distribute, and track assignments digitally. Students submit work online, and teachers can grade efficiently.",
    features: [
      "Digital assignment creation",
      "Deadline reminders for students",
      "Online submission and grading",
      "Parent visibility into homework"
    ],
    color: "from-orange-500 to-amber-600"
  },
  {
    id: 5,
    title: "Unified Messaging Platform",
    icon: MessageSquare,
    description: "Connect teachers, parents, and administrators through secure, instant messaging. Broadcast announcements reach everyone instantly.",
    features: [
      "Direct teacher-parent chat",
      "Broadcast announcements",
      "Read receipts and delivery status",
      "Emergency notifications"
    ],
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 6,
    title: "Multi-School Management",
    icon: Building2,
    description: "Manage multiple campuses from a single dashboard. Centralized reporting and controls for school chains and groups.",
    features: [
      "Centralized admin dashboard",
      "Campus-wise analytics",
      "Unified fee and attendance",
      "Cross-campus communication"
    ],
    color: "from-cyan-500 to-teal-600"
  }
];

function ProductTourHeader() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-teal-600 to-cyan-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <Link href="/">
              <Button variant="ghost" className="mb-6 text-white/80 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Play className="w-3 h-3 mr-1" />
              Interactive Tour
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Explore Trackademiq Features
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Take an interactive walkthrough of all the powerful features that make Trackademiq the preferred choice for schools across Chennai
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function InteractiveTour() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = tourSteps[activeStep];

  const goToNext = () => {
    if (activeStep < tourSteps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tourSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeStep === index
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-testid={`button-tour-step-${index}`}
            >
              <step.icon className="w-4 h-4" />
              <span className="hidden md:inline">{step.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center`}>
                  <currentStep.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary">
                  Step {activeStep + 1} of {tourSteps.length}
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {currentStep.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {currentStep.description}
              </p>
              <ul className="space-y-3 mb-8">
                {currentStep.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={goToPrev}
                  disabled={activeStep === 0}
                  data-testid="button-tour-prev"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  onClick={goToNext}
                  disabled={activeStep === tourSteps.length - 1}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0"
                  data-testid="button-tour-next"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className={`p-8 bg-gradient-to-br ${currentStep.color} aspect-video flex items-center justify-center`}>
                <div className="text-center text-white">
                  <currentStep.icon className="w-24 h-24 mx-auto mb-6 opacity-90" />
                  <h3 className="text-2xl font-bold mb-2">{currentStep.title}</h3>
                  <p className="text-white/80">Interactive demo coming soon</p>
                </div>
              </Card>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-teal-200 to-cyan-200 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full blur-xl" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeStep === index
                    ? "w-6 bg-teal-600"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AllFeaturesGrid() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              All Features
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-foreground mb-4">
            Everything You Need in One Platform
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
            Trackademiq brings together all the tools your school needs for seamless management
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tourSteps.map((step, index) => (
            <motion.div key={step.id} variants={fadeInUp}>
              <Card className="p-6 h-full hover-elevate">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the power of Trackademiq with a personalized demo. Our team will show you exactly how it can transform your school.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90">
                Request a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductTourFooter() {
  return (
    <section className="py-12 bg-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img 
            src={trackademiqLogo} 
            alt="Trackademiq Logo" 
            className="w-10 h-10 rounded-lg object-contain"
          />
          <span className="text-xl font-bold text-background">Trackademiq</span>
        </div>
        <p className="text-sm text-background/60">
          © {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default function ProductTourPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProductTourHeader />
      <InteractiveTour />
      <AllFeaturesGrid />
      <CTASection />
      <ProductTourFooter />
    </div>
  );
}
