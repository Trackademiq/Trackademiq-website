import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

export default function RefundPolicyPage() {
  useEffect(() => {
    document.title = "Refund Policy | Trackademiq School ERP";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Trackademiq Refund Policy - Learn about our refund and cancellation policy for school ERP software subscriptions.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Refund Policy | Trackademiq School ERP");
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Learn about Trackademiq refund and cancellation policy for school ERP subscriptions.");
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
              <Link href="/#contact">
                <Button variant="ghost" data-testid="button-pricing">Pricing</Button>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            <strong>Last Updated:</strong> February 2026
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Free Trial Period</h2>
            <p className="text-muted-foreground">
              Trackademiq offers a free demo and trial period for schools to evaluate our school ERP software. During this period, schools can test all features without any commitment or payment. We encourage thorough evaluation before subscribing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Subscription Payments</h2>
            <p className="text-muted-foreground">
              Subscription fees are based on custom pricing determined by the number of students and selected modules. Payments can be made annually or as agreed upon during the subscription process. All payments are processed securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Refund Eligibility</h2>
            <p className="text-muted-foreground mb-4">Refunds may be requested under the following circumstances:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Within 14 days of first payment:</strong> Full refund if the Service does not meet documented requirements</li>
              <li><strong>Service unavailability:</strong> Pro-rata refund for extended outages exceeding 72 consecutive hours</li>
              <li><strong>Duplicate payment:</strong> Full refund of the duplicate amount</li>
              <li><strong>Billing errors:</strong> Full refund of incorrectly charged amounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Non-Refundable Situations</h2>
            <p className="text-muted-foreground mb-4">Refunds will not be provided for:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Change of mind after the 14-day period</li>
              <li>Partial usage of the subscription period</li>
              <li>Failure to use the Service</li>
              <li>Violation of Terms of Service leading to account termination</li>
              <li>Customization or setup fees already incurred</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. How to Request a Refund</h2>
            <p className="text-muted-foreground mb-4">To request a refund:</p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li>Email us at info@trackademiq.com with subject "Refund Request"</li>
              <li>Include your school name and subscription details</li>
              <li>Explain the reason for your refund request</li>
              <li>Provide any supporting documentation if applicable</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Refund Processing</h2>
            <p className="text-muted-foreground">
              Approved refunds will be processed within 7-10 business days. The refund will be credited to the original payment method. For bank transfers, please allow additional time for your bank to process the credit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Cancellation Policy</h2>
            <p className="text-muted-foreground">
              Schools may cancel their subscription at any time with 30 days written notice. Upon cancellation, access will continue until the end of the current billing period. No partial refunds are provided for the remaining subscription period after the 14-day window.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Data After Cancellation</h2>
            <p className="text-muted-foreground">
              Upon cancellation, schools can request a full export of their data. Data will be retained for 90 days after cancellation to allow for data retrieval. After 90 days, all data will be permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground">
              For refund inquiries or to request a refund, please contact us:
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
            <Link href="/terms">
              <Button variant="outline" data-testid="link-terms">Terms of Service</Button>
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
