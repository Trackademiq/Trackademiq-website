import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { 
  MessageCircle, 
  X, 
  Send,
  Bot,
  User,
  CheckCircle2,
  Loader2
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

type ConversationStep = 
  | "greeting"
  | "ask_role"
  | "ask_name"
  | "ask_school"
  | "ask_email"
  | "ask_phone"
  | "ask_interest"
  | "confirm"
  | "completed"
  | "general";

interface UserInfo {
  role: string;
  name: string;
  schoolName: string;
  email: string;
  phone: string;
  interest: string;
}

const roleOptions = ["School Administrator", "Principal", "Teacher", "Parent", "Other"];
const interestOptions = ["Schedule a Demo", "Pricing Information", "Feature Details", "Technical Questions", "Other"];

const botResponses: { [key: string]: string } = {
  pricing: "We offer customized pricing based on your institution's specific needs. Our team will work with you to create a package that fits your requirements. Would you like to request a demo and discuss pricing options?",
  demo: "Great! I'd love to help you schedule a demo. Let me collect some information to connect you with our team.",
  features: "Trackademiq offers 8 comprehensive modules: AI Analytics, Smart Attendance, Marks & Report Cards, Fee Management, Homework & Timetables, Messaging, Leave Management, and Multi-Tenant Platform. Would you like to learn more about any specific feature?",
  attendance: "Our attendance system supports both biometric and app-based check-ins. Parents receive instant notifications when their child is marked absent. It's incredibly fast and accurate!",
  contact: "You can reach us at +91 9894836016 or email info@trackademiq.com. Our office is located at G1 - CC Mithilla, Karnan Nagar, Polichalur, Chennai 600074.",
  default: "Thank you for your interest! I can help you learn about our features, schedule a demo, or answer questions. What would you like to know?"
};

function getQuickResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("₹")) {
    return botResponses.pricing;
  }
  if (lowerMessage.includes("feature") || lowerMessage.includes("what can") || lowerMessage.includes("module")) {
    return botResponses.features;
  }
  if (lowerMessage.includes("attendance") || lowerMessage.includes("biometric")) {
    return botResponses.attendance;
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("address") || lowerMessage.includes("location")) {
    return botResponses.contact;
  }
  
  return null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+]?[\d\s-]{10,}$/.test(phone.replace(/\s/g, ''));
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to Trackademiq. I'm here to help you learn about our AI-powered education platform. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
      options: ["Schedule a Demo", "Learn About Features", "Pricing Info", "Contact Us"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [conversationStep, setConversationStep] = useState<ConversationStep>("greeting");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    role: "",
    name: "",
    schoolName: "",
    email: "",
    phone: "",
    interest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addBotMessage = (text: string, options?: string[]) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      isBot: true,
      timestamp: new Date(),
      options
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      isBot: false,
      timestamp: new Date()
    }]);
  };

  const startDemoFlow = () => {
    setConversationStep("ask_role");
    setTimeout(() => {
      addBotMessage("Great! I'll help you schedule a demo. First, what best describes your role?", roleOptions);
    }, 500);
  };

  const submitDemoRequest = async () => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/demo-requests", {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        schoolName: userInfo.schoolName,
        message: `Role: ${userInfo.role}\nInterest: ${userInfo.interest}\n\nSubmitted via Chat Widget`
      });
      
      setConversationStep("completed");
      addBotMessage(
        `Thank you, ${userInfo.name}! Your demo request has been submitted successfully. Our team will reach out to you at ${userInfo.email} within 24 hours. In the meantime, feel free to ask me any other questions!`,
        ["Learn About Features", "Contact Us", "Start New Inquiry"]
      );
    } catch (error) {
      addBotMessage("I apologize, but there was an issue submitting your request. Please try again or contact us directly at info@trackademiq.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    setTimeout(() => {
      if (conversationStep === "greeting" || conversationStep === "general" || conversationStep === "completed") {
        if (option === "Schedule a Demo" || option === "Start New Inquiry") {
          if (option === "Start New Inquiry") {
            setUserInfo({ role: "", name: "", schoolName: "", email: "", phone: "", interest: "" });
          }
          startDemoFlow();
        } else if (option === "Learn About Features") {
          setConversationStep("general");
          addBotMessage(botResponses.features, ["Schedule a Demo", "Pricing Info", "Contact Us"]);
        } else if (option === "Pricing Info") {
          setConversationStep("general");
          addBotMessage(botResponses.pricing, ["Schedule a Demo", "Learn About Features", "Contact Us"]);
        } else if (option === "Contact Us") {
          setConversationStep("general");
          addBotMessage(botResponses.contact, ["Schedule a Demo", "Learn About Features"]);
        }
      } else if (conversationStep === "ask_role") {
        setUserInfo(prev => ({ ...prev, role: option }));
        setConversationStep("ask_name");
        addBotMessage("Perfect! What's your name?");
      } else if (conversationStep === "ask_interest") {
        setUserInfo(prev => ({ ...prev, interest: option }));
        setConversationStep("confirm");
        addBotMessage(
          `Great! Let me confirm your details:\n\n• Name: ${userInfo.name}\n• Role: ${userInfo.role}\n• School: ${userInfo.schoolName}\n• Email: ${userInfo.email}\n• Phone: ${userInfo.phone}\n• Interest: ${option}\n\nShall I submit this demo request?`,
          ["Yes, Submit Request", "No, Start Over"]
        );
      } else if (conversationStep === "confirm") {
        if (option === "Yes, Submit Request") {
          submitDemoRequest();
        } else {
          setUserInfo({ role: "", name: "", schoolName: "", email: "", phone: "", interest: "" });
          setConversationStep("greeting");
          addBotMessage("No problem! Let's start fresh. How can I help you today?", ["Schedule a Demo", "Learn About Features", "Pricing Info", "Contact Us"]);
        }
      }
    }, 500);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isSubmitting) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue("");

    setTimeout(() => {
      if (conversationStep === "greeting" || conversationStep === "general" || conversationStep === "completed") {
        const quickResponse = getQuickResponse(userInput);
        if (quickResponse) {
          addBotMessage(quickResponse, ["Schedule a Demo", "Learn About Features", "Contact Us"]);
        } else if (userInput.toLowerCase().includes("demo") || userInput.toLowerCase().includes("schedule") || userInput.toLowerCase().includes("book")) {
          startDemoFlow();
        } else {
          addBotMessage(botResponses.default, ["Schedule a Demo", "Learn About Features", "Pricing Info", "Contact Us"]);
        }
      } else if (conversationStep === "ask_name") {
        if (userInput.length < 2) {
          addBotMessage("Please enter your full name.");
        } else {
          setUserInfo(prev => ({ ...prev, name: userInput }));
          setConversationStep("ask_school");
          addBotMessage(`Nice to meet you, ${userInput}! What's the name of your school or institution?`);
        }
      } else if (conversationStep === "ask_school") {
        if (userInput.length < 2) {
          addBotMessage("Please enter your school or institution name.");
        } else {
          setUserInfo(prev => ({ ...prev, schoolName: userInput }));
          setConversationStep("ask_email");
          addBotMessage("Great! What's your email address so our team can reach you?");
        }
      } else if (conversationStep === "ask_email") {
        if (!isValidEmail(userInput)) {
          addBotMessage("Please enter a valid email address (e.g., name@example.com)");
        } else {
          setUserInfo(prev => ({ ...prev, email: userInput }));
          setConversationStep("ask_phone");
          addBotMessage("And what's the best phone number to contact you?");
        }
      } else if (conversationStep === "ask_phone") {
        if (!isValidPhone(userInput)) {
          addBotMessage("Please enter a valid phone number with at least 10 digits.");
        } else {
          setUserInfo(prev => ({ ...prev, phone: userInput }));
          setConversationStep("ask_interest");
          addBotMessage("Perfect! What are you most interested in learning about?", interestOptions);
        }
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)]"
          >
            <Card className="overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Trackademiq Assistant</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-xs text-white/80">Online now</p>
                    </div>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                  data-testid="button-close-chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.isBot
                              ? "bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30"
                              : "bg-muted"
                          }`}
                        >
                          {message.isBot ? (
                            <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          ) : (
                            <User className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm whitespace-pre-line ${
                            message.isBot
                              ? "bg-muted text-foreground rounded-tl-sm"
                              : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-tr-sm"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                      {message.isBot && message.options && (
                        <div className="mt-3 ml-10 flex flex-wrap gap-2">
                          {message.options.map((option) => (
                            <Button
                              key={option}
                              variant="outline"
                              size="sm"
                              onClick={() => handleOptionClick(option)}
                              className="text-xs h-8 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                              data-testid={`button-chat-option-${option.toLowerCase().replace(/\s/g, '-')}`}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {isSubmitting && (
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                      </div>
                      <div className="rounded-2xl rounded-tl-sm px-4 py-2.5 bg-muted text-sm text-muted-foreground">
                        Submitting your request...
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-muted/30">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      conversationStep === "ask_name" ? "Enter your name..." :
                      conversationStep === "ask_school" ? "Enter school name..." :
                      conversationStep === "ask_email" ? "Enter your email..." :
                      conversationStep === "ask_phone" ? "Enter phone number..." :
                      "Type a message..."
                    }
                    className="flex-1 bg-background"
                    disabled={isSubmitting}
                    data-testid="input-chat-message"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={isSubmitting || !inputValue.trim()}
                    className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0"
                    data-testid="button-send-chat"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  Powered by Trackademiq AI
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center"
        data-testid="button-open-chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
