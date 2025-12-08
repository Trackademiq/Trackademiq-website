import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  X, 
  Send,
  Bot,
  User
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! Welcome to Edufy. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

const botResponses: { [key: string]: string } = {
  pricing: "Our pricing starts at ₹4,999/month for the Starter plan. We also offer Professional (₹9,999/month) and Enterprise (custom pricing) tiers. Would you like to schedule a demo to discuss your school's needs?",
  demo: "Great! You can request a demo by filling out the contact form on our homepage, or I can help you get started. Just scroll down to the 'Request a Demo' section.",
  features: "Edufy offers AI Analytics, Attendance Tracking, Fee Management, Homework Management, Instant Messaging, and Multi-School Support. Would you like to learn more about any specific feature?",
  attendance: "Our attendance system supports both biometric and app-based check-ins. Parents receive instant notifications when their child is marked absent. It's incredibly fast and accurate!",
  contact: "You can reach us at +91 9894836016 or email contact@edufy.in. Our office is located at 123 Tech Park, OMR, Chennai 600096.",
  default: "Thank you for your question! For detailed information, I recommend scheduling a demo with our team. They can provide personalized answers based on your school's specific needs. Would you like me to help you request a demo?"
};

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("₹")) {
    return botResponses.pricing;
  }
  if (lowerMessage.includes("demo") || lowerMessage.includes("trial")) {
    return botResponses.demo;
  }
  if (lowerMessage.includes("feature") || lowerMessage.includes("what can") || lowerMessage.includes("do")) {
    return botResponses.features;
  }
  if (lowerMessage.includes("attendance") || lowerMessage.includes("biometric")) {
    return botResponses.attendance;
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email") || lowerMessage.includes("address")) {
    return botResponses.contact;
  }
  
  return botResponses.default;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
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
            className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)]"
          >
            <Card className="overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Edufy Support</h3>
                    <p className="text-xs text-white/70">Usually replies instantly</p>
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

              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot
                            ? "bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30"
                            : "bg-muted"
                        }`}
                      >
                        {message.isBot ? (
                          <Bot className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        ) : (
                          <User className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
                          message.isBot
                            ? "bg-muted text-foreground"
                            : "bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    data-testid="input-chat-message"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-0"
                    data-testid="button-send-chat"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
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
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg flex items-center justify-center"
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
