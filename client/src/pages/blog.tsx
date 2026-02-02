import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar,
  GraduationCap,
  BookOpen,
  Sparkles,
  TrendingUp,
  Users
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

export const blogPosts = [
  {
    id: "ai-transforming-indian-education",
    title: "How AI is Transforming Indian School Education in 2024",
    excerpt: "Discover how artificial intelligence is revolutionizing teaching methods, student assessment, and administrative tasks in schools across India.",
    category: "AI in Education",
    author: "Dr. Priya Sharma",
    date: "December 5, 2024",
    readTime: "8 min read",
    icon: Sparkles,
    content: `
      <p>Artificial Intelligence is no longer a futuristic concept in Indian education—it's a present reality transforming how schools operate across Chennai and beyond. From personalized learning paths to automated administrative tasks, AI is helping educators focus on what matters most: teaching.</p>
      
      <h2>The Rise of AI-Powered Learning</h2>
      <p>Indian schools are increasingly adopting AI tools to identify learning gaps, predict student performance, and provide tailored educational experiences. Tools like Trackademiq are at the forefront of this revolution, offering schools powerful analytics that were previously only available to large institutions.</p>
      
      <h2>Key Benefits for Indian Schools</h2>
      <ul>
        <li><strong>Early Intervention:</strong> AI algorithms can identify struggling students before they fall behind, allowing teachers to provide timely support.</li>
        <li><strong>Reduced Administrative Burden:</strong> Automated attendance, fee management, and report generation free up valuable time for educators.</li>
        <li><strong>Personalized Learning:</strong> Each student receives a customized learning experience based on their strengths and areas for improvement.</li>
        <li><strong>Parent Engagement:</strong> Real-time updates keep parents informed and involved in their child's education journey.</li>
      </ul>
      
      <h2>The Chennai EdTech Revolution</h2>
      <p>Chennai has emerged as a hub for educational technology innovation. With companies like Trackademiq leading the charge, local schools are gaining access to world-class tools that enhance learning outcomes while respecting the unique cultural and educational context of India.</p>
      
      <h2>Looking Ahead</h2>
      <p>As AI continues to evolve, we can expect even more sophisticated tools that will further personalize education, make assessments more meaningful, and help every student reach their full potential. The future of Indian education is bright, and it's powered by AI.</p>
    `
  },
  {
    id: "digital-attendance-systems",
    title: "Why Digital Attendance Systems Are Essential for Modern Schools",
    excerpt: "Learn how digital attendance tracking improves accuracy, saves time, and provides valuable insights for school administrators and parents.",
    category: "School Management",
    author: "Rajesh Kumar",
    date: "December 3, 2024",
    readTime: "6 min read",
    icon: Users,
    content: `
      <p>Traditional paper-based attendance systems are giving way to digital solutions that offer unprecedented accuracy, efficiency, and insights. For Indian schools managing hundreds or thousands of students, digital attendance is no longer a luxury—it's a necessity.</p>
      
      <h2>The Problem with Paper-Based Systems</h2>
      <p>Manual attendance tracking is prone to errors, time-consuming, and provides limited visibility to parents and administrators. A single teacher calling out names for 50 students every period adds up to hours of lost teaching time each week.</p>
      
      <h2>Benefits of Digital Attendance</h2>
      <ul>
        <li><strong>Instant Notifications:</strong> Parents receive real-time alerts when their child is marked absent, enabling quick action if the absence is unexpected.</li>
        <li><strong>Accurate Records:</strong> Digital systems eliminate human error and provide tamper-proof records for compliance and analysis.</li>
        <li><strong>Time Savings:</strong> Biometric or app-based attendance takes seconds instead of minutes, maximizing instructional time.</li>
        <li><strong>Pattern Recognition:</strong> AI-powered systems can identify attendance patterns, helping schools address truancy before it becomes a serious issue.</li>
      </ul>
      
      <h2>Implementation Success Stories</h2>
      <p>Schools in Chennai that have adopted Trackademiq's digital attendance system report 40% reduction in time spent on attendance-related tasks and near-perfect accuracy in their records. Parents particularly appreciate the instant notifications feature.</p>
      
      <h2>Getting Started</h2>
      <p>Transitioning to digital attendance doesn't have to be complex. With the right partner, schools can be up and running within days, with full training and support provided throughout the process.</p>
    `
  },
  {
    id: "parent-teacher-communication",
    title: "Building Stronger Parent-Teacher Communication in the Digital Age",
    excerpt: "Explore best practices for using technology to strengthen the crucial relationship between parents and teachers for better student outcomes.",
    category: "Communication",
    author: "Lakshmi Venkatesh",
    date: "November 28, 2024",
    readTime: "7 min read",
    icon: BookOpen,
    content: `
      <p>The partnership between parents and teachers is fundamental to student success. In today's digital age, technology offers unprecedented opportunities to strengthen this crucial relationship—when used thoughtfully and effectively.</p>
      
      <h2>The Communication Gap</h2>
      <p>Many parents feel disconnected from their child's school experience. Limited parent-teacher meetings, incomplete reports, and difficulty reaching teachers create barriers that impact student outcomes. Digital tools can bridge this gap.</p>
      
      <h2>Best Practices for Digital Communication</h2>
      <ul>
        <li><strong>Regular Updates:</strong> Use apps to share weekly progress summaries, upcoming events, and important announcements.</li>
        <li><strong>Two-Way Messaging:</strong> Enable parents to ask questions and receive timely responses from teachers.</li>
        <li><strong>Photo and Video Sharing:</strong> Share moments from school events, classroom activities, and student achievements.</li>
        <li><strong>Scheduled Availability:</strong> Set clear expectations about response times to avoid burnout while maintaining accessibility.</li>
      </ul>
      
      <h2>Respecting Boundaries</h2>
      <p>While digital tools enable constant connectivity, it's important to establish healthy boundaries. Most schools find success with designated communication hours and emergency protocols for urgent situations.</p>
      
      <h2>Measuring Success</h2>
      <p>Schools using comprehensive communication platforms like Trackademiq report higher parent satisfaction scores, increased attendance at school events, and improved student performance—all indicators of successful home-school partnerships.</p>
    `
  },
  {
    id: "fee-management-best-practices",
    title: "Streamlining School Fee Management: A Complete Guide",
    excerpt: "Discover how automated fee management systems reduce administrative burden, improve collection rates, and enhance parent experience.",
    category: "Administration",
    author: "Suresh Iyer",
    date: "November 25, 2024",
    readTime: "9 min read",
    icon: TrendingUp,
    content: `
      <p>Fee management is one of the most challenging aspects of school administration. With hundreds of students, multiple fee components, and various payment schedules, managing school finances can quickly become overwhelming without the right tools.</p>
      
      <h2>Common Fee Management Challenges</h2>
      <ul>
        <li>Tracking payments across multiple fee types (tuition, transport, activities)</li>
        <li>Sending timely reminders without being intrusive</li>
        <li>Managing installment plans and late payments</li>
        <li>Generating accurate financial reports</li>
        <li>Providing convenient payment options for parents</li>
      </ul>
      
      <h2>The Digital Solution</h2>
      <p>Modern fee management systems automate the entire process, from generating invoices to sending reminders and reconciling payments. Schools using Trackademiq's fee management module report 30% improvement in collection rates within the first semester.</p>
      
      <h2>Key Features to Look For</h2>
      <ul>
        <li><strong>Multiple Payment Options:</strong> UPI, cards, net banking, and cash acceptance with digital receipts.</li>
        <li><strong>Automated Reminders:</strong> Customizable reminder schedules via SMS, email, and app notifications.</li>
        <li><strong>Installment Management:</strong> Easy setup and tracking of payment plans.</li>
        <li><strong>Real-Time Reporting:</strong> Dashboard views of collection status, outstanding amounts, and trends.</li>
      </ul>
      
      <h2>Implementation Tips</h2>
      <p>Start the transition at the beginning of an academic year, provide training to staff and parents, and maintain a support channel for questions during the initial months. The investment pays off quickly in time saved and improved collections.</p>
    `
  }
];

function BlogHeader() {
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
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            EdTech Insights Blog
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Expert articles on school management, educational technology, and best practices for Indian schools
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function BlogGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <Link href={`/blog/${post.id}`}>
                <Card
                  className="h-full p-6 hover-elevate cursor-pointer transition-all duration-300"
                  data-testid={`card-blog-post-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center flex-shrink-0">
                      <post.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" size="sm" className="mb-3">
                        {post.category}
                      </Badge>
                      <h2 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BlogFooter() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Trackademiq
            </span>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-muted-foreground mb-6">
            Empowering Indian schools with smart technology
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/#contact">
              <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0">
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

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <BlogGrid />
      <BlogFooter />
    </div>
  );
}
