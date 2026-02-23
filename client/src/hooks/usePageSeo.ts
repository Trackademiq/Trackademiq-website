import { useEffect } from "react";
import { useLocation } from "wouter";

const BASE = "https://trackademiq.com";
const DEFAULT_TITLE = "Trackademiq | Best AI-Powered School ERP Software & Student Management System";
const DEFAULT_DESC = "Trackademiq - AI-powered Education ERP that automates every school operation, catches problems early, and delivers role-specific insights. Built for schools worldwide.";

function matchPath(path: string): string {
  if (path.startsWith("/blog/")) return "/blog/:id";
  return path;
}

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESC },
  "/blog/:id": { title: "Blog | Trackademiq", description: "Read articles on school management, AI in education, and EdTech from Trackademiq." },
  "/features": { title: "Features | Trackademiq - AI School ERP", description: "Explore AI-powered features: attendance, fees, reports, homework, messaging, and role-specific dashboards for schools." },
  "/erp": { title: "School ERP Software | Trackademiq", description: "Complete school ERP: student info, attendance, fees, grades, timetables, and AI analytics. Built for modern schools." },
  "/pricing": { title: "Pricing | Trackademiq School ERP", description: "Transparent pricing for AI-powered school ERP. Request a demo and get a quote tailored to your school." },
  "/contact": { title: "Contact | Trackademiq", description: "Get in touch for a demo or support. We're here to help your school succeed with AI-powered management." },
  "/privacy-policy": { title: "Privacy Policy | Trackademiq", description: "Trackademiq privacy policy. How we collect, use, and protect your school and student data." },
  "/terms": { title: "Terms of Service | Trackademiq", description: "Terms of service for Trackademiq AI-powered school ERP platform." },
  "/refund-policy": { title: "Refund Policy | Trackademiq", description: "Trackademiq refund and cancellation policy." },
  "/faq": { title: "FAQ | Trackademiq School ERP", description: "Frequently asked questions about Trackademiq AI-powered school management software." },
  "/what-is-trackademiq": { title: "What is Trackademiq? | AI School ERP", description: "Learn what Trackademiq is: AI-powered Education ERP that automates school operations and catches problems early." },
  "/product-tour": { title: "Product Tour | Trackademiq", description: "See how Trackademiq works: attendance, fees, reports, dashboards, and AI insights for every role." },
  "/case-studies": { title: "Case Studies | Trackademiq", description: "See how schools use Trackademiq to improve attendance, fees, and student outcomes." },
  "/blog": { title: "Blog | Trackademiq", description: "Articles on school management, AI in education, attendance, and EdTech best practices." },
  "/best-school-erp": { title: "Best School ERP Software 2025 | Trackademiq", description: "Why Trackademiq is among the best AI-powered school ERP solutions. Compare features and benefits." },
  "/trackademiq-vs-traditional-erp": { title: "Trackademiq vs Traditional ERP | Compare", description: "Compare AI-powered Trackademiq with traditional school ERP systems. Faster setup, predictive analytics." },
  "/trackademiq-vs-powerschool": { title: "Trackademiq vs PowerSchool | Compare", description: "Trackademiq vs PowerSchool: AI-first school ERP with predictive analytics and modern UX." },
  "/trackademiq-vs-teachmint": { title: "Trackademiq vs Teachmint | Compare", description: "Trackademiq vs Teachmint: AI automation, at-risk detection, and role-specific insights for schools." },
};

function getCanonical(path: string): string {
  if (path === "/" || path === "") return BASE + "/";
  return BASE + path;
}

export function usePageSeo() {
  const [location] = useLocation();
  const path = location || "/";
  const key = matchPath(path);
  const seo = ROUTE_SEO[key] ?? { title: DEFAULT_TITLE, description: DEFAULT_DESC };

  useEffect(() => {
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", seo.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", getCanonical(path));
  }, [path, seo.title, seo.description]);
}
