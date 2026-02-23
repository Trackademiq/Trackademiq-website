import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service | Trackademiq School ERP";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Trackademiq Terms of Service - Read our terms and conditions for using our school ERP software platform.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Terms of Service | Trackademiq School ERP");
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Read Trackademiq terms and conditions for using our school ERP software.");
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
              <Link href="/privacy-policy">
                <Button variant="ghost" data-testid="button-privacy">Privacy</Button>
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

      <main id="main" aria-label="Main content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> February 2026
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using Trackademiq school ERP software ("Service"), you agree to be bound by these Terms of Service. If you are using the Service on behalf of a school or organization, you represent that you have the authority to bind that entity to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground">
              Trackademiq provides cloud-based school management software including student information management, attendance tracking, fee management, academic records, parent communication, and administrative tools. The Service is provided on a subscription basis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">Schools are responsible for:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Maintaining the confidentiality of account credentials</li>
              <li>Ensuring only authorized personnel access the system</li>
              <li>The accuracy of data entered into the system</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Upload malicious code or content</li>
              <li>Share login credentials with unauthorized persons</li>
              <li>Use the Service to send spam or unsolicited communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground">
              Subscription fees are billed according to the pricing plan selected. Payment is due upon invoice. Failure to pay may result in suspension or termination of access. All fees are non-refundable except as specified in our Refund Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Data Ownership</h2>
            <p className="text-muted-foreground">
              Schools retain full ownership of all data entered into the system. Trackademiq is granted a limited license to use this data solely for providing the Service. Upon termination, schools may request export of their data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Service Availability</h2>
            <p className="text-muted-foreground">
              We strive for high availability but do not guarantee uninterrupted access. Scheduled maintenance will be communicated in advance. We are not liable for temporary service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The Service, including all software, design, and content, is owned by Trackademiq Technologies Pvt. Ltd. You may not copy, modify, distribute, or reverse engineer any part of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, Trackademiq shall not be liable for any indirect, incidental, special, or consequential damages arising from use of the Service. Our total liability shall not exceed the fees paid in the preceding 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Termination</h2>
            <p className="text-muted-foreground">
              Either party may terminate the subscription with 30 days written notice. We may immediately terminate access for violation of these terms. Upon termination, access to the Service will be revoked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">12. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, contact us at:
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
            <Link href="/privacy-policy">
              <Button variant="outline" data-testid="link-privacy">Privacy Policy</Button>
            </Link>
            <Link href="/refund-policy">
              <Button variant="outline" data-testid="link-refund">Refund Policy</Button>
            </Link>
            <Link href="/#contact">
              <Button variant="outline" data-testid="link-pricing">Pricing</Button>
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
