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

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
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
