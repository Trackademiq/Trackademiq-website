import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  ChevronDown,
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
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Heart,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  Globe,
  Play
} from "lucide-react";

import studentsImage from "@assets/generated_images/modern_indian_classroom_students.webp";
import schoolsImage from "@assets/generated_images/indian_school_principal_administrator.webp";
import teachersImage from "@assets/generated_images/indian_teacher_with_tablet_students.webp";
import parentsImage from "@assets/generated_images/indian_parent_helping_child_homework.webp";
import trackademiqLogo from "@/assets/trackademiq-logo.png";
import heroIllustration from "@/assets/hero-illustration.webp";

function V2Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#v2-features", label: "Features" },
    { href: "/product-tour", label: "Product Tour", isRoute: true },
    { href: "/blog", label: "Blog", isRoute: true },
    { href: "/faq", label: "FAQ", isRoute: true },
    { href: "#v2-contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08080d]/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
      data-testid="v2-header"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/v2" className="flex items-center gap-2.5" data-testid="v2-link-logo">
            <img src={trackademiqLogo} alt="Trackademiq Logo" className="w-9 h-9 rounded-md object-contain" width={36} height={36} />
            <span className="text-lg font-bold text-white">Trackademiq</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors" data-testid={`v2-nav-${link.label.toLowerCase().replace(" ", "-")}`}>
                  {link.label}
                </Link>
              ) : (
                <button key={link.href} onClick={() => scrollToSection(link.href)} className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors" data-testid={`v2-nav-${link.label.toLowerCase().replace(" ", "-")}`}>
                  {link.label}
                </button>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => scrollToSection("#v2-contact")} className="text-sm font-medium text-white/60 hover:text-white transition-colors px-4 py-2" data-testid="v2-btn-demo-header">
              Request Demo
            </button>
            <Link href="/case-studies">
              <Button size="sm" className="bg-white text-black border-white font-medium" data-testid="v2-btn-cases-header">
                Case Studies
              </Button>
            </Link>
          </div>

          <button className="lg:hidden p-2 text-white/80" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} data-testid="v2-mobile-toggle">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link key={link.href} href={link.href} className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors" data-testid={`v2-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}>
                    {link.label}
                  </Link>
                ) : (
                  <button key={link.href} onClick={() => scrollToSection(link.href)} className="px-4 py-3 text-left text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors" data-testid={`v2-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}>
                    {link.label}
                  </button>
                )
              )}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button onClick={() => scrollToSection("#v2-contact")} className="w-full bg-white text-black border-white" data-testid="v2-mobile-demo-btn">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function V2Hero() {
  const scrollToContact = () => {
    const el = document.querySelector("#v2-contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-[#08080d] overflow-hidden" data-testid="v2-hero">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="max-w-2xl w-full lg:w-3/5 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Education ERP
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6" data-testid="v2-headline">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Education ERP
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed" data-testid="v2-subtext">
              AI that automates every school operation, catches problems early, and delivers insights that help your school improve — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={scrollToContact} className="bg-white text-black border-white text-base px-8 font-semibold" data-testid="v2-hero-demo-btn">
                Request Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/product-tour">
                <Button size="lg" variant="outline" className="border-white/20 text-white font-semibold bg-white/5 backdrop-blur-sm" data-testid="v2-hero-tour-btn">
                  <Play className="w-5 h-5 mr-2" />
                  Product Tour
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI Automates Everything</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Catches Problems Early</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-violet-400" />
                <span>Schools Worldwide</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 animate-fade-in-up animate-delay-300" data-testid="v2-hero-visual">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              <img
                src={heroIllustration}
                alt="Students, teachers and school staff collaborating with AI analytics"
                className="relative w-full max-w-md mx-auto rounded-2xl border border-white/10"
                width={800}
                height={600}
                loading="eager"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#12121a] rounded-full px-5 py-2.5 border border-white/10 flex items-center gap-4 shadow-2xl">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/70 text-xs font-medium">Cloud Secured</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/70 text-xs font-medium">ISO Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2TrustBar() {
  const highlights = [
    { icon: Shield, label: "Cloud-Hosted & Secure", value: "Enterprise-grade security" },
    { icon: Clock, label: "Setup in Weeks", value: "Go live in weeks" },
    { icon: Globe, label: "Schools Worldwide", value: "Global platform" },
    { icon: Sparkles, label: "AI at the Core", value: "Automates everything" },
  ];

  return (
    <section className="py-6 bg-[#0d0d14] border-y border-white/5" data-testid="v2-trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center">
              <item.icon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <div>
                <div className="text-white/80 font-medium text-xs sm:text-sm">{item.label}</div>
                <div className="text-white/40 text-[11px] sm:text-xs">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function V2AnalyticsPreview() {
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
    <section className="py-20 sm:py-28 bg-[#08080d]" data-testid="v2-analytics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
            <Brain className="w-3.5 h-3.5" />
            AI Analytics Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            See How AI{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Runs Your School</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every operation automated. Every problem caught early. Every stakeholder gets exactly the insights they need — powered by AI with built-in data privacy.
          </p>
        </div>

        <div className="bg-[#0e0e16] rounded-2xl border border-white/5 p-4 sm:p-6 lg:p-8 animate-fade-in-up animate-delay-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs text-indigo-300/70 border border-indigo-500/20 bg-indigo-500/10 rounded-full px-3 py-1" data-testid="v2-badge-sample">Sample Dashboard Preview</div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="rounded-xl p-3 sm:p-4 border border-indigo-500/20 bg-indigo-500/5" data-testid="v2-kpi-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-white/50 text-[11px] sm:text-xs"><span className="sm:hidden">Students</span><span className="hidden sm:inline">Total Students</span></span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-white">2,847</div>
              <div className="text-indigo-400 text-[11px] sm:text-xs mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span className="sm:hidden">+12%</span><span className="hidden sm:inline">+12% this month</span>
              </div>
            </div>
            <div className="rounded-xl p-3 sm:p-4 border border-emerald-500/20 bg-emerald-500/5" data-testid="v2-kpi-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white/50 text-[11px] sm:text-xs"><span className="sm:hidden">Attendance</span><span className="hidden sm:inline">Attendance Rate</span></span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-white">94.2%</div>
              <div className="text-emerald-400 text-[11px] sm:text-xs mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span className="sm:hidden">+2.1%</span><span className="hidden sm:inline">+2.1% vs last week</span>
              </div>
            </div>
            <div className="rounded-xl p-3 sm:p-4 border border-red-500/20 bg-red-500/5" data-testid="v2-kpi-2">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span className="text-white/50 text-[11px] sm:text-xs"><span className="sm:hidden">At-Risk</span><span className="hidden sm:inline">AI Flagged At-Risk</span></span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-red-400">5</div>
              <div className="text-red-400 text-[11px] sm:text-xs mt-1 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                <span className="sm:hidden">Auto-detected</span><span className="hidden sm:inline">Auto-detected by AI</span>
              </div>
            </div>
            <div className="rounded-xl p-3 sm:p-4 border border-violet-500/20 bg-violet-500/5" data-testid="v2-kpi-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-white/50 text-[11px] sm:text-xs"><span className="sm:hidden">Reports</span><span className="hidden sm:inline">Report Cards</span></span>
              </div>
              <div className="text-xl sm:text-3xl font-bold text-white">15min</div>
              <div className="text-violet-400 text-[11px] sm:text-xs mt-1 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span className="sm:hidden">AI automated</span><span className="hidden sm:inline">AI-automated generation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/[0.03] rounded-xl border border-white/5 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm sm:text-base">Student Performance Overview</h3>
                <span className="text-[11px] text-indigo-300/70 border border-indigo-500/20 bg-indigo-500/10 rounded-full px-2.5 py-0.5">Live Data</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-white/50 font-medium px-4 py-3 text-xs" scope="col">Student</th>
                      <th className="text-left text-white/50 font-medium px-4 py-3 text-xs" scope="col">Attend.</th>
                      <th className="text-left text-white/50 font-medium px-4 py-3 text-xs" scope="col">Score</th>
                      <th className="text-left text-white/50 font-medium px-4 py-3 text-xs" scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={i} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i >= 3 ? 'hidden sm:table-row' : ''}`}>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-medium">
                              {s.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-white font-medium text-xs sm:text-sm">{s.name}</div>
                              <div className="text-white/30 text-[11px]">Class {s.class}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`text-xs sm:text-sm font-medium ${s.attendance >= 90 ? 'text-emerald-400' : 'text-red-400'}`}>{s.attendance}%</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1">
                            <span className="text-white font-medium text-xs sm:text-sm">{s.score}%</span>
                            {s.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />}
                            {s.trend === 'down' && <TrendingUp className="w-2.5 h-2.5 text-red-400 rotate-180" />}
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            s.status === 'Excellent' ? 'bg-emerald-500/15 text-emerald-400' :
                            s.status === 'Good' ? 'bg-blue-500/15 text-blue-400' :
                            'bg-red-500/15 text-red-400'
                          }`}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl border border-white/5 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm sm:text-base">Role-Specific AI Insights</h3>
                <span className="text-[11px] text-emerald-300/70 border border-emerald-500/20 bg-emerald-500/10 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <Brain className="w-3 h-3" /> AI Generated
                </span>
              </div>
              <div className="p-3 sm:p-4 space-y-3">
                {aiInsights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.role} className={`p-3 rounded-lg border ${item.bg}`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <span className={`text-sm font-semibold ${item.color}`}>{item.role}</span>
                      </div>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{item.insight}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-white/40">
            <div className="flex items-center gap-1.5"><Shield className="w-3 h-3" /><span>Data anonymized for AI processing</span></div>
            <div className="flex items-center gap-1.5"><Zap className="w-3 h-3" /><span>Rate-limited API calls</span></div>
            <div className="flex items-center gap-1.5"><Shield className="w-3 h-3" /><span>GDPR compliant</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2Features() {
  const [activeTab, setActiveTab] = useState(0);

  const allFeatures = [
    { icon: Brain, title: "AI Analytics", desc: "Auto-detect at-risk students and predict outcomes", color: "from-indigo-500 to-violet-500" },
    { icon: UserCheck, title: "Attendance", desc: "AI flags irregular patterns before they escalate", color: "from-emerald-500 to-teal-500" },
    { icon: TrendingUp, title: "Marks & Reports", desc: "Auto-generated report cards and grade analysis", color: "from-blue-500 to-cyan-500" },
    { icon: CreditCard, title: "Fee Management", desc: "Automated tracking, reminders, and collection insights", color: "from-amber-500 to-orange-500" },
    { icon: BookOpen, title: "Homework", desc: "AI tracks submissions and predicts delays", color: "from-rose-500 to-pink-500" },
    { icon: MessageSquare, title: "Messaging", desc: "Smart notifications that reach the right people", color: "from-purple-500 to-fuchsia-500" },
    { icon: Clock, title: "Leave Management", desc: "Automated workflows with shortage prediction", color: "from-cyan-500 to-sky-500" },
    { icon: Building2, title: "Multi-Tenant", desc: "AI compares performance across branches", color: "from-slate-400 to-gray-500" },
  ];

  const userTypes = [
    {
      icon: GraduationCap, title: "Students", image: studentsImage, imageAlt: "Students learning in modern classroom with technology",
      color: "from-indigo-500 to-indigo-600",
      features: [
        { icon: TrendingUp, title: "View Grades & Reports", desc: "Access marks, report cards, and performance analytics", aiLine: "AI predicts which topics need more attention" },
        { icon: BookOpen, title: "Homework & Assignments", desc: "Track assignments, submissions, and deadlines", aiLine: "Smart reminders before deadlines approach" },
        { icon: Clock, title: "Timetables & Exams", desc: "View class schedules and exam dates", aiLine: "Personalized study plans for each exam" },
        { icon: UserCheck, title: "Attendance History", desc: "Check attendance records and leave status", aiLine: "Attendance patterns linked to performance" },
      ],
    },
    {
      icon: Users, title: "Teachers", image: teachersImage, imageAlt: "Teacher using tablet for smart classroom management",
      color: "from-emerald-500 to-emerald-600",
      features: [
        { icon: UserCheck, title: "Smart Attendance", desc: "Biometric and app-based check-ins with one tap", aiLine: "Auto-detect attendance anomalies instantly" },
        { icon: TrendingUp, title: "Marks Entry & Reports", desc: "Enter grades and generate report cards automatically", aiLine: "AI suggests grade curves and insights" },
        { icon: MessageSquare, title: "Parent Communication", desc: "Send updates and announcements to parents", aiLine: "Auto-draft personalized parent messages" },
        { icon: BookOpen, title: "Homework Management", desc: "Create, assign, and track homework submissions", aiLine: "Predict submission delays before they happen" },
      ],
    },
    {
      icon: Heart, title: "Parents", image: parentsImage, imageAlt: "Parent engaged in child's education journey",
      color: "from-rose-500 to-rose-600",
      features: [
        { icon: UserCheck, title: "Real-Time Attendance", desc: "Instant notifications when child is marked absent", aiLine: "Early warning for attendance drops" },
        { icon: TrendingUp, title: "Academic Progress", desc: "View grades, rankings, and performance trends", aiLine: "Predict end-of-term grades accurately" },
        { icon: CreditCard, title: "Fee Payments", desc: "Pay fees online and track payment history", aiLine: "Smart payment reminders before due dates" },
        { icon: MessageSquare, title: "School Updates", desc: "Receive announcements and communicate with teachers", aiLine: "Priority alerts for critical updates" },
      ],
    },
    {
      icon: Shield, title: "Administrators", image: schoolsImage, imageAlt: "School administrator using analytics dashboard",
      color: "from-amber-500 to-amber-600",
      features: [
        { icon: Brain, title: "AI Analytics Dashboard", desc: "School-wide insights, trends, and at-risk identification", aiLine: "Predict student dropouts before they happen" },
        { icon: CreditCard, title: "Fee & Finance Management", desc: "Track collections, generate reports, manage dues", aiLine: "Forecast revenue and pending collections" },
        { icon: Building2, title: "Multi-School Management", desc: "Manage multiple branches from one dashboard", aiLine: "Compare branch performance automatically" },
        { icon: Clock, title: "Staff & Leave Management", desc: "Approve leaves, track attendance, manage staff", aiLine: "Predict staff shortages before they occur" },
      ],
    },
  ];

  const currentUser = userTypes[activeTab];

  return (
    <section id="v2-features" className="py-20 sm:py-28 bg-[#0b0b12]" data-testid="v2-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Education ERP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            AI That Powers{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Every Part of Your School</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            From attendance to fees, homework to report cards — AI automates the work, detects issues early, and gives every stakeholder the insights they need to act.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16 animate-fade-in-up">
          {allFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="group p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default" data-testid={`v2-module-${idx}`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-white/40 line-clamp-2">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="animate-fade-in-up">
          <h3 className="text-center text-xl sm:text-2xl font-bold text-white mb-8">Personalized for Every Role</h3>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {userTypes.map((user, index) => (
              <button
                key={user.title}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? `bg-gradient-to-r ${user.color} text-white`
                    : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70"
                }`}
                data-testid={`v2-tab-${user.title.toLowerCase()}`}
              >
                <user.icon className="w-4 h-4" />
                <span>{user.title}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden animate-fade-in" key={activeTab} data-testid={`v2-panel-${currentUser.title.toLowerCase()}`}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 relative h-48 sm:h-64 lg:h-auto lg:min-h-[320px]">
                <img src={currentUser.image} alt={currentUser.imageAlt} loading="lazy" width={800} height={600} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent lg:bg-gradient-to-t lg:from-black/70 lg:via-black/40 lg:to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentUser.color} flex items-center justify-center`}>
                      <currentUser.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">For {currentUser.title}</h4>
                      <p className="text-xs text-white/70">AI-powered tools</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-5 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentUser.features.map((feature, idx) => {
                    const FIcon = feature.icon;
                    return (
                      <div key={feature.title} className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300" data-testid={`v2-feature-${currentUser.title.toLowerCase()}-${idx}`}>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentUser.color} flex items-center justify-center mb-3`}>
                          <FIcon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-sm text-white/40 mb-2">{feature.desc}</p>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Brain className="w-3 h-3 text-indigo-400" />
                          <span className="text-indigo-300/80">{feature.aiLine}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/40">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300/70 border border-indigo-500/20">
                      <Brain className="w-3 h-3" /><span className="font-medium">AI-Powered</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300/70 border border-amber-500/20">
                      <Zap className="w-3 h-3" /><span className="font-medium">Real-Time</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300/70 border border-emerald-500/20">
                      <Shield className="w-3 h-3" /><span className="font-medium">Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2GetStarted() {
  const steps = [
    { number: "01", title: "Register Your School", description: "Sign up with your school details and get your dedicated dashboard within 24 hours." },
    { number: "02", title: "Onboard Your Team", description: "Add teachers, staff, students, and parents. Bulk upload available for quick setup." },
    { number: "03", title: "Start Managing", description: "Access all features immediately. Our support team helps you every step of the way." },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#08080d]" data-testid="v2-get-started">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-6">
            <Clock className="w-3.5 h-3.5" />
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Get Started in 3 Easy Steps</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            We've made onboarding simple so you can focus on what matters most — education
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-2xl font-bold mb-6">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-indigo-500/40 to-violet-500/40" />
              )}
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-white/40 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function V2DemoRequest() {
  const scrollToContact = () => {
    const el = document.querySelector("#v2-contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    "AI automates attendance, fees, reports, and more",
    "At-risk students detected before problems escalate",
    "Role-specific dashboards for every stakeholder",
    "Multi-tenant architecture for school chains",
    "Secure cloud hosting with data privacy compliance",
    "Dedicated onboarding, training, and support",
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 relative overflow-hidden" data-testid="v2-demo-request">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Enterprise Solutions
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Why Schools Choose Trackademiq</h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-4">
          One AI-powered platform that automates everything — attendance, fees, reports, communication. Every problem is caught early. Every decision is data-driven.
        </p>
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12">
          <span className="text-emerald-300 font-semibold">Migration? We handle everything.</span> Our team takes care of the complete data transfer — your records, student info, fee history — all migrated seamlessly with zero downtime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
              <span className="text-white text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={scrollToContact} className="bg-white text-indigo-700 border-white text-base px-8 font-semibold" data-testid="v2-btn-request-demo-cta">
            Request Demo & Contract
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <a href="tel:+919894836016">
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur-sm" data-testid="v2-btn-call">
              <Phone className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            Try our free demo — <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">you'll never say no!</span>
          </p>
          <p className="text-white/50 text-sm">Custom pricing and contract terms available for all institution sizes</p>
        </div>
      </div>
    </section>
  );
}

function V2Testimonials() {
  const testimonials = [
    { quote: "Since we started using Trackademiq, our administrative work reduced significantly. The real-time analytics help us track student progress and take action before issues escalate.", author: "Dr. Meena Krishnan", role: "Principal", school: "K-12 Academy", rating: 5 },
    { quote: "Getting instant notifications about attendance and homework really helps me stay connected with my child's education. The fee payment through the app saves so much time.", author: "Anitha Rajan", role: "Parent", school: "International School", rating: 5 },
    { quote: "Managing homework assignments and communicating with parents used to take hours. Now I can focus on what I do best - teaching my students.", author: "Karthik Sundaram", role: "Mathematics Teacher", school: "STEM Academy", rating: 5 },
    { quote: "The parent engagement features have transformed how we communicate. We've seen a 40% increase in parent involvement since adopting Trackademiq.", author: "Lakshmi Venkatesh", role: "Vice Principal", school: "Secondary School", rating: 5 },
    { quote: "Fee collection used to be our biggest headache. Now with automated reminders and online payments, we've reduced pending fees by 60%.", author: "Rajesh Kumar", role: "Administrator", school: "Group of Schools", rating: 5 },
    { quote: "As a working parent, I appreciate getting real-time updates on my daughter's attendance and performance. It gives me peace of mind.", author: "Priya Subramaniam", role: "Parent", school: "International School", rating: 5 },
  ];

  const duplicated = [...testimonials, ...testimonials];

  return (
    <section className="py-20 sm:py-28 bg-[#0b0b12] overflow-hidden" data-testid="v2-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-6">
            <Heart className="w-3.5 h-3.5" />
            Trusted by Schools
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Schools like yours are already saving time and staying better connected with families
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#0b0b12] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#0b0b12] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="flex gap-4 sm:gap-6 animate-scroll-left" style={{ width: "fit-content" }}>
              {duplicated.map((t, index) => (
                <div key={index} className="p-5 sm:p-6 w-72 sm:w-80 md:w-96 flex-shrink-0 flex flex-col rounded-xl bg-white/[0.03] border border-white/5" data-testid={`v2-testimonial-${index}`}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm sm:text-base text-white/50 leading-relaxed flex-grow mb-5">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 flex items-center justify-center">
                      <span className="text-sm font-semibold text-indigo-300">{t.author.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.author}</div>
                      <div className="text-xs text-white/40">{t.role}, {t.school}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2Contact() {
  const { toast } = useToast();
  const form = useForm<InsertDemoRequest>({
    resolver: zodResolver(insertDemoRequestSchema),
    defaultValues: { schoolName: "", email: "", phone: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      const response = await apiRequest("POST", "/api/demo-requests", data);
      return response;
    },
    onSuccess: () => {
      toast({ title: "Demo Request Submitted!", description: "Our team will contact you within 24 hours." });
      form.reset();
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again or call us directly.", variant: "destructive" });
    },
  });

  return (
    <section id="v2-contact" className="py-20 sm:py-28 bg-[#08080d]" data-testid="v2-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-6">
              <Phone className="w-3.5 h-3.5" />
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Request a Free Demo</h2>
            <p className="text-lg text-white/50 mb-8">
              Fill out the form and our team will schedule a personalized demo for your school.
            </p>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5 sm:p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6" data-testid="v2-form-contact">
                  <FormField control={form.control} name="schoolName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your school name" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50" {...field} data-testid="v2-input-school" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@school.edu" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50" {...field} data-testid="v2-input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+91 98948 36016" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50" {...field} data-testid="v2-input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your school's needs..." className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500/50" {...field} value={field.value || ""} data-testid="v2-input-message" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" size="lg" className="w-full bg-white text-black border-white font-semibold" disabled={mutation.isPending} data-testid="v2-btn-submit">
                    {mutation.isPending ? (
                      <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />Submitting...</>
                    ) : (
                      <>Request Demo<ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="lg:col-span-2 animate-fade-in-up animate-delay-200">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Address</div>
                      <div className="text-white/40 text-sm">G1 - CC Mithilla, Karnan Nagar<br />Polichalur, Chennai 600074<br />India</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Phone</div>
                      <a href="tel:+919894836016" className="text-white/40 hover:text-indigo-400 transition-colors text-sm" data-testid="v2-link-phone">+91 9894836016</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <a href="mailto:info@trackademiq.com" className="text-white/40 hover:text-indigo-400 transition-colors text-sm" data-testid="v2-link-email">info@trackademiq.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Why Choose Trackademiq?</h3>
                <ul className="space-y-2.5">
                  {["14-day free trial", "No credit card required", "Free data migration", "Dedicated support team"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2QuickAnswers() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const quickAnswers = [
    { question: "What is School ERP Software?", answer: "School ERP (Enterprise Resource Planning) software is a comprehensive platform that automates and integrates all administrative, academic, and operational processes in schools including student management, attendance, fees, exams, and communication." },
    { question: "How does AI improve school management?", answer: "AI automates every repetitive task in school management — from attendance tracking and report generation to fee collection and parent communication. More importantly, it catches problems early: flagging at-risk students, detecting attendance anomalies, predicting fee defaults, and surfacing insights that help schools continuously improve." },
    { question: "Why do schools need automation?", answer: "Schools that don't automate waste countless hours on manual tasks while missing critical signals. AI-powered automation handles attendance, report cards, fee tracking, and communication automatically — but more importantly, it catches learning gaps, attendance drops, and financial issues early enough to act on them." },
    { question: "How much does Trackademiq cost?", answer: "Trackademiq offers custom pricing packages with competitive rates tailored to your school's needs. All packages include full features, training, and support. Most schools achieve ROI within 6-12 months through efficiency gains." },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0b0b12]" data-testid="v2-quick-answers">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Quick Answers About{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Trackademiq</span>
          </h2>
          <p className="text-white/40">
            Common questions answered{" "}
            <Link href="/faq" className="text-indigo-400 hover:underline">View all FAQs</Link>
            {" "}{" "}
            <Link href="/what-is-trackademiq" className="text-indigo-400 hover:underline">Learn more</Link>
          </p>
        </div>

        <div className="space-y-3">
          {quickAnswers.map((qa, idx) => (
            <div key={qa.question} className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left"
                data-testid={`v2-faq-${idx}`}
              >
                <span className="font-semibold text-white pr-4">{qa.question}</span>
                <ChevronDown className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 animate-fade-in">
                  <p className="text-white/40 text-sm leading-relaxed">{qa.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function V2Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#v2-features" },
      { label: "ERP Platform", href: "/erp" },
      { label: "Product Tour", href: "/product-tour" },
      { label: "Case Studies", href: "/case-studies" },
    ],
    company: [
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/what-is-trackademiq" },
      { label: "Contact", href: "#v2-contact" },
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
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#06060a] border-t border-white/5 py-12 sm:py-16" role="contentinfo" data-testid="v2-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:hidden text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={trackademiqLogo} alt="Trackademiq Logo" className="w-8 h-8 rounded-md object-contain" width={32} height={32} loading="lazy" />
            <span className="text-lg font-bold text-white">Trackademiq</span>
          </div>
          <p className="text-white/40 text-xs mb-4">
            Polichalur, Chennai{" "}
            <a href="mailto:info@trackademiq.com" className="hover:text-indigo-400 transition-colors">info@trackademiq.com</a>
          </p>
          <div className="flex items-center justify-center gap-3 mb-4 text-xs text-white/40 flex-wrap">
            <Link href="/what-is-trackademiq" className="hover:text-indigo-400 transition-colors">About</Link>
            <span className="text-white/20">|</span>
            <Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link>
            <span className="text-white/20">|</span>
            <Link href="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link>
            <span className="text-white/20">|</span>
            <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
          </div>
          <div className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd.
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img src={trackademiqLogo} alt="Trackademiq Logo" className="w-9 h-9 rounded-md object-contain" width={36} height={36} loading="lazy" />
                <span className="text-lg font-bold text-white">Trackademiq</span>
              </div>
              <p className="text-white/40 mb-6 max-w-sm text-sm">
                AI-powered Education ERP that automates school operations, catches problems early, and keeps every stakeholder informed and empowered.
              </p>
              <div className="text-sm text-white/40">
                <div className="font-medium text-white/60 mb-1">Polichalur, Chennai</div>
                <a href="tel:+919894836016" className="hover:text-indigo-400 transition-colors">+91 9894836016</a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h3 className="font-semibold text-white/80 mb-4 text-sm uppercase tracking-wider">{key}</h3>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("#") ? (
                        <button onClick={() => scrollToSection(link.href)} className="text-white/40 hover:text-indigo-400 transition-colors text-sm py-1.5 block w-full text-left" data-testid={`v2-footer-${link.label.toLowerCase().replace(" ", "-")}`}>
                          {link.label}
                        </button>
                      ) : (
                        <Link href={link.href} className="text-white/40 hover:text-indigo-400 transition-colors text-sm py-1.5 block" data-testid={`v2-footer-${link.label.toLowerCase().replace(" ", "-")}`}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-3 text-sm text-white/40">
              <a href="mailto:info@trackademiq.com" className="flex items-center gap-2 hover:text-indigo-400 transition-colors" data-testid="v2-footer-email">
                <Mail className="w-4 h-4" />info@trackademiq.com
              </a>
              <span className="text-white/20">|</span>
              <a href="tel:+919894836016" className="flex items-center gap-2 hover:text-indigo-400 transition-colors" data-testid="v2-footer-phone">
                <Phone className="w-4 h-4" />+91 9894836016
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPageV2() {
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
      "brand": { "@type": "Brand", "name": "Trackademiq" },
      "category": "Education Management Software",
      "audience": { "@type": "EducationalAudience", "educationalRole": "School Administrator, Principal, Teacher" },
      "featureList": [
        "AI-powered attendance analytics with at-risk student detection",
        "AI-automated report generation and grade analysis",
        "AI insights engine with role-specific recommendations",
        "Real-time notifications and parent-teacher messaging",
        "Multi-school platform management",
        "Automated fee tracking and payment gateway integration",
        "Data anonymization for AI processing",
        "Role-based dashboards for every stakeholder",
      ],
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web, iOS, Android",
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
      "knowsAbout": ["School ERP Software", "Education Analytics", "AI in Education", "Student Performance Prediction", "School Automation", "Educational Technology"],
      "areaServed": "Worldwide",
      "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Service", "email": "info@trackademiq.com", "telephone": "+91 9894836016", "availableLanguage": ["English"], "areaServed": "Worldwide" },
      "address": { "@type": "PostalAddress", "streetAddress": "G1 - CC Mithilla, Karnan Nagar, Polichalur", "addressLocality": "Chennai", "postalCode": "600074", "addressCountry": "IN" },
    };

    const existingProduct = document.querySelector('script[data-schema="product-v2"]');
    const existingOrg = document.querySelector('script[data-schema="organization-v2"]');
    if (existingProduct) existingProduct.remove();
    if (existingOrg) existingOrg.remove();

    const productScript = document.createElement("script");
    productScript.type = "application/ld+json";
    productScript.setAttribute("data-schema", "product-v2");
    productScript.textContent = JSON.stringify(productSchema);
    document.head.appendChild(productScript);

    const orgScript = document.createElement("script");
    orgScript.type = "application/ld+json";
    orgScript.setAttribute("data-schema", "organization-v2");
    orgScript.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    return () => {
      document.querySelector('script[data-schema="product-v2"]')?.remove();
      document.querySelector('script[data-schema="organization-v2"]')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#08080d]">
      <a href="#v2-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md" data-testid="v2-skip-link">
        Skip to main content
      </a>
      <V2Header />
      <main id="v2-main">
        <V2Hero />
        <V2TrustBar />
        <V2AnalyticsPreview />
        <V2Features />
        <V2GetStarted />
        <V2DemoRequest />
        <V2Testimonials />
        <V2Contact />
        <V2QuickAnswers />
      </main>
      <V2Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}