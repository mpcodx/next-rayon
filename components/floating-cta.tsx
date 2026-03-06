"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ChatSender = "bot" | "user"
type ChatMessage = { text: string; sender: ChatSender }
type BotStep = "askName" | "askEmail" | "askService" | "askDetails" | "confirmSend" | "done"

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@rayonweb.com"

const SERVICE_OPTIONS = [
  "Web Development",
  "App Development",
  "DevOps & Cloud",
  "UI/UX Design",
  "LMS & Integration",
  "QA & Automation",
  "AI & Machine Learning",
]

const servicePrompt = [
  "Please choose the service you need (you can type numbers or names, multiple with commas):",
  ...SERVICE_OPTIONS.map((service, index) => `${index + 1}. ${service}`),
].join("\n")

const initialOptionPrompt = [
  "I can help with:",
  "1. Start consultation request",
  "2. View services list",
  "3. Contact details",
].join("\n")

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMAIL_IN_TEXT_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/
const CONTACT_QUERY_REGEX = /\b(contact|details|email|reach|support)\b/i

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState<BotStep>("askName")
  const [lead, setLead] = useState({
    name: "",
    email: "",
    service: "",
    details: "",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
      const initialMessages: ChatMessage[] = [
        { text: "👋 Hi there! I'm RayonBot, your digital assistant.", sender: "bot" },
        { text: "I'll help you with a quick consultation request.", sender: "bot" },
        { text: initialOptionPrompt, sender: "bot" },
        { text: "To begin, please share your name.", sender: "bot" },
      ]

      setLead({ name: "", email: "", service: "", details: "" })
      setStep("askName")
      setMessages([initialMessages[0]])
      setIsTyping(true)
      const timer = setTimeout(() => {
        setMessages(initialMessages)
        setIsTyping(false)
      }, 900)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const addBotMessage = (text: string, delay = 700) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { text, sender: "bot" }])
      setIsTyping(false)
    }, delay)
  }

  const parseServicesFromInput = (value: string) => {
    const input = value.trim()
    if (!input) return []

    const tokens = input.split(",").map((token) => token.trim()).filter(Boolean)
    const selected: string[] = []

    for (const token of tokens) {
      const number = Number(token)
      if (Number.isInteger(number) && number >= 1 && number <= SERVICE_OPTIONS.length) {
        selected.push(SERVICE_OPTIONS[number - 1])
        continue
      }

      const lowerToken = token.toLowerCase()
      const matched = SERVICE_OPTIONS.find(
        (service) => service.toLowerCase() === lowerToken || service.toLowerCase().includes(lowerToken),
      )

      if (matched) {
        selected.push(matched)
      }
    }

    if (selected.length === 0) {
      const lowerInput = input.toLowerCase()
      const includesMatches = SERVICE_OPTIONS.filter((service) => lowerInput.includes(service.toLowerCase()))
      selected.push(...includesMatches)
    }

    if (selected.length === 0 && input.length > 2) {
      selected.push(input)
    }

    return Array.from(new Set(selected))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userText = inputValue.trim()
    const lowerText = userText.toLowerCase()
    const emailFromText = userText.match(EMAIL_IN_TEXT_REGEX)?.[0] || ""

    // Add user message
    const userMessage = { text: userText, sender: "user" as const }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    if (CONTACT_QUERY_REGEX.test(userText) && !(step === "askEmail" && EMAIL_REGEX.test(emailFromText || userText))) {
      addBotMessage(`You can contact us at ${CONTACT_EMAIL}.`)
      if (step === "askName") addBotMessage("Please share your name to continue.")
      if (step === "askEmail") addBotMessage("Please share your email address.")
      if (step === "askService") addBotMessage(servicePrompt)
      if (step === "askDetails") addBotMessage("Please share your project details in 1-2 lines.")
      if (step === "confirmSend") addBotMessage("Type SEND to submit this consultation request.")
      return
    }

    if (step === "askName") {
      if (lowerText === "1" || lowerText.includes("start")) {
        addBotMessage("Great, let's begin. Please share your name.")
        return
      }

      if (lowerText === "2" || lowerText.includes("service") || lowerText.includes("list") || lowerText.includes("option")) {
        addBotMessage(servicePrompt)
        addBotMessage("Now share your name to continue.")
        return
      }

      if (lowerText === "3") {
        addBotMessage(`You can contact us at ${CONTACT_EMAIL}.`)
        addBotMessage("Now share your name to continue.")
        return
      }

      if (userText.length < 2) {
        addBotMessage("Please enter a valid name.")
        return
      }

      setLead((prev) => ({ ...prev, name: userText }))
      setStep("askEmail")
      addBotMessage(`Nice to meet you, ${userText}. What's your email address?`)
      return
    }

    if (step === "askEmail") {
      const normalizedEmail = emailFromText || userText
      if (!EMAIL_REGEX.test(normalizedEmail)) {
        addBotMessage("Please enter a valid email address (example: name@company.com).")
        return
      }

      setLead((prev) => ({ ...prev, email: normalizedEmail }))
      setStep("askService")
      addBotMessage(servicePrompt)
      return
    }

    if (step === "askService") {
      if (lowerText.includes("list") || lowerText.includes("service")) {
        addBotMessage(servicePrompt)
        return
      }

      const selectedServices = parseServicesFromInput(userText)
      if (selectedServices.length === 0) {
        addBotMessage(`I couldn't identify the service. ${servicePrompt}`)
        return
      }

      const serviceText = selectedServices.join(", ")
      setLead((prev) => ({ ...prev, service: serviceText }))
      setStep("askDetails")
      addBotMessage(`Great choice: ${serviceText}. Now tell me a short project requirement.`)
      return
    }

    if (step === "askDetails") {
      if (userText.length < 8) {
        addBotMessage("Please add a bit more detail so our team can help better.")
        return
      }

      const currentLead = { ...lead, details: userText }
      setLead(currentLead)
      setStep("confirmSend")
      addBotMessage(
        `Perfect. Please confirm:\nName: ${currentLead.name}\nEmail: ${currentLead.email}\nService: ${currentLead.service}\nRequirement: ${currentLead.details}\n\nType SEND to submit or CHANGE to update details.`,
      )
      return
    }

    if (step === "confirmSend") {
      if (lowerText.includes("change") || lowerText.includes("edit")) {
        setStep("askDetails")
        addBotMessage("Please share the updated project requirement.")
        return
      }

      if (!(lowerText === "send" || lowerText.includes("confirm") || lowerText.includes("yes"))) {
        addBotMessage("Please type SEND to submit or CHANGE to edit.")
        return
      }

      const subject = `Via RayonBot | ${lead.name} | ${lead.email} | ${lead.service || "General Inquiry"}`
      const message = `Name: ${lead.name}\nEmail: ${lead.email}\nService: ${lead.service}\nRequirement:\n${lead.details}`

      setIsTyping(true)
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          message,
          name: lead.name,
          email: lead.email,
          replyTo: lead.email,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}))
            throw new Error(data?.message || "Failed to send")
          }

          setStep("done")
          setMessages((prev) => [
            ...prev,
            {
              text: "Thanks! Your request has been sent to our team. We will contact you shortly.",
              sender: "bot",
            },
          ])
        })
        .catch(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: `I couldn't send your request right now. Please email us directly at ${CONTACT_EMAIL}.`,
              sender: "bot",
            },
          ])
        })
        .finally(() => {
          setIsTyping(false)
        })

      return
    }

    if (step === "done") {
      if (lowerText.includes("new") || lowerText.includes("restart") || lowerText.includes("start")) {
        setLead({ name: "", email: "", service: "", details: "" })
        setStep("askName")
        addBotMessage("Sure, let's start a new request. What's your name?", 300)
      } else {
        addBotMessage(`For any quick help, you can also email us at ${CONTACT_EMAIL}.`)
      }
    }
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
                onClick={() => {
                  setIsOpen(false)
                  setInputValue("")
                  setIsTyping(false)
                }}
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
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
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
                disabled={isTyping}
                className="text-white"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isTyping || !inputValue.trim()}
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
            onClick={() => {
              setMessages([])
              setLead({ name: "", email: "", service: "", details: "" })
              setStep("askName")
              setInputValue("")
              setIsTyping(false)
              setIsOpen(true)
            }}
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
