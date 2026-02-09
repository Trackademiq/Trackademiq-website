import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight, 
  GraduationCap,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  Building2,
  Award,
  Target
} from "lucide-react";

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

const caseStudies = [
  {
    id: 1,
    school: "Chennai Public School",
    location: "Anna Nagar, Chennai",
    type: "CBSE School",
    students: "2,500+",
    image: schoolsImage,
    challenge: "Managing attendance for 2,500+ students across multiple buildings was time-consuming and error-prone. Parents had no real-time visibility into their child's attendance.",
    solution: "Implemented Trackademiq's biometric and app-based attendance system with instant parent notifications.",
    results: [
      { metric: "95%", label: "Attendance Accuracy" },
      { metric: "40%", label: "Time Saved Daily" },
      { metric: "High", label: "Parent Satisfaction" }
    ],
    testimonial: {
      quote: "Trackademiq transformed our attendance process. What used to take 30 minutes now takes 2 minutes, and parents love the instant notifications.",
      author: "Dr. Lakshmi Venkatesh",
      role: "Principal"
    }
  },
  {
    id: 2,
    school: "St. Mary's Matriculation School",
    location: "T. Nagar, Chennai",
    type: "Matriculation School",
    students: "1,800+",
    image: teachersImage,
    challenge: "Fee collection was a major headache with manual tracking, late payments, and parent complaints about lack of transparency.",
    solution: "Deployed Trackademiq's automated fee management with multiple payment options and smart reminders.",
    results: [
      { metric: "30%", label: "Faster Collections" },
      { metric: "60%", label: "Fewer Late Payments" },
      { metric: "100%", label: "Digital Receipts" }
    ],
    testimonial: {
      quote: "Our fee collection improved dramatically. Parents appreciate the convenience of online payments and automatic reminders.",
      author: "Sr. Agnes Mary",
      role: "School Administrator"
    }
  },
  {
    id: 3,
    school: "DAV School Chennai",
    location: "Mogappair, Chennai",
    type: "CBSE School",
    students: "3,200+",
    image: parentsImage,
    challenge: "Communication between teachers and parents was fragmented. Important messages were often missed, leading to confusion and complaints.",
    solution: "Implemented Trackademiq's unified messaging platform with broadcast announcements and direct teacher-parent chat.",
    results: [
      { metric: "90%", label: "Message Read Rate" },
      { metric: "75%", label: "Parent Engagement" },
      { metric: "50%", label: "Fewer Complaints" }
    ],
    testimonial: {
      quote: "The messaging feature has revolutionized how we communicate with parents. No more missed circulars or confused parents.",
      author: "Priya Sundaram",
      role: "Head of Communications"
    }
  }
];

function CaseStudiesHeader() {
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
              <Award className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Chennai School Success Stories
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            See how schools across Chennai are transforming their operations with Trackademiq
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "AI-Powered", label: "Analytics Engine", icon: Building2 },
    { value: "8hrs→15min", label: "Report Cards", icon: Users },
    { value: "Real-Time", label: "Notifications", icon: Target },
    { value: "Multi-School", label: "Management", icon: Award }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
    >
      <motion.div variants={fadeInUp} className="lg:w-1/2">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={study.image}
            alt={`${study.school} case study`}
            className="w-full h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {study.type}
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="lg:w-1/2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Building2 className="w-4 h-4" />
          {study.location}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{study.school}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Users className="w-4 h-4" />
          {study.students} Students
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" />
              The Challenge
            </h4>
            <p className="text-muted-foreground text-sm">{study.challenge}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Our Solution
            </h4>
            <p className="text-muted-foreground text-sm">{study.solution}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {study.results.map((result, i) => (
            <div key={i} className="text-center p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
              <div className="text-xl font-bold text-teal-600 dark:text-teal-400">{result.metric}</div>
              <div className="text-xs text-muted-foreground">{result.label}</div>
            </div>
          ))}
        </div>

        <Card className="p-4 bg-muted/50">
          <blockquote className="text-sm text-muted-foreground italic mb-2">
            "{study.testimonial.quote}"
          </blockquote>
          <div className="text-sm font-medium text-foreground">
            {study.testimonial.author}, {study.testimonial.role}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function CaseStudiesList() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
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
            Ready to Write Your Success Story?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join schools across Chennai transforming their operations with Trackademiq's AI-powered platform.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90">
                Request a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/product-tour">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Take the Product Tour
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudiesFooter() {
  return (
    <section className="py-12 bg-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-background">Trackademiq</span>
        </div>
        <p className="text-sm text-background/60">
          © {new Date().getFullYear()} Trackademiq Technologies Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <CaseStudiesHeader />
      <StatsSection />
      <CaseStudiesList />
      <CTASection />
      <CaseStudiesFooter />
    </div>
  );
}
