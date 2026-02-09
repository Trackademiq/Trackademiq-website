import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Trackademiq School ERP";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Trackademiq Privacy Policy - Learn how we collect, use, and protect student and school data. GDPR compliant school ERP software.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Privacy Policy | Trackademiq School ERP");
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Learn how Trackademiq protects student and school data with enterprise-grade security.");
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
              <Link href="/terms">
                <Button variant="ghost" data-testid="button-terms">Terms</Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white" data-testid="button-contact">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> February 2026
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Trackademiq Technologies Pvt. Ltd. ("we", "our", or "us") is committed to protecting the privacy of students, parents, teachers, and school administrators who use our school ERP software. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We collect information that schools provide to us, including:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Student information (name, date of birth, class, section, admission details)</li>
              <li>Parent/Guardian contact information (name, phone, email, address)</li>
              <li>Teacher and staff information (name, contact, employment details)</li>
              <li>Academic records (attendance, marks, report cards)</li>
              <li>Fee payment records and transaction history</li>
              <li>Communication logs between parents and teachers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the collected information to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our school ERP services</li>
              <li>Send notifications about attendance, fees, and academic updates</li>
              <li>Generate reports and analytics for school administration</li>
              <li>Improve our software and develop new features</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures including encryption of data in transit and at rest, secure cloud infrastructure, role-based access controls, and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Data Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or rent personal information to third parties. Data is only shared with the school that owns the account and authorized personnel within that institution. We may share anonymized, aggregated data for research purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain data for as long as the school maintains an active subscription. Upon termination, schools may request data export. Data is permanently deleted 90 days after account termination unless legally required to retain it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground mb-4">Schools and users have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access their personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of data (subject to legal requirements)</li>
              <li>Export data in a portable format</li>
              <li>Withdraw consent for optional data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy-related inquiries, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Email:</strong> info@trackademiq.com<br />
              <strong>Phone:</strong> +91 98948 36016<br />
              <strong>Address:</strong> G1 - CC Mithilla, Karnan Nagar, Polichalur, Chennai 600074, India
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Related Pages:</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms">
              <Button variant="outline" data-testid="link-terms">Terms of Service</Button>
            </Link>
            <Link href="/refund-policy">
              <Button variant="outline" data-testid="link-refund">Refund Policy</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" data-testid="link-contact">Contact Us</Button>
            </Link>
          </div>
        </div>
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
