import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

import schoolsImage from "@assets/generated_images/indian_school_principal_administrator.png";
import teachersImage from "@assets/generated_images/indian_teacher_with_tablet_students.png";
import parentsImage from "@assets/generated_images/indian_parent_helping_child_homework.png";
import trackademiqLogo from "@/assets/trackademiq-logo.png";
import heroIllustration from "@/assets/hero-illustration.png";

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
    { href: "#get-started", label: "Get Started" },
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
            <img 
              src={trackademiqLogo} 
              alt="Trackademiq Logo" 
              className="w-10 h-10 rounded-lg object-contain"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Trackademiq
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm font-medium transition-colors rounded-md text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              data-testid="button-request-demo-header"
            >
              Request Demo
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 font-semibold shadow-md shadow-indigo-500/20"
              data-testid="button-download-app-header"
            >
              <Download className="w-4 h-4 mr-2" />
              Download App
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-md text-slate-700 dark:text-slate-200"
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
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0"
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

function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full lg:w-1/2"
      data-testid="hero-illustration-module"
    >
      <div className="relative" data-testid="hero-visual">
        <img 
          src={heroIllustration} 
          alt="Students, teachers and school staff collaborating with AI analytics" 
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-2xl shadow-2xl"
        />
        
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            <span className="text-slate-800 text-xs sm:text-sm font-semibold">Cloud Secured</span>
          </div>
          <div className="w-px h-4 bg-slate-300" />
          <div className="flex items-center gap-1 sm:gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            <span className="text-slate-800 text-xs sm:text-sm font-semibold">ISO Compliant</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroContent({ scrollToContact }: { scrollToContact: () => void }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-xl w-full lg:w-1/2"
    >
      <motion.div variants={fadeInUp}>
        <Badge className="mb-6 bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800" size="sm">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered Education Intelligence
        </Badge>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.2] sm:leading-tight mb-4 sm:mb-6"
        data-testid="text-hero-headline"
      >
        Next-Generation
        <br />
        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Education Systems
        </span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
        data-testid="text-hero-subtext"
      >
        Education intelligence combining ERP workflows and analytics — connecting students, teachers, parents, and administrators.
      </motion.p>

      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          onClick={scrollToContact}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 text-base px-8 font-semibold shadow-lg shadow-indigo-500/25"
          data-testid="button-request-demo-hero"
        >
          Request Demo
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
          data-testid="button-download-app-hero"
        >
          <Download className="w-5 h-5 mr-2" />
          Download App
        </Button>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-12 text-slate-500 dark:text-slate-400 text-xs sm:text-sm"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
          <span>50+ Schools Trust Us</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
          <span>25,000+ Students</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
          <span>4.8 Star Rating</span>
        </div>
      </motion.div>
    </motion.div>
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
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(129,140,248,0.06),transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-indigo-800" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32 lg:py-40 w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
          <HeroContent scrollToContact={scrollToContact} />
          <HeroIllustration />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-indigo-200 dark:border-indigo-700 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-indigo-300 dark:bg-indigo-600 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Real-time dashboards with performance insights, at-risk student identification, and predictive trends analysis."
    },
    {
      icon: UserCheck,
      title: "Smart Attendance",
      description: "Biometric and app-based check-ins with instant parent notifications and automated reporting."
    },
    {
      icon: TrendingUp,
      title: "Marks & Report Cards",
      description: "Comprehensive grade management, automated report card generation, and performance leaderboards."
    },
    {
      icon: CreditCard,
      title: "Fee Management",
      description: "Automated fee collection, payment history tracking, and detailed financial analytics."
    },
    {
      icon: BookOpen,
      title: "Homework & Timetables",
      description: "Digital assignments, exam schedules, and timetable management with deadline reminders."
    },
    {
      icon: MessageSquare,
      title: "Announcements & Messaging",
      description: "Secure communication between teachers, parents, and admins with push notifications."
    },
    {
      icon: Clock,
      title: "Leave Management",
      description: "Student and staff leave requests with approval workflows and attendance integration."
    },
    {
      icon: Building2,
      title: "Multi-Tenant Platform",
      description: "Manage multiple schools and institutions from one centralized dashboard with role-based access."
    }
  ];

  return (
    <section id="features" className="py-8 sm:py-12 md:py-16 bg-background" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Zap className="w-3 h-3 mr-1" />
              Powerful Features
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
          >
            Comprehensive Education Intelligence
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Everything your school needs to run smoothly - from attendance to fees to parent communication
          </motion.p>
        </motion.div>

        <div className="sm:hidden flex flex-col gap-4">
          {(showAllFeatures ? features : features.slice(0, 3)).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-800 dark:to-indigo-950/30 border border-indigo-100/80 dark:border-indigo-800/40 shadow-sm"
              data-testid={`card-feature-mobile-${index}`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
          
          <AnimatePresence>
            {!showAllFeatures && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAllFeatures(true)}
                className="flex items-center justify-center gap-2 py-3 px-6 mx-auto mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 active:scale-95 transition-transform"
                data-testid="button-show-more-features"
              >
                <span>View All {features.length} Features</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title} 
              variants={fadeInUp}
              className="text-center group cursor-default"
              data-testid={`card-feature-${index}`}
            >
              <div className="relative mx-auto w-16 h-16 mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center border border-indigo-100 dark:border-indigo-800/50 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-500/20 group-hover:-translate-y-1">
                  <feature.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AnalyticsPreviewSection() {
  const students = [
    { name: "Priya Sharma", class: "10-A", attendance: 96, score: 92, status: "Excellent", trend: "up" },
    { name: "Arjun Kumar", class: "10-B", attendance: 78, score: 65, status: "At Risk", trend: "down" },
    { name: "Meera Patel", class: "10-A", attendance: 94, score: 88, status: "Good", trend: "up" },
    { name: "Rahul Singh", class: "10-C", attendance: 91, score: 79, status: "Good", trend: "stable" },
    { name: "Ananya Reddy", class: "10-B", attendance: 72, score: 58, status: "At Risk", trend: "down" },
  ];

  return (
    <section id="analytics-preview" className="py-8 sm:py-12 md:py-16 bg-background" data-testid="section-analytics-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-6" variant="secondary" size="sm">
              <Brain className="w-3 h-3 mr-1" />
              AI Analytics
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6"
          >
            Transform Education with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Analyze performance trends, identify at-risk students, and automate academic insights.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-white/50 text-sm font-medium">Trackademiq Dashboard</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-indigo-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
                  <span className="text-white/60 text-[10px] sm:text-sm"><span className="sm:hidden">Students</span><span className="hidden sm:inline">Total Students</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white">2,847</div>
                <div className="text-emerald-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="sm:hidden">+12%</span><span className="hidden sm:inline">+12% this month</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-white/60 text-[10px] sm:text-sm"><span className="sm:hidden">Attendance</span><span className="hidden sm:inline">Attendance Rate</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white">94.2%</div>
                <div className="text-emerald-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="sm:hidden">+2.1%</span><span className="hidden sm:inline">+2.1% vs last week</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-amber-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                  <span className="text-white/60 text-[10px] sm:text-sm"><span className="sm:hidden">At-Risk</span><span className="hidden sm:inline">At-Risk Students</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white">23</div>
                <div className="text-amber-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1"><span className="sm:hidden">Attention</span><span className="hidden sm:inline">Needs attention</span></div>
              </div>
              <div className="bg-gradient-to-br from-violet-500/20 to-violet-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-violet-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
                  <span className="text-white/60 text-[10px] sm:text-sm"><span className="sm:hidden">Avg Score</span><span className="hidden sm:inline">Avg. Score</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white">78.5%</div>
                <div className="text-emerald-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="sm:hidden">+5.3%</span><span className="hidden sm:inline">+5.3% improvement</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm sm:text-base">Student Performance Overview</h3>
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30" size="sm">Live Data</Badge>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/50 font-medium px-4 py-3">Student Name</th>
                      <th className="text-left text-white/50 font-medium px-4 py-3 hidden sm:table-cell">Class</th>
                      <th className="text-left text-white/50 font-medium px-4 py-3">Attendance</th>
                      <th className="text-left text-white/50 font-medium px-4 py-3">Avg. Score</th>
                      <th className="text-left text-white/50 font-medium px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index >= 3 ? 'hidden sm:table-row' : ''}`}>
                        <td className="px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-medium">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-white font-medium text-xs sm:text-sm">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 sm:py-3 text-white/70 hidden sm:table-cell">{student.class}</td>
                        <td className="px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-12 sm:w-24 h-1.5 sm:h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${student.attendance >= 90 ? 'bg-emerald-500' : student.attendance >= 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                            <span className="text-white/70 text-[10px] sm:text-xs">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 sm:py-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-white font-medium text-xs sm:text-sm">{student.score}%</span>
                            {student.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />}
                            {student.trend === 'down' && <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 rotate-180" />}
                          </div>
                        </td>
                        <td className="px-4 py-2 sm:py-3">
                          <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            student.status === 'Excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                            student.status === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 border border-indigo-200 dark:border-indigo-700">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">Insightful Analytics at a Glance</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface BenefitItem {
  title: string;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  points: string[];
}

function BenefitsTabs({ benefits }: { benefits: BenefitItem[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabColors = [
    { bg: "from-indigo-500 to-indigo-600", light: "indigo" },
    { bg: "from-emerald-500 to-emerald-600", light: "emerald" },
    { bg: "from-violet-500 to-violet-600", light: "violet" }
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
    >
      {/* Tab Navigation */}
      <motion.div 
        variants={fadeInUp}
        className="flex justify-center mb-6 sm:mb-8"
      >
        <div className="inline-flex p-1 bg-muted/50 rounded-full border border-border/50">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isActive = activeTab === index;
            return (
              <button
                key={benefit.title}
                onClick={() => setActiveTab(index)}
                className={`
                  relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? "text-white shadow-lg" 
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
                data-testid={`tab-benefit-${index}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tabColors[index].bg} rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{benefit.title}</span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Content Panel */}
      <motion.div variants={fadeInUp}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-border/50 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            >
              {/* Image Section */}
              <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                <img
                  src={benefits[activeTab].image}
                  alt={benefits[activeTab].imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent lg:bg-gradient-to-t lg:from-black/40 lg:via-transparent lg:to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tabColors[activeTab].bg} text-white shadow-lg`}>
                    {(() => {
                      const Icon = benefits[activeTab].icon;
                      return <Icon className="w-5 h-5" />;
                    })()}
                    <span className="font-semibold text-sm sm:text-base">{benefits[activeTab].title}</span>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <ul className="space-y-3 sm:space-y-4">
                  {benefits[activeTab].points.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: pointIndex * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${tabColors[activeTab].bg} flex items-center justify-center mt-0.5`}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-foreground leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation Dots */}
      <motion.div 
        variants={fadeInUp}
        className="flex justify-center gap-2 mt-6"
      >
        {benefits.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${activeTab === index 
                ? `w-8 bg-gradient-to-r ${tabColors[index].bg}` 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }
            `}
            aria-label={`Go to ${benefits[index].title}`}
            data-testid={`dot-benefit-${index}`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function GetStartedSection() {
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
    <section id="get-started" className="py-8 sm:py-12 md:py-16 bg-card" data-testid="section-get-started">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 Easy Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Clock className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
          >
            Get Started in 3 Easy Steps
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            We've made onboarding simple so you can focus on what matters most - education
          </motion.p>
        </motion.div>

        {/* Mobile: Horizontal timeline with arrows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sm:hidden flex items-center justify-center gap-2 mb-10"
        >
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  {step.number}
                </div>
                <span className="mt-2 text-xs font-semibold text-foreground text-center max-w-[80px] leading-tight">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 -mt-6" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Desktop: Full cards with descriptions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="hidden sm:grid sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16 md:mb-24"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="relative"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-xl md:text-2xl font-bold mb-4 sm:mb-6">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-indigo-300 to-violet-300 dark:from-indigo-800 dark:to-violet-800" />
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-10 sm:mb-16 md:mb-24">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-300 dark:to-indigo-700" />
          <div className="mx-4">
            <Badge variant="outline" size="sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Benefits for Everyone
            </Badge>
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-300 dark:to-indigo-700" />
        </div>

        {/* Benefits Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
          >
            Designed for All Stakeholders
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Every user gets tools tailored to their unique needs and responsibilities
          </motion.p>
        </motion.div>

        {/* Interactive Tabs for Benefits */}
        <BenefitsTabs benefits={benefits} />
      </div>
    </section>
  );
}

function DemoRequestSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    "Secure cloud hosting with ISO compliance",
    "Data privacy adherence per country regulations",
    "Dedicated onboarding and training",
    "Multi-tenant architecture for school chains",
    "Priority support and account management",
    "Custom integrations and API access"
  ];

  return (
    <section id="demo-request" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800" data-testid="section-demo-request">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Enterprise Solutions
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Why Switch to Trackademiq?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-4 px-2"
          >
            Experience a <span className="text-white font-semibold">modern, intuitive interface</span> designed for simplicity. 
            No more clunky systems - our platform is built for the way schools actually work.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
          >
            <span className="text-emerald-300 font-semibold">Migration? We handle everything.</span> Our team takes care of the complete data transfer - 
            your records, student info, fee history - all migrated seamlessly with zero downtime. You focus on education, we handle the tech.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 sm:mb-12 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-indigo-700 hover:bg-white/90 text-base px-8 font-semibold"
              data-testid="button-request-demo-cta"
            >
              Request Demo & Contract
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-indigo-700 border-white hover:bg-white/90"
              data-testid="button-contact-sales"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 pt-8 border-t border-white/20"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
              Try our free demo — <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">you'll never say no!</span>
            </p>
            <p className="text-white/60 text-sm">
              Custom pricing and contract terms available for all institution sizes
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Since we started using Trackademiq, our administrative work reduced significantly. The real-time analytics help us track student progress and take action before issues escalate.",
      author: "Dr. Meena Krishnan",
      role: "Principal",
      school: "CBSE School, Chennai",
      rating: 5
    },
    {
      quote: "Getting instant notifications about attendance and homework really helps me stay connected with my child's education. The fee payment through the app saves so much time.",
      author: "Anitha Rajan",
      role: "Parent",
      school: "Matriculation School",
      rating: 5
    },
    {
      quote: "Managing homework assignments and communicating with parents used to take hours. Now I can focus on what I do best - teaching my students.",
      author: "Karthik Sundaram",
      role: "Mathematics Teacher",
      school: "ICSE School, Chennai",
      rating: 5
    },
    {
      quote: "The parent engagement features have transformed how we communicate. We've seen a 40% increase in parent involvement since adopting Trackademiq.",
      author: "Lakshmi Venkatesh",
      role: "Vice Principal",
      school: "State Board School, Chennai",
      rating: 5
    },
    {
      quote: "Fee collection used to be our biggest headache. Now with automated reminders and online payments, we've reduced pending fees by 60%.",
      author: "Rajesh Kumar",
      role: "Administrator",
      school: "CBSE School, Tambaram",
      rating: 5
    },
    {
      quote: "As a working parent, I appreciate getting real-time updates on my daughter's attendance and performance. It gives me peace of mind.",
      author: "Priya Subramaniam",
      role: "Parent",
      school: "International School",
      rating: 5
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-8 sm:py-12 md:py-16 bg-background overflow-hidden" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Heart className="w-3 h-3 mr-1" />
              Trusted by Schools
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Schools like yours are already saving time and staying better connected with families
          </motion.p>
        </motion.div>

        {/* Infinite Rolling Carousel */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 sm:gap-6"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{ width: "fit-content" }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-4 sm:p-6 w-72 sm:w-80 md:w-96 flex-shrink-0 flex flex-col"
                  data-testid={`card-testimonial-${index}`}
                >
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-grow mb-4 sm:mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 flex items-center justify-center">
                      <span className="text-sm sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                        {testimonial.author.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.author}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.school}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
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
    <section id="contact" className="py-8 sm:py-12 md:py-16 bg-card" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
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
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
            >
              Request a Free Demo
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8"
            >
              Fill out the form and our team will schedule a personalized demo for your school.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Card className="p-4 sm:p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
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
                      className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0"
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
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Address</div>
                      <div className="text-muted-foreground">
                        G1 - CC Mithilla, Karnan Nagar<br />
                        Polichalur, Chennai 600074<br />
                        India
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      <a
                        href="tel:+919894836016"
                        className="text-muted-foreground hover:text-indigo-600 transition-colors"
                        data-testid="link-phone"
                      >
                        +91 9894836016
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <a
                        href="mailto:info@trackademiq.com"
                        className="text-muted-foreground hover:text-indigo-600 transition-colors"
                        data-testid="link-email"
                      >
                        info@trackademiq.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600">
                <h4 className="text-lg font-semibold text-white mb-3">Why Choose Trackademiq?</h4>
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
      { label: "Get Started", href: "#get-started" },
      { label: "Product Tour", href: "/product-tour" },
    ],
    company: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
      { label: "Request Demo", href: "#contact" },
    ],
    resources: [
      { label: "Testimonials", href: "#testimonials" },
      { label: "Support", href: "#contact" },
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
    <footer className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white py-8 sm:py-12 md:py-16" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Compact footer */}
        <div className="sm:hidden text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img 
              src={trackademiqLogo} 
              alt="Trackademiq Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-base font-bold text-white">Trackademiq</span>
          </div>
          <p className="text-white/60 text-xs mb-4">Polichalur, Chennai • +91 9894836016</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors"
                aria-label={social.label}
                data-testid={`link-social-mobile-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd.
          </div>
        </div>

        {/* Desktop: Full footer with links */}
        <div className="hidden sm:block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8 sm:mb-12">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <img 
                  src={trackademiqLogo} 
                  alt="Trackademiq Logo" 
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <span className="text-lg font-bold text-white">Trackademiq</span>
              </div>
              <p className="text-white/70 mb-4 sm:mb-6 max-w-sm text-sm sm:text-base">
                A simple, secure cloud platform that helps schools run better while keeping parents 
                informed about their child's education journey.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-xs sm:text-sm text-white/60">
                  <div className="font-medium text-white mb-1">Polichalur, Chennai</div>
                  <a href="tel:+919894836016" className="hover:text-indigo-400 transition-colors">
                    +91 9894836016
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-base">Product</h4>
              <ul className="space-y-1">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-white/70 hover:text-emerald-400 transition-colors text-left text-sm py-2 block w-full"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-emerald-400 transition-colors text-sm py-2 block"
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
              <h4 className="font-semibold text-white mb-4 text-base">Company</h4>
              <ul className="space-y-1">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-white/70 hover:text-emerald-400 transition-colors text-left text-sm py-2 block w-full"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-emerald-400 transition-colors text-sm py-2 block"
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
              <h4 className="font-semibold text-white mb-4 text-base">Resources</h4>
              <ul className="space-y-1">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 hover:text-emerald-400 transition-colors text-left text-sm py-2 block w-full"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/60 text-center md:text-left">
              © {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
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
        <AnalyticsPreviewSection />
        <FeaturesSection />
        <GetStartedSection />
        <DemoRequestSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
