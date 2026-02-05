import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import ProductTourPage from "@/pages/product-tour";
import FeaturesPage from "@/pages/features";
import ErpPage from "@/pages/erp";
import PricingPage from "@/pages/pricing";
import ContactPage from "@/pages/contact";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsPage from "@/pages/terms";
import RefundPolicyPage from "@/pages/refund-policy";
import FaqPage from "@/pages/faq";
import WhatIsTrackademiqPage from "@/pages/what-is-trackademiq";
import TrackademiqVsTraditionalErpPage from "@/pages/trackademiq-vs-traditional-erp";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/erp" component={ErpPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/refund-policy" component={RefundPolicyPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/what-is-trackademiq" component={WhatIsTrackademiqPage} />
      <Route path="/trackademiq-vs-traditional-erp" component={TrackademiqVsTraditionalErpPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/product-tour" component={ProductTourPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
