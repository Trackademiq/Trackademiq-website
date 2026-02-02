import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertDemoRequestSchema, type InsertDemoRequest } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from "lucide-react";
import trackademiqLogo from "@/assets/trackademiq-logo.png";

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

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | Trackademiq - Request a Free Demo";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Contact Trackademiq for a free demo of our school ERP software. Call +91 98948 36016 or email info@trackademiq.com. Located in Chennai, serving schools across India.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Contact Us | Trackademiq School ERP");
    }
  }, []);

  const { toast } = useToast();
  const form = useForm<InsertDemoRequest>({
    resolver: zodResolver(insertDemoRequestSchema),
    defaultValues: {
      schoolName: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      const response = await apiRequest("POST", "/api/demo-requests", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted!",
        description: "Our team will contact you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: InsertDemoRequest) => {
    mutation.mutate(data);
  };

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
              <Link href="/features">
                <Button variant="ghost" data-testid="button-features">Features</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" data-testid="button-pricing">Pricing</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="py-16 sm:py-20 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 dark:from-indigo-900/50 dark:to-violet-900/50 dark:text-indigo-300 border-0">
                  <Phone className="w-3 h-3 mr-1" />
                  Get In Touch
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                Request a Free{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Demo
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Fill out the form and our team will schedule a personalized demo for your school.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="lg:col-span-3"
              >
                <motion.div variants={fadeInUp}>
                  <Card className="p-6 sm:p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                        <FormField
                          control={form.control}
                          name="schoolName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>School Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your school name"
                                  {...field}
                                  data-testid="input-school-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@school.edu"
                                    {...field}
                                    data-testid="input-email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="+91 98948 36016"
                                    {...field}
                                    data-testid="input-phone"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your school's needs..."
                                  className="min-h-[100px]"
                                  {...field}
                                  value={field.value || ""}
                                  data-testid="input-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0"
                          disabled={mutation.isPending}
                          data-testid="button-submit-demo-request"
                        >
                          {mutation.isPending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Request Demo
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="lg:col-span-2"
              >
                <motion.div variants={fadeInUp} className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Address</div>
                        <div className="text-muted-foreground">
                          G1 - CC Mithilla, Karnan Nagar<br />
                          Polichalur, Chennai 600074<br />
                          India
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Phone</div>
                        <a href="tel:+919894836016" className="text-indigo-600 hover:underline">
                          +91 98948 36016
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Email</div>
                        <a href="mailto:info@trackademiq.com" className="text-indigo-600 hover:underline">
                          info@trackademiq.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <Card className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 border-0">
                    <h4 className="font-semibold text-foreground mb-2">Quick Response</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team typically responds within 24 hours. For urgent queries, please call us directly.
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
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
