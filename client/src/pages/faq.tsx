import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ChevronDown, ArrowLeft, HelpCircle, MessageSquare } from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const faqCategories = [
  {
    title: "General Questions",
    questions: [
      {
        q: "What is Trackademiq?",
        a: "Trackademiq is an AI-powered Education ERP that automates every school operation — attendance, fees, reports, homework, and communication. AI catches problems early by detecting at-risk students, flagging attendance anomalies, and predicting issues before they escalate. Role-specific dashboards give principals, teachers, and parents exactly the insights they need."
      },
      {
        q: "What makes Trackademiq different from other school ERP systems?",
        a: "Trackademiq is built with AI at its core, unlike traditional ERPs that just store data. AI automates every repetitive task and catches problems early — from detecting at-risk students to flagging attendance anomalies to predicting fee defaults. Role-specific dashboards ensure principals see school-wide trends while teachers get class-level insights. Everything is automated, nothing falls through the cracks."
      },
      {
        q: "Is Trackademiq suitable for small schools?",
        a: "Yes, Trackademiq scales to schools of any size from 100 to 10,000+ students. Small schools particularly benefit from automation as they typically have limited administrative staff. Implementation is faster and pricing is affordable for all school sizes."
      }
    ]
  },
  {
    title: "Pricing & ROI",
    questions: [
      {
        q: "How much does Trackademiq cost?",
        a: "Trackademiq offers custom pricing packages tailored to your school's size and requirements, with competitive rates. All packages include full features, training, and data migration support. Contact us for a personalized quote."
      },
      {
        q: "What is the ROI of implementing Trackademiq?",
        a: "AI automates every repetitive task across attendance, reports, fees, and communication — dramatically reducing manual work. More importantly, it catches problems early: at-risk students are flagged before they fall behind, attendance anomalies are detected instantly, and fee defaults are predicted before they happen."
      },
      {
        q: "Are there any setup fees?",
        a: "No separate setup fees. Implementation support, data migration, system configuration, and staff training are included in your subscription at no additional cost."
      }
    ]
  },
  {
    title: "Implementation & Training",
    questions: [
      {
        q: "How long does implementation take?",
        a: "Typical Trackademiq implementation takes 2-4 weeks including data migration, system setup, staff training, and testing. Our dedicated team handles technical aspects while you validate data accuracy."
      },
      {
        q: "Do you provide training and support?",
        a: "Trackademiq provides support via email, phone, and chat during business hours. Implementation includes role-specific training, video tutorials, and documentation. Ongoing training resources are always available."
      },
      {
        q: "What if our staff resists the new system?",
        a: "We provide change management support including staff involvement in selection, clear benefit communication, excellent training, and quick-win demonstrations. Most schools report high adoption within 3-4 weeks."
      }
    ]
  },
  {
    title: "Features & Capabilities",
    questions: [
      {
        q: "What AI features does Trackademiq offer?",
        a: "Trackademiq's AI automates every school operation — attendance tracking, report generation, fee management, and communication. It catches problems early by detecting at-risk students, flagging anomalies, and predicting issues. Role-specific dashboards give principals school-wide trends and teachers class-level data, with built-in data anonymization for privacy."
      },
      {
        q: "Can parents access student information?",
        a: "Yes, Trackademiq provides parent portals (web and mobile app) with anytime access to student attendance, grades, fee status, assignments, exam schedules, and direct teacher messaging. Parents receive real-time push notifications for key events."
      },
      {
        q: "Can Trackademiq integrate with our existing systems?",
        a: "Yes, Trackademiq integrates with learning management systems, payment gateways, biometric attendance devices, SMS providers, email systems, and accounting software through standard APIs and webhooks."
      },
      {
        q: "Does Trackademiq work offline?",
        a: "Critical functions like attendance marking and grade entry work offline and automatically sync when internet connectivity returns. This ensures school operations continue during temporary outages."
      }
    ]
  },
  {
    title: "Security & Compliance",
    questions: [
      {
        q: "How secure is student data in Trackademiq?",
        a: "Trackademiq uses 256-bit encryption, role-based access control, and automatic daily backups. We follow GDPR guidelines and data protection best practices. All AI processing uses anonymized student data to protect privacy."
      },
      {
        q: "What happens to our data if we switch from Trackademiq?",
        a: "You own your data completely. Trackademiq provides full data export in standard formats (CSV, Excel, PDF) at any time. Migration support is available if you choose to transition to another system."
      },
      {
        q: "Is Trackademiq GDPR and FERPA compliant?",
        a: "Yes, Trackademiq is fully compliant with GDPR, FERPA, and other international data protection regulations. We provide audit logs, data processing agreements, and privacy controls."
      }
    ]
  },
  {
    title: "Customization & Updates",
    questions: [
      {
        q: "Can we customize Trackademiq for our school's specific needs?",
        a: "Yes, Trackademiq offers extensive configuration options covering report formats, grading schemes, workflows, terminology, and user interfaces. Custom development is available for unique requirements not covered by standard features."
      },
      {
        q: "How often is Trackademiq updated?",
        a: "Trackademiq releases monthly updates with new features, AI improvements, and security enhancements based on customer feedback and educational trends. Updates deploy automatically without disrupting operations."
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-start justify-between text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        data-testid={`faq-${question.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-4"
        >
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function FaqPage() {
  useEffect(() => {
    document.title = "FAQ - Trackademiq School ERP | Common Questions Answered";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Frequently asked questions about Trackademiq AI-powered school ERP software. Learn about features, pricing, implementation, security, and support.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "FAQ - Trackademiq School ERP");
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Everything you need to know about Trackademiq AI-powered School ERP.");
    }

    const faqSchemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqCategories.flatMap(category => 
        category.questions.map(q => ({
          "@type": "Question",
          "name": q.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.a
          }
        }))
      )
    };

    const existingSchema = document.querySelector('script[data-schema="faq"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(faqSchemaData);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="faq"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
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
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-get-demo">
                  Get Demo
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
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                <HelpCircle className="w-3 h-3 mr-1" />
                Help Center
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about Trackademiq AI-powered School ERP
              </p>
            </motion.div>

            <div className="space-y-8">
              {faqCategories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4">{category.title}</h2>
                  <div className="divide-y divide-border">
                    {category.questions.map((faq) => (
                      <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-600 to-violet-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageSquare className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-white/80 mb-6">Our team is here to help. Schedule a free personalized demo.</p>
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-white/90" data-testid="button-schedule-demo">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={trackademiqLogo} alt="Trackademiq" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold">Trackademiq</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors">Refund</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-white/40">© {new Date().getFullYear()} Trackademiq Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
