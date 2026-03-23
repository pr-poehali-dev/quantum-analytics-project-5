import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useUIStore } from "@/lib/ui-store"
import { Button } from "@/components/ui/button"

const QUICK_CHIPS = ["Сколько игроков?", "Когда турнир?", "Как зарегистрироваться?"]

const RESPONSES: Record<string, string> = {
  "Сколько игроков?": "Регистрация открыта! Смотри список участников в разделе «Игроки».",
  "Когда турнир?": "Расписание и формат турнира доступны в разделе «Расписание».",
  "Как зарегистрироваться?": "Подробная информация о регистрации — в разделе «Правила». Удачи, боец!",
}

const ACTION_RESPONSES: Record<string, { response: string; action: string }> = {
  "открой игроков": { response: "Открываю список участников!", action: "about" },
  "покажи игроков": { response: "Вот список всех зарегистрированных игроков!", action: "about" },
  "открой расписание": { response: "Открываю расписание матчей!", action: "resume" },
  "покажи расписание": { response: "Вот расписание турнира!", action: "resume" },
  "открой правила": { response: "Открываю правила турнира!", action: "writings" },
  "покажи правила": { response: "Вот правила участия!", action: "writings" },
  "открой галерею": { response: "Открываю галерею турнира!", action: "art" },
  "покажи галерею": { response: "Вот галерея!", action: "art" },
}

type AppType = "about" | "resume" | "writings" | "art"

export function ChatPanel() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [inputValue, setInputValue] = useState("")
  const { openOS } = useUIStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleChipClick = (chip: string) => {
    const response = RESPONSES[chip] || "Интересный вопрос! Уточни у организатора."
    setMessages((prev) => [...prev, { text: chip, isUser: true }, { text: response, isUser: false }])
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")

    const lowerMessage = userMessage.toLowerCase()
    const actionMatch = Object.keys(ACTION_RESPONSES).find((key) => lowerMessage.includes(key))

    if (actionMatch) {
      const { response, action } = ACTION_RESPONSES[actionMatch]
      setMessages((prev) => [...prev, { text: userMessage, isUser: true }, { text: response, isUser: false }])
      setTimeout(() => {
        openOS(action as AppType)
      }, 1000)
    } else {
      const defaultResponse =
        "Попробуй написать «открой игроков», «покажи расписание» или «открой правила»!"
      setMessages((prev) => [...prev, { text: userMessage, isUser: true }, { text: defaultResponse, isUser: false }])
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 space-y-3 h-32 overflow-y-auto scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 border-[3px] border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] ${
                msg.isUser ? "bg-[#FF6B00] text-black" : "bg-[#1A1A2E] text-white"
              }`}
            >
              <p className="text-sm font-medium leading-tight">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleInputSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напиши команду или вопрос..."
            className="flex-1 p-3 border-[3px] border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] bg-[#1A1A2E] text-white font-medium text-sm focus:outline-none focus:shadow-[1px_1px_0px_0px_rgba(255,107,0,0.5)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all placeholder:text-gray-500"
          />
          <Button
            type="submit"
            className="bg-[#FF6B00] text-black border-[3px] border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(255,107,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold px-4"
          >
            Ввод
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        {QUICK_CHIPS.map((chip) => (
          <Button
            key={chip}
            onClick={() => handleChipClick(chip)}
            className="bg-[#1A1A2E] text-white border-[3px] border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(255,107,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold text-xs px-3 py-2 h-auto"
          >
            {chip}
          </Button>
        ))}
      </div>
    </div>
  )
}
