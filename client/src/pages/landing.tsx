import { useState, useEffect, lazy, Suspense } from "react";
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
const ChatWidget = lazy(() => import("@/components/chat-widget").then(m => ({ default: m.ChatWidget })));
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
  Play,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Heart,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  LayoutGrid,
  Globe
} from "lucide-react";


import studentsImage from "@assets/generated_images/modern_indian_classroom_students.webp";
import schoolsImage from "@assets/generated_images/indian_school_principal_administrator.webp";
import teachersImage from "@assets/generated_images/indian_teacher_with_tablet_students.webp";
import parentsImage from "@assets/generated_images/indian_parent_helping_child_homework.webp";
import trackademiqLogo from "@/assets/trackademiq-logo.png";
import heroIllustration from "@/assets/hero-illustration.webp";

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
    { href: "/product-tour", label: "Product Tour", isRoute: true },
    { href: "/blog", label: "Blog", isRoute: true },
    { href: "/faq", label: "FAQ", isRoute: true },
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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2" data-testid="link-logo">
            <img 
              src={trackademiqLogo} 
              alt="Trackademiq Logo" 
              className="w-10 h-10 rounded-lg object-contain"
              width={40}
              height={40}
            />
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Trackademiq
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium transition-colors rounded-md text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-sm font-medium transition-colors rounded-md text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </button>
              )
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
            <Link href="/case-studies">
              <Button
                variant="outline"
                className="border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
                data-testid="button-case-studies-header"
              >
                Case Studies
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-3 min-h-[44px] min-w-[44px] rounded-md text-slate-700 dark:text-slate-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md animate-fade-in"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </button>
                )
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
                <Link href="/case-studies" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
                    data-testid="button-case-studies-mobile"
                  >
                    Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function HeroIllustration() {
  return (
    <div
      className="relative w-full lg:w-1/2 animate-fade-in-up animate-delay-300"
      data-testid="hero-illustration-module"
    >
      <div className="relative" data-testid="hero-visual">
        <img 
          src={heroIllustration} 
          alt="Students, teachers and school staff collaborating with AI analytics" 
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-2xl shadow-2xl"
          width={800}
          height={600}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-xl flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" aria-hidden="true" />
            <span className="text-slate-800 text-xs sm:text-sm font-semibold">Cloud Secured</span>
          </div>
          <div className="w-px h-4 bg-slate-300" aria-hidden="true" />
          <div className="flex items-center gap-1 sm:gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" aria-hidden="true" />
            <span className="text-slate-800 text-xs sm:text-sm font-semibold">ISO Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroContent({ scrollToContact }: { scrollToContact: () => void }) {
  return (
    <div
      className="max-w-xl w-full lg:w-1/2 text-center lg:text-left animate-fade-in-up"
    >
      <div className="flex justify-center lg:justify-start">
        <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 border-0 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 shadow-sm" size="sm">
          <Sparkles className="w-3 h-3 mr-1.5" />
          AI-Powered Education ERP
        </Badge>
      </div>

      <h1
        className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.15] mb-4 sm:mb-6"
        data-testid="text-hero-headline"
      >
        AI-Powered
        <br />
        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
          Education ERP
        </span>
      </h1>

      <p
        className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
        data-testid="text-hero-subtext"
      >
        AI that automates every school operation, catches problems early, and delivers insights that help your school improve — all in one platform.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
        <Button
          size="lg"
          onClick={scrollToContact}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-600 text-base px-6 sm:px-8 font-semibold shadow-lg shadow-indigo-500/25"
          data-testid="button-request-demo-hero"
        >
          Request Demo
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Link href="/product-tour">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold"
            data-testid="button-product-tour-hero"
          >
            <Play className="w-5 h-5 mr-2" />
            Product Tour
          </Button>
        </Link>
      </div>

      <div
        className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 mt-6 sm:mt-10 text-slate-500 dark:text-slate-400 text-xs sm:text-sm"
      >
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-500" aria-hidden="true" />
          <span>AI Automates Everything</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          <span>Catches Problems Early</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          <span>Schools Worldwide</span>
        </div>
      </div>
    </div>
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

function TrustBar() {
  const highlights = [
    { icon: Shield, label: "Cloud-Hosted & Secure", value: "Enterprise-grade security" },
    { icon: Clock, label: "Setup in Weeks", value: "Go live in weeks" },
    { icon: Globe, label: "Schools Worldwide", value: "Global platform" },
    { icon: Sparkles, label: "AI at the Core", value: "Automates everything" },
  ];

  return (
    <section className="py-4 sm:py-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 relative overflow-hidden" data-testid="section-trust-bar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 justify-center animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <item.icon className="w-5 h-5 text-white/80 flex-shrink-0" aria-hidden="true" />
              <div>
                <div className="text-white font-semibold text-xs sm:text-sm leading-tight">{item.label}</div>
                <div className="text-white/70 text-[11px] sm:text-xs leading-tight">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [viewMode, setViewMode] = useState<'modules' | 'roles'>('roles');
  const [activeTab, setActiveTab] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = [studentsImage, teachersImage, parentsImage, schoolsImage];
    let loaded = 0;
    imageUrls.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === imageUrls.length) setImagesLoaded(true);
      };
      img.src = src;
    });
  }, []);

  const allFeatures = [
    { icon: Brain, title: "AI Analytics", desc: "Auto-detect at-risk students and predict outcomes", color: "from-indigo-500 to-violet-500" },
    { icon: UserCheck, title: "Attendance", desc: "AI flags irregular patterns before they escalate", color: "from-emerald-500 to-teal-500" },
    { icon: TrendingUp, title: "Marks & Reports", desc: "Auto-generated report cards and grade analysis", color: "from-blue-500 to-cyan-500" },
    { icon: CreditCard, title: "Fee Management", desc: "Automated tracking, reminders, and collection insights", color: "from-amber-500 to-orange-500" },
    { icon: BookOpen, title: "Homework", desc: "AI tracks submissions and predicts delays", color: "from-rose-500 to-pink-500" },
    { icon: MessageSquare, title: "Messaging", desc: "Smart notifications that reach the right people", color: "from-purple-500 to-fuchsia-500" },
    { icon: Clock, title: "Leave Management", desc: "Automated workflows with shortage prediction", color: "from-cyan-500 to-sky-500" },
    { icon: Building2, title: "Multi-Tenant", desc: "AI compares performance across branches", color: "from-slate-500 to-gray-600" }
  ];
  
  const userTypes = [
    {
      icon: GraduationCap,
      title: "Students",
      image: studentsImage,
      imageAlt: "Students learning in modern classroom with technology",
      color: "from-indigo-500 to-indigo-600",
      glowColor: "group-hover:shadow-indigo-500/40",
      bgColor: "bg-gradient-to-br from-indigo-50/80 to-white/60 dark:from-indigo-950/40 dark:to-slate-900/60",
      borderColor: "border-indigo-200/60 dark:border-indigo-700/50",
      activeColor: "bg-indigo-500",
      features: [
        { icon: TrendingUp, title: "View Grades & Reports", desc: "Access marks, report cards, and performance analytics", aiLine: "AI predicts which topics need more attention" },
        { icon: BookOpen, title: "Homework & Assignments", desc: "Track assignments, submissions, and deadlines", aiLine: "Smart reminders before deadlines approach" },
        { icon: Clock, title: "Timetables & Exams", desc: "View class schedules and exam dates", aiLine: "Personalized study plans for each exam" },
        { icon: UserCheck, title: "Attendance History", desc: "Check attendance records and leave status", aiLine: "Attendance patterns linked to performance" }
      ]
    },
    {
      icon: Users,
      title: "Teachers",
      image: teachersImage,
      imageAlt: "Teacher using tablet for smart classroom management",
      color: "from-emerald-500 to-emerald-600",
      glowColor: "group-hover:shadow-emerald-500/40",
      bgColor: "bg-gradient-to-br from-emerald-50/80 to-white/60 dark:from-emerald-950/40 dark:to-slate-900/60",
      borderColor: "border-emerald-200/60 dark:border-emerald-700/50",
      activeColor: "bg-emerald-500",
      features: [
        { icon: UserCheck, title: "Smart Attendance", desc: "Biometric and app-based check-ins with one tap", aiLine: "Auto-detect attendance anomalies instantly" },
        { icon: TrendingUp, title: "Marks Entry & Reports", desc: "Enter grades and generate report cards automatically", aiLine: "AI suggests grade curves and insights" },
        { icon: MessageSquare, title: "Parent Communication", desc: "Send updates and announcements to parents", aiLine: "Auto-draft personalized parent messages" },
        { icon: BookOpen, title: "Homework Management", desc: "Create, assign, and track homework submissions", aiLine: "Predict submission delays before they happen" }
      ]
    },
    {
      icon: Heart,
      title: "Parents",
      image: parentsImage,
      imageAlt: "Parent engaged in child's education journey",
      color: "from-rose-500 to-rose-600",
      glowColor: "group-hover:shadow-rose-500/40",
      bgColor: "bg-gradient-to-br from-rose-50/80 to-white/60 dark:from-rose-950/40 dark:to-slate-900/60",
      borderColor: "border-rose-200/60 dark:border-rose-700/50",
      activeColor: "bg-rose-500",
      features: [
        { icon: UserCheck, title: "Real-Time Attendance", desc: "Instant notifications when child is marked absent", aiLine: "Early warning for attendance drops" },
        { icon: TrendingUp, title: "Academic Progress", desc: "View grades, rankings, and performance trends", aiLine: "Predict end-of-term grades accurately" },
        { icon: CreditCard, title: "Fee Payments", desc: "Pay fees online and track payment history", aiLine: "Smart payment reminders before due dates" },
        { icon: MessageSquare, title: "School Updates", desc: "Receive announcements and communicate with teachers", aiLine: "Priority alerts for critical updates" }
      ]
    },
    {
      icon: Shield,
      title: "Administrators",
      image: schoolsImage,
      imageAlt: "School administrator using analytics dashboard",
      color: "from-amber-500 to-amber-600",
      glowColor: "group-hover:shadow-amber-500/40",
      bgColor: "bg-gradient-to-br from-amber-50/80 to-white/60 dark:from-amber-950/40 dark:to-slate-900/60",
      borderColor: "border-amber-200/60 dark:border-amber-700/50",
      activeColor: "bg-amber-500",
      features: [
        { icon: Brain, title: "AI Analytics Dashboard", desc: "School-wide insights, trends, and at-risk identification", aiLine: "Predict student dropouts before they happen" },
        { icon: CreditCard, title: "Fee & Finance Management", desc: "Track collections, generate reports, manage dues", aiLine: "Forecast revenue and pending collections" },
        { icon: Building2, title: "Multi-School Management", desc: "Manage multiple branches from one dashboard", aiLine: "Compare branch performance automatically" },
        { icon: Clock, title: "Staff & Leave Management", desc: "Approve leaves, track attendance, manage staff", aiLine: "Predict staff shortages before they occur" }
      ]
    }
  ];

  return (
    <section id="features" className="py-6 sm:py-10 md:py-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-6 sm:mb-8 animate-fade-in-up"
        >
          <div>
            <Badge className="mb-3 sm:mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Education ERP
            </Badge>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4"
          >
            AI That Powers{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Every Part of Your School
            </span>
          </h2>
          <p
            className="text-sm sm:text-base text-indigo-600 dark:text-indigo-400 font-medium max-w-2xl mx-auto mb-5 sm:mb-6"
          >
            From attendance to fees, homework to report cards — AI automates the work, detects issues early, and gives every stakeholder the insights they need to act.
          </p>

          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('roles')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'roles'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                data-testid="toggle-by-role"
              >
                <Users className="w-4 h-4" />
                <span>By Role</span>
              </button>
              <button
                onClick={() => setViewMode('modules')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'modules'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                data-testid="toggle-by-module"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>By Module</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'modules' && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in"
          >
            {allFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  data-testid={`feature-module-${idx}`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-shadow`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'roles' && (
          <div
            className="animate-fade-in"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {userTypes.map((user, index) => (
                <button
                  key={user.title}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 animate-fade-in-up ${
                    activeTab === index
                      ? `bg-gradient-to-r ${user.color} text-white shadow-lg`
                      : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  data-testid={`tab-${user.title.toLowerCase()}`}
                >
                  <user.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{user.title}</span>
                </button>
              ))}
            </div>

          {(() => {
            const userType = userTypes[activeTab];
            const ActiveIcon = userType.icon;
            
            return (
              <div
                className="relative transition-opacity duration-150"
                data-testid={`panel-${userType.title.toLowerCase()}`}
              >
                <div className={`rounded-2xl sm:rounded-3xl overflow-hidden border ${userType.borderColor} ${userType.bgColor} backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50`}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:items-stretch">
                    <div className="lg:col-span-2 flex flex-col bg-white dark:bg-slate-50 min-h-[200px] lg:min-h-0">
                      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[140px] sm:min-h-[220px] relative">
                        {!imagesLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center m-4 sm:m-6 lg:m-8">
                            <div className="w-full max-w-md h-48 sm:h-64 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg" />
                          </div>
                        )}
                        <img
                          src={userType.image}
                          alt={userType.imageAlt}
                          loading="eager"
                          decoding="async"
                          width={800}
                          height={600}
                          className={`max-h-[240px] sm:max-h-[280px] w-full object-contain object-center transition-opacity duration-150 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                      </div>
                      <div className="px-4 sm:px-6 lg:px-6 pb-4 sm:pb-6 lg:pb-6">
                        <div className={`inline-flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-200/80 border border-slate-200 dark:border-slate-300 shadow-sm`}>
                          <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${userType.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                            <ActiveIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-lg font-bold text-slate-800 dark:text-slate-900">
                              For {userType.title}
                            </h3>
                            <p className="hidden sm:block text-sm text-slate-600 dark:text-slate-700">
                              AI-powered tools
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3 p-4 sm:p-8 lg:p-10">
                      <div className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 pb-4" style={{ width: 'max-content' }}>
                          {userType.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <div
                                key={feature.title}
                                className="group relative flex flex-col gap-2 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 w-[160px] flex-shrink-0"
                                data-testid={`feature-${userType.title.toLowerCase()}-${idx}-mobile`}
                              >
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${userType.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                                  <FeatureIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">{feature.title}</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{feature.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="hidden sm:grid sm:grid-cols-2 gap-4 sm:gap-5">
                        {userType.features.map((feature, idx) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div
                              key={feature.title}
                              className="group relative flex flex-col gap-3 p-4 sm:p-5 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:border-slate-300/80 dark:hover:border-slate-600/80 hover:-translate-y-1 transition-all duration-300 cursor-default"
                              data-testid={`feature-${userType.title.toLowerCase()}-${idx}`}
                            >
                              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${userType.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg ${userType.glowColor} transition-shadow duration-300`}>
                                <FeatureIcon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{feature.desc}</p>
                                <div className="flex items-center gap-1.5 text-xs">
                                  <Brain className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{feature.aiLine}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-200/50 dark:border-slate-700/50">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                            <Brain className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="font-medium">AI-Powered</span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="font-medium">Real-Time</span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="font-medium">Secure</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          </div>
        )}
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

  const aiInsights = [
    { role: "Principal", icon: Building2, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", insight: "School-wide attendance dropped 3.2% this week. Classes 10-B and 10-C need attention. 5 students flagged for intervention." },
    { role: "Class Teacher", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", insight: "Arjun Kumar: attendance below 80% for 3 weeks. Math scores declining. Recommend parent meeting and extra tutoring sessions." },
    { role: "Parent", icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", insight: "Your child Ananya scored 58% in the last assessment. Attendance: 72%. The teacher has shared study resources for improvement." },
  ];

  return (
    <section id="analytics-preview" className="py-6 sm:py-10 md:py-12 bg-background" data-testid="section-analytics-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-8 sm:mb-10 animate-fade-in-up"
        >
          <div>
            <Badge className="mb-6" variant="secondary" size="sm">
              <Brain className="w-3 h-3 mr-1" />
              AI Analytics Engine
            </Badge>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6"
          >
            See How AI{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Runs Your School
            </span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Every operation automated. Every problem caught early. Every stakeholder gets exactly the insights they need — powered by AI with built-in data privacy.
          </p>
        </div>

        <div
          className="animate-fade-in-up animate-delay-200"
        >
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30" size="sm" data-testid="badge-sample-data">Sample Dashboard Preview</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-indigo-500/20" data-testid="kpi-total-students">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
                  <span className="text-white/70 text-[11px] sm:text-sm"><span className="sm:hidden">Students</span><span className="hidden sm:inline">Total Students</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white">2,847</div>
                <div className="text-emerald-400 text-[11px] sm:text-xs mt-0.5 sm:mt-1 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="sm:hidden">+12%</span><span className="hidden sm:inline">+12% this month</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-white/70 text-[11px] sm:text-sm"><span className="sm:hidden">Attendance</span><span className="hidden sm:inline">Attendance Rate</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white">94.2%</div>
                <div className="text-emerald-400 text-[11px] sm:text-xs mt-0.5 sm:mt-1 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="sm:hidden">+2.1%</span><span className="hidden sm:inline">+2.1% vs last week</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-red-500/20" data-testid="kpi-at-risk">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span className="text-white/70 text-[11px] sm:text-sm"><span className="sm:hidden">At-Risk</span><span className="hidden sm:inline">AI Flagged At-Risk</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-red-400">5</div>
                <div className="text-red-400 text-[11px] sm:text-xs mt-0.5 sm:mt-1 flex items-center gap-1">
                  <Brain className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="sm:hidden">Auto-detected</span><span className="hidden sm:inline">Auto-detected by AI</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-500/20 to-violet-600/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-violet-500/20" data-testid="kpi-report-cards">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
                  <span className="text-white/70 text-[11px] sm:text-sm"><span className="sm:hidden">Reports</span><span className="hidden sm:inline">Report Cards</span></span>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-white">15min</div>
                <div className="text-violet-400 text-[11px] sm:text-xs mt-0.5 sm:mt-1 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="sm:hidden">AI automated</span><span className="hidden sm:inline">AI-automated generation</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm sm:text-base">Student Performance Overview</h3>
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30" size="sm">Live Data</Badge>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/70 font-medium px-4 py-3" scope="col">Student</th>
                        <th className="text-left text-white/70 font-medium px-4 py-3" scope="col">Attend.</th>
                        <th className="text-left text-white/70 font-medium px-4 py-3" scope="col">Score</th>
                        <th className="text-left text-white/70 font-medium px-4 py-3" scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index >= 3 ? 'hidden sm:table-row' : ''}`}>
                          <td className="px-4 py-2 sm:py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-[11px] font-medium">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-white font-medium text-xs sm:text-sm">{student.name}</div>
                                <div className="text-white/50 text-[11px]">Class {student.class}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 sm:py-3">
                            <span className={`text-xs sm:text-sm font-medium ${student.attendance >= 90 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {student.attendance}%
                            </span>
                          </td>
                          <td className="px-4 py-2 sm:py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-white font-medium text-xs sm:text-sm">{student.score}%</span>
                              {student.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />}
                              {student.trend === 'down' && <TrendingUp className="w-2.5 h-2.5 text-red-400 rotate-180" />}
                            </div>
                          </td>
                          <td className="px-4 py-2 sm:py-3">
                            <span className={`px-1.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium ${
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

              <div className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm sm:text-base">Role-Specific AI Insights</h3>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30" size="sm">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
                <div className="p-3 sm:p-4 space-y-3">
                  {aiInsights.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.role}
                        className={`p-3 rounded-lg border ${item.bg} animate-fade-in-up`}
                        style={{ animationDelay: `${0.3 + idx * 0.15}s` }}
                        data-testid={`ai-insight-${item.role.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                          <span className={`text-xs font-semibold ${item.color}`}>{item.role} View</span>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed">{item.insight}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/70">
                <Shield className="w-3 h-3" />
                <span>Data anonymized for AI processing</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/70">
                <Zap className="w-3 h-3" />
                <span>Rate-limited API calls</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/70">
                <Shield className="w-3 h-3" />
                <span>GDPR compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

  return (
    <section id="get-started" className="py-6 sm:py-10 md:py-12 bg-card" data-testid="section-get-started">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-6 sm:mb-10 animate-fade-in-up"
        >
          <div>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Clock className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
          >
            Get Started in 3 Easy Steps
          </h2>
          <p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            We've made onboarding simple so you can focus on what matters most - education
          </p>
        </div>

        <div
          className="sm:hidden flex items-center justify-center gap-2 mb-10 animate-fade-in-up"
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
        </div>

        <div
          className="hidden sm:grid sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
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
            </div>
          ))}
        </div>
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
    "AI automates attendance, fees, reports, and more",
    "At-risk students detected before problems escalate",
    "Role-specific dashboards for every stakeholder",
    "Multi-tenant architecture for school chains",
    "Secure cloud hosting with data privacy compliance",
    "Dedicated onboarding, training, and support"
  ];

  return (
    <section id="demo-request" className="py-6 sm:py-10 md:py-12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800" data-testid="section-demo-request">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center animate-fade-in-up"
        >
          <div>
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Enterprise Solutions
            </Badge>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Why Schools Choose Trackademiq
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-4 px-2"
          >
            One AI-powered platform that automates everything — attendance, fees, reports, communication. Every problem is caught early. Every decision is data-driven.
          </p>
          <p
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
          >
            <span className="text-emerald-300 font-semibold">Migration? We handle everything.</span> Our team takes care of the complete data transfer - 
            your records, student info, fee history - all migrated seamlessly with zero downtime. You focus on education, we handle the tech.
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 sm:mb-12 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-indigo-700 border-white text-base px-8 font-semibold"
              data-testid="button-request-demo-cta"
            >
              Request Demo & Contract
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <a href="tel:+919894836016">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-indigo-700 border-white"
                data-testid="button-contact-sales"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </a>
          </div>

          <div
            className="mt-10 pt-8 border-t border-white/20"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
              Try our free demo — <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">you'll never say no!</span>
            </p>
            <p className="text-white/70 text-sm">
              Custom pricing and contract terms available for all institution sizes
            </p>
          </div>
        </div>
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
      school: "K-12 Academy",
      rating: 5
    },
    {
      quote: "Getting instant notifications about attendance and homework really helps me stay connected with my child's education. The fee payment through the app saves so much time.",
      author: "Anitha Rajan",
      role: "Parent",
      school: "International School",
      rating: 5
    },
    {
      quote: "Managing homework assignments and communicating with parents used to take hours. Now I can focus on what I do best - teaching my students.",
      author: "Karthik Sundaram",
      role: "Mathematics Teacher",
      school: "STEM Academy",
      rating: 5
    },
    {
      quote: "The parent engagement features have transformed how we communicate. We've seen a 40% increase in parent involvement since adopting Trackademiq.",
      author: "Lakshmi Venkatesh",
      role: "Vice Principal",
      school: "Secondary School",
      rating: 5
    },
    {
      quote: "Fee collection used to be our biggest headache. Now with automated reminders and online payments, we've reduced pending fees by 60%.",
      author: "Rajesh Kumar",
      role: "Administrator",
      school: "Group of Schools",
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
    <section id="testimonials" className="py-6 sm:py-10 md:py-12 bg-background overflow-hidden" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-6 sm:mb-10 animate-fade-in-up"
        >
          <div>
            <Badge className="mb-4" variant="secondary" size="sm">
              <Heart className="w-3 h-3 mr-1" />
              Trusted by Schools
            </Badge>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
          >
            What Our Users Say
          </h2>
          <p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2"
          >
            Schools like yours are already saving time and staying better connected with families
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden">
            <div
              className="flex gap-4 sm:gap-6 animate-scroll-left"
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
            </div>
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
    <section id="contact" className="py-6 sm:py-10 md:py-12 bg-card" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          <div
            className="lg:col-span-3 animate-fade-in-up"
          >
            <div>
              <Badge className="mb-4" variant="secondary" size="sm">
                <Phone className="w-3 h-3 mr-1" />
                Get In Touch
              </Badge>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
            >
              Request a Free Demo
            </h2>
            <p
              className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8"
            >
              Fill out the form and our team will schedule a personalized demo for your school.
            </p>

            <div>
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
                              aria-required="true"
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
                                aria-required="true"
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
                                aria-required="true"
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
            </div>
          </div>

          <div
            className="lg:col-span-2 animate-fade-in-up animate-delay-200"
          >
            <div className="space-y-8">
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
                <h3 className="text-lg font-semibold text-white mb-3">Why Choose Trackademiq?</h3>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickAnswersSection() {
  const quickAnswers = [
    {
      question: "What is School ERP Software?",
      answer: "School ERP (Enterprise Resource Planning) software is a comprehensive platform that automates and integrates all administrative, academic, and operational processes in schools including student management, attendance, fees, exams, and communication."
    },
    {
      question: "How does AI improve school management?",
      answer: "AI automates every repetitive task in school management — from attendance tracking and report generation to fee collection and parent communication. More importantly, it catches problems early: flagging at-risk students, detecting attendance anomalies, predicting fee defaults, and surfacing insights that help schools continuously improve."
    },
    {
      question: "Why do schools need automation?",
      answer: "Schools that don't automate waste countless hours on manual tasks while missing critical signals. AI-powered automation handles attendance, report cards, fee tracking, and communication automatically — but more importantly, it catches learning gaps, attendance drops, and financial issues early enough to act on them."
    },
    {
      question: "How much does Trackademiq cost?",
      answer: "Trackademiq offers custom pricing packages with competitive rates tailored to your school's needs. All packages include full features, training, and support. Most schools achieve ROI within 6-12 months through efficiency gains."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/50" data-testid="section-quick-answers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-8 animate-fade-in-up"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3"
          >
            Quick Answers About{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Trackademiq
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Common questions answered • <Link href="/faq" className="text-indigo-600 dark:text-indigo-400 hover:underline">View all FAQs</Link> • <Link href="/what-is-trackademiq" className="text-indigo-600 dark:text-indigo-400 hover:underline">Learn more</Link>
          </p>
        </div>

        <div
          className="grid sm:grid-cols-2 gap-6"
        >
          {quickAnswers.map((qa, idx) => (
            <div
              key={qa.question}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{qa.question}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{qa.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "ERP Platform", href: "/erp" },
      { label: "Product Tour", href: "/product-tour" },
      { label: "Case Studies", href: "/case-studies" },
    ],
    company: [
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/what-is-trackademiq" },
      { label: "Contact", href: "#contact" },
      { label: "FAQ", href: "/faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white py-8 sm:py-12 md:py-16" role="contentinfo" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:hidden text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src={trackademiqLogo} 
              alt="Trackademiq Logo" 
              className="w-9 h-9 rounded-lg object-contain"
              width={36}
              height={36}
              loading="lazy"
            />
            <span className="text-lg font-bold text-white">Trackademiq</span>
          </div>
          
          <p className="text-white/70 text-xs mb-4">
            Polichalur, Chennai • <a href="mailto:info@trackademiq.com" className="hover:text-emerald-400 transition-colors">info@trackademiq.com</a>
          </p>
          
          <div className="flex items-center justify-center gap-3 mb-4 text-xs text-white/70 flex-wrap">
            <Link href="/what-is-trackademiq" className="hover:text-emerald-400 transition-colors" data-testid="link-mobile-what-is">About</Link>
            <span className="text-white/30">|</span>
            <Link href="/blog" className="hover:text-emerald-400 transition-colors" data-testid="link-mobile-blog">Blog</Link>
            <span className="text-white/30">|</span>
            <Link href="/faq" className="hover:text-emerald-400 transition-colors" data-testid="link-mobile-faq">FAQ</Link>
            <span className="text-white/30">|</span>
            <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors" data-testid="link-mobile-privacy">Privacy</Link>
            <span className="text-white/30">|</span>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors" data-testid="link-mobile-terms">Terms</Link>
          </div>
          
          <div className="text-xs text-white/70">
            © {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd.
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 sm:mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <img 
                  src={trackademiqLogo} 
                  alt="Trackademiq Logo" 
                  className="w-10 h-10 rounded-lg object-contain"
                  width={40}
                  height={40}
                  loading="lazy"
                />
                <span className="text-lg font-bold text-white">Trackademiq</span>
              </div>
              <p className="text-white/70 mb-4 sm:mb-6 max-w-sm text-sm sm:text-base">
                AI-powered Education ERP that automates school operations, catches problems early, and keeps every stakeholder informed and empowered.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-xs sm:text-sm text-white/70">
                  <div className="font-medium text-white mb-1">Polichalur, Chennai</div>
                  <a href="tel:+919894836016" className="hover:text-indigo-400 transition-colors">
                    +91 9894836016
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-base">Product</h3>
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
              <h3 className="font-semibold text-white mb-4 text-base">Company</h3>
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
              <h3 className="font-semibold text-white mb-4 text-base">Legal</h3>
              <ul className="space-y-1">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-emerald-400 transition-colors text-sm py-2 block"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/70 text-center md:text-left">
              © {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <a href="mailto:info@trackademiq.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors" data-testid="link-footer-email">
                <Mail className="w-4 h-4" />
                info@trackademiq.com
              </a>
              <span className="text-white/30">|</span>
              <a href="tel:+919894836016" className="flex items-center gap-2 hover:text-emerald-400 transition-colors" data-testid="link-footer-phone">
                <Phone className="w-4 h-4" />
                +91 9894836016
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Trackademiq AI-Powered School ERP",
      "description": "AI-powered Education ERP that automates every school operation — attendance, fees, reports, homework, communication — and catches problems early through predictive analytics. Role-specific insights for principals, teachers, and parents. Built for schools worldwide.",
      "brand": {
        "@type": "Brand",
        "name": "Trackademiq"
      },
      "category": "Education Management Software",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "School Administrator, Principal, Teacher"
      },
      "featureList": [
        "AI-powered attendance analytics with at-risk student detection",
        "AI-automated report generation and grade analysis",
        "AI insights engine with role-specific recommendations",
        "Real-time notifications and parent-teacher messaging",
        "Multi-school platform management",
        "Automated fee tracking and payment gateway integration",
        "Data anonymization for AI processing",
        "Role-based dashboards for every stakeholder"
      ],
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web, iOS, Android"
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Trackademiq",
      "alternateName": "Trackademiq School ERP",
      "description": "AI-powered Education ERP that automates school operations, catches problems early with predictive analytics, and delivers role-specific insights for every stakeholder. Serving schools worldwide.",
      "url": "https://www.trackademiq.com",
      "logo": "https://www.trackademiq.com/logo.png",
      "foundingDate": "2020",
      "knowsAbout": [
        "School ERP Software",
        "Education Analytics",
        "AI in Education",
        "Student Performance Prediction",
        "School Automation",
        "Educational Technology"
      ],
      "areaServed": "Worldwide",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "info@trackademiq.com",
        "telephone": "+91 9894836016",
        "availableLanguage": ["English"],
        "areaServed": "Worldwide"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "G1 - CC Mithilla, Karnan Nagar, Polichalur",
        "addressLocality": "Chennai",
        "postalCode": "600074",
        "addressCountry": "IN"
      }
    };

    const existingProduct = document.querySelector('script[data-schema="product"]');
    const existingOrg = document.querySelector('script[data-schema="organization"]');
    if (existingProduct) existingProduct.remove();
    if (existingOrg) existingOrg.remove();

    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.setAttribute('data-schema', 'product');
    productScript.textContent = JSON.stringify(productSchema);
    document.head.appendChild(productScript);

    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.setAttribute('data-schema', 'organization');
    orgScript.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    return () => {
      const productEl = document.querySelector('script[data-schema="product"]');
      const orgEl = document.querySelector('script[data-schema="organization"]');
      if (productEl) productEl.remove();
      if (orgEl) orgEl.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
        <Header />
        <main id="main" aria-label="Main content">
          <HeroSection />
          <TrustBar />
          <FeaturesSection />
          <AnalyticsPreviewSection />
          <GetStartedSection />
          <DemoRequestSection />
          <TestimonialsSection />
          <ContactSection />
          <QuickAnswersSection />
        </main>
        <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
