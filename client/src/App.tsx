import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

const LandingPage = lazy(() => import("@/pages/landing"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const ProductTourPage = lazy(() => import("@/pages/product-tour"));
const FeaturesPage = lazy(() => import("@/pages/features"));
const ErpPage = lazy(() => import("@/pages/erp"));
const PricingPage = lazy(() => import("@/pages/pricing"));
const ContactPage = lazy(() => import("@/pages/contact"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const RefundPolicyPage = lazy(() => import("@/pages/refund-policy"));
const FaqPage = lazy(() => import("@/pages/faq"));
const WhatIsTrackademiqPage = lazy(() => import("@/pages/what-is-trackademiq"));
const TrackademiqVsTraditionalErpPage = lazy(() => import("@/pages/trackademiq-vs-traditional-erp"));
const TrackademiqVsPowerschoolPage = lazy(() => import("@/pages/trackademiq-vs-powerschool"));
const TrackademiqVsTeachmintPage = lazy(() => import("@/pages/trackademiq-vs-teachmint"));
const BestSchoolErpPage = lazy(() => import("@/pages/best-school-erp"));
const CaseStudiesPage = lazy(() => import("@/pages/case-studies"));
const LandingPageV2 = lazy(() => import("@/pages/landing-v2"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-[3px] border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
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
        <Route path="/trackademiq-vs-powerschool" component={TrackademiqVsPowerschoolPage} />
        <Route path="/trackademiq-vs-teachmint" component={TrackademiqVsTeachmintPage} />
        <Route path="/best-school-erp" component={BestSchoolErpPage} />
        <Route path="/case-studies" component={CaseStudiesPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:id" component={BlogPostPage} />
        <Route path="/product-tour" component={ProductTourPage} />
        <Route path="/v2" component={LandingPageV2} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
