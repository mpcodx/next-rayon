"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial bot messages
  const initialMessages = [
    { text: "👋 Hi there! I'm RayonBot, your digital assistant.", sender: "bot" as const },
    { text: "How can I help you today?", sender: "bot" as const },
  ]

  // Show the CTA after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize chat with bot messages
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add first message immediately
      setMessages([initialMessages[0]])

      // Add second message with typing effect
      setIsTyping(true)
      const timer = setTimeout(() => {
        setMessages([initialMessages[0], initialMessages[1]])
        setIsTyping(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = { text: inputValue, sender: "user" as const }
    setMessages([...messages, userMessage])
    setInputValue("")

    // Simulate bot typing
    setIsTyping(true)

    // Generate bot response based on user input
    setTimeout(() => {
      let botResponse = ""
      const userText = inputValue.toLowerCase()

      if (userText.includes("pricing") || userText.includes("cost") || userText.includes("price")) {
        botResponse =
          "Our pricing depends on your specific project needs. Would you like to schedule a free consultation to discuss your requirements?"
      } else if (userText.includes("contact") || userText.includes("talk") || userText.includes("speak")) {
        botResponse =
          "You can reach our team at contact@rayonweb.com or schedule a call directly through our calendar. Would you like me to set that up for you?"
      } else if (userText.includes("service") || userText.includes("offer")) {
        botResponse =
          "We offer web development, app development, DevOps & cloud services, UI/UX design, LMS & integration, and QA & automation. Which service are you interested in learning more about?"
      } else if (userText.includes("hello") || userText.includes("hi") || userText.includes("hey")) {
        botResponse = "Hello! How can I assist you with your digital project today?"
      } else {
        botResponse =
          "Thanks for reaching out! Would you like to schedule a free consultation with our team to discuss your project?"
      }

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }])
      setIsTyping(false)
    }, 1500)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-white/20"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-1.5">
                  <Bot className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-white">RayonBot</h3>
                  <p className="text-xs text-white/80">Online | Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white rounded-full p-1 hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="p-4 h-80 overflow-y-auto bg-slate-950/85">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}>
                  {message.sender === "bot" && (
                    <div className="bg-white/10 rounded-full p-1.5 mr-2 h-8 w-8 flex-shrink-0">
                      <Bot className="h-5 w-5 text-cyan-300" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                      message.sender === "bot"
                        ? "bg-white/10 text-white"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white ml-2"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-white/10 rounded-full p-1.5 mr-2 h-8 w-8 flex-shrink-0">
                    <Bot className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="bg-white/10 rounded-2xl px-4 py-3 max-w-[80%]">
                    <div className="flex space-x-1 items-center">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-slate-950/75 flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-white"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center neon-glow"
            aria-label="Open chat"
          >
            <Bot className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
