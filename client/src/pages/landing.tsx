import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertDemoRequestSchema, type InsertDemoRequest } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { ChatWidget } from "@/components/chat-widget";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Brain, 
  UserCheck, 
  CreditCard, 
  BookOpen, 
  MessageSquare, 
  Building2,
  CheckCircle2,
  Star,
  Phone,
  Mail,
  MapPin,
  Download,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Heart,
  Shield,
  Clock,
  TrendingUp,
  Zap
} from "lucide-react";
import { SiLinkedin, SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

import heroImage from "@assets/generated_images/modern_indian_classroom_students.png";
import schoolsImage from "@assets/generated_images/indian_school_principal_administrator.png";
import teachersImage from "@assets/generated_images/indian_teacher_with_tablet_students.png";
import parentsImage from "@assets/generated_images/indian_parent_helping_child_homework.png";

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

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#benefits", label: "Benefits" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="header-main"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                : "text-white"
            }`}>
              Edufy
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  isScrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#contact")}
              className={isScrolled ? "" : "text-white hover:text-white hover:bg-white/10"}
              data-testid="button-request-demo-header"
            >
              Request Demo
            </Button>
            <Button
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0"
              data-testid="button-download-app-header"
            >
              <Download className="w-4 h-4 mr-2" />
              Download App
            </Button>
          </div>

          <button
            className={`lg:hidden p-2 rounded-md ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("#contact")}
                  className="w-full"
                  data-testid="button-request-demo-mobile"
                >
                  Request Demo
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0"
                  data-testid="button-download-app-mobile"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download App
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-cyan-950"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.2),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-xl"
          >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered School Management
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            data-testid="text-hero-headline"
          >
            Smart School Management,{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Simplified
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
            data-testid="text-hero-subtext"
          >
            Edufy connects students, teachers, parents, and administrators through one powerful platform. 
            Get AI-powered insights, real-time updates, and seamless communication for your school.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0 text-base px-8"
              data-testid="button-request-demo-hero"
            >
              Request Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20"
              data-testid="button-download-app-hero"
            >
              <Download className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-6 mt-12 text-white/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>500+ Schools Trust Us</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>2 Lakh+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>4.8 Star Rating</span>
            </div>
          </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-500/20 border border-white/10">
              <img
                src={heroImage}
                alt="Diverse Indian students learning in a modern classroom with tablets and laptops"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">98% Satisfaction</div>
                  <div className="text-white/60 text-sm">From our schools</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">2 Lakh+</div>
                  <div className="text-white/60 text-sm">Active Students</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Analytics",
      description: "Smart insights on student performance, attendance patterns, and learning gaps with predictive analytics."
    },
    {
      icon: UserCheck,
      title: "Attendance Tracking",
      description: "Biometric and app-based attendance with instant parent notifications and detailed reports."
    },
    {
      icon: CreditCard,
      title: "Fee Management",
      description: "Automated fee collection, payment reminders, and comprehensive financial reports for schools."
    },
    {
      icon: BookOpen,
      title: "Homework & Assignments",
      description: "Digital homework distribution, submission tracking, and grading with deadline reminders."
    },
    {
      icon: MessageSquare,
      title: "Instant Messaging",
      description: "Secure chat between teachers, parents, and administrators with broadcast announcements."
    },
    {
      icon: Building2,
      title: "Multi-School Support",
      description: "Manage multiple campuses from one dashboard with centralized reporting and controls."
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-background" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Zap className="w-3 h-3 mr-1" />
              Powerful Features
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Everything Your School Needs
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive tools designed to streamline school operations and enhance the learning experience
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card
                className="p-6 h-full border-t-4 border-t-transparent hover:border-t-teal-500 transition-all duration-300 hover-elevate"
                data-testid={`card-feature-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Register Your School",
      description: "Sign up with your school details and get your dedicated dashboard within 24 hours."
    },
    {
      number: "02",
      title: "Onboard Your Team",
      description: "Add teachers, staff, students, and parents. Bulk upload available for quick setup."
    },
    {
      number: "03",
      title: "Start Managing",
      description: "Access all features immediately. Our support team helps you every step of the way."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-card" data-testid="section-how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Clock className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Get Started in 3 Easy Steps
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We've made onboarding simple so you can focus on what matters most - education
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="relative"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 text-white text-2xl font-bold mb-6">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-teal-300 to-cyan-300 dark:from-teal-800 dark:to-cyan-800" />
                )}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "For Schools",
      image: schoolsImage,
      imageAlt: "Indian school principal in modern school office",
      icon: Building2,
      points: [
        "Centralized administration dashboard",
        "Real-time data and analytics",
        "Reduced paperwork by 80%",
        "Better parent engagement",
        "Automated compliance reports"
      ]
    },
    {
      title: "For Teachers",
      image: teachersImage,
      imageAlt: "Indian teacher using tablet with students",
      icon: Users,
      points: [
        "Easy attendance in seconds",
        "Digital gradebook and reports",
        "Direct parent communication",
        "Homework management tools",
        "Performance tracking insights"
      ]
    },
    {
      title: "For Parents",
      image: parentsImage,
      imageAlt: "Indian mother helping child with homework using smartphone app",
      icon: Heart,
      points: [
        "Real-time child updates",
        "Instant fee payment options",
        "Direct teacher messaging",
        "Homework and exam alerts",
        "Academic progress tracking"
      ]
    }
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 bg-background" data-testid="section-benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Benefits for Everyone
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Designed for All Stakeholders
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Every user gets tools tailored to their unique needs and responsibilities
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.title} variants={fadeInUp}>
              <Card
                className="overflow-hidden h-full"
                data-testid={`card-benefit-${index}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={benefit.image}
                    alt={benefit.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {benefit.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "4,999",
      period: "/month",
      description: "Perfect for small schools just getting started",
      features: [
        "Up to 500 students",
        "5 admin accounts",
        "Attendance tracking",
        "Fee management",
        "Parent app access",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "9,999",
      period: "/month",
      description: "For growing schools with advanced needs",
      features: [
        "Up to 2,000 students",
        "Unlimited admin accounts",
        "AI-powered analytics",
        "Homework management",
        "SMS notifications",
        "Priority phone support",
        "Custom branding"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large schools and school chains",
      features: [
        "Unlimited students",
        "Multi-campus support",
        "Advanced API access",
        "Dedicated account manager",
        "On-premise deployment",
        "24/7 premium support",
        "Custom integrations",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-card" data-testid="section-pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Shield className="w-3 h-3 mr-1" />
              Transparent Pricing
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Plans That Grow With You
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the perfect plan for your school. All plans include a 14-day free trial.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div key={plan.name} variants={fadeInUp}>
              <Card
                className={`p-6 h-full flex flex-col relative ${
                  plan.popular
                    ? "border-2 border-teal-500 dark:border-teal-400"
                    : ""
                }`}
                data-testid={`card-pricing-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Custom" && <span className="text-2xl font-medium text-muted-foreground">₹</span>}
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={
                    plan.popular
                      ? "w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0"
                      : "w-full"
                  }
                  variant={plan.popular ? "default" : "outline"}
                  data-testid={`button-pricing-cta-${index}`}
                >
                  {plan.cta}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Edufy has transformed how we manage our school. The AI analytics helped us identify at-risk students early and improve our overall results by 25%.",
      author: "Dr. Lakshmi Venkatesh",
      role: "Principal",
      school: "Chennai Public School",
      rating: 5
    },
    {
      quote: "As a parent, I love getting real-time updates about my child's attendance and performance. The fee payment feature has made my life so much easier!",
      author: "Rajesh Kumar",
      role: "Parent",
      school: "St. Mary's Matriculation School",
      rating: 5
    },
    {
      quote: "The homework management and direct messaging features have saved me hours every week. I can now focus more on teaching and less on paperwork.",
      author: "Priya Sundaram",
      role: "Science Teacher",
      school: "DAV School, Chennai",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Heart className="w-3 h-3 mr-1" />
              Trusted by Schools
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from schools across Chennai who have transformed their operations with Edufy
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className="p-6 h-full flex flex-col"
                data-testid={`card-testimonial-${index}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed flex-grow mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center">
                    <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.school}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const form = useForm<InsertDemoRequest>({
    resolver: zodResolver(insertDemoRequestSchema),
    defaultValues: {
      schoolName: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      const response = await apiRequest("POST", "/api/demo-requests", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted!",
        description: "Our team will contact you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertDemoRequest) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-card" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-3"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4" variant="secondary" size="sm">
                <Phone className="w-3 h-3 mr-1" />
                Get In Touch
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Request a Free Demo
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-8"
            >
              Fill out the form and our team will schedule a personalized demo for your school.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your school name"
                              {...field}
                              data-testid="input-school-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@school.edu"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+91 98948 36016"
                                {...field}
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your school's needs..."
                              className="min-h-[100px]"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0"
                      disabled={mutation.isPending}
                      data-testid="button-submit-demo-request"
                    >
                      {mutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request Demo
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-2"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Address</div>
                      <div className="text-muted-foreground">
                        123 Tech Park, OMR<br />
                        Chennai, Tamil Nadu 600096<br />
                        India
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      <a
                        href="tel:+919894836016"
                        className="text-muted-foreground hover:text-teal-600 transition-colors"
                        data-testid="link-phone"
                      >
                        +91 9894836016
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <a
                        href="mailto:contact@edufy.in"
                        className="text-muted-foreground hover:text-teal-600 transition-colors"
                        data-testid="link-email"
                      >
                        contact@edufy.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-teal-600 to-cyan-600">
                <h4 className="text-lg font-semibold text-white mb-3">Why Choose Edufy?</h4>
                <ul className="space-y-2">
                  {[
                    "14-day free trial",
                    "No credit card required",
                    "Free data migration",
                    "Dedicated support team"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Product Tour", href: "/product-tour" },
    ],
    company: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
      { label: "About Us", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Data Security", href: "#" },
      { label: "GDPR Compliance", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: SiFacebook, href: "#", label: "Facebook" },
    { icon: SiX, href: "#", label: "X" },
    { icon: SiLinkedin, href: "#", label: "LinkedIn" },
    { icon: SiInstagram, href: "#", label: "Instagram" },
    { icon: SiYoutube, href: "#", label: "YouTube" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-foreground text-background py-16" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-background">Edufy</span>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Empowering schools across India with AI-powered management solutions. 
              Making education administration smarter, simpler, and more connected.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-sm text-background/60">
                <div className="font-medium text-background mb-1">Chennai, India</div>
                <a href="tel:+919894836016" className="hover:text-teal-400 transition-colors">
                  +91 9894836016
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-background/70 hover:text-teal-400 transition-colors text-left"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-teal-400 transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-background/70 hover:text-teal-400 transition-colors text-left"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-teal-400 transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-teal-400 transition-colors text-left"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-background/60">
            © {new Date().getFullYear()} Edufy Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-teal-600 transition-colors"
                aria-label={social.label}
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
