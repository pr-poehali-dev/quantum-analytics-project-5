import { useEffect } from "react"
import { useUIStore } from "@/lib/ui-store"
import { OrbSlot } from "./OrbSlot"
import { MiniAppAbout } from "./MiniAppAbout"
import { MiniAppResume } from "./MiniAppResume"
import { MiniAppWritings } from "./MiniAppWritings"
import { MiniAppArt } from "./MiniAppArt"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type AppType = "about" | "resume" | "writings" | "art"

const APP_COMPONENTS: Record<AppType, React.ComponentType> = {
  about: MiniAppAbout,
  resume: MiniAppResume,
  writings: MiniAppWritings,
  art: MiniAppArt,
}

const APP_ICONS: Record<AppType, string> = {
  about: "Users",
  resume: "CalendarDays",
  writings: "ScrollText",
  art: "Image",
}

const APP_LABELS: Record<AppType, string> = {
  about: "Игроки",
  resume: "Расписание",
  writings: "Правила",
  art: "Галерея",
}

export function OSOverlay() {
  const { osOpen, activeApp, closeOS, setActiveApp } = useUIStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && osOpen) {
        closeOS()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [osOpen, closeOS])

  if (!osOpen) return null

  const ActiveComponent = activeApp ? APP_COMPONENTS[activeApp as AppType] : null

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0F] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b-[3px] border-[#FF6B00] bg-[#1A1A2E]">
        <div className="flex items-center gap-4">
          <OrbSlot size="sm" />
          <h1 className="text-2xl font-black text-white tracking-widest">Кадетская CSка</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={closeOS}
            className="w-10 h-10 p-0 bg-[#FF6B00] text-black border-[3px] border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(255,107,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            aria-label="Закрыть"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <nav className="w-56 bg-[#1A1A2E] border-r-[3px] border-[#FF6B00] p-4">
          <div className="space-y-2">
            {(Object.keys(APP_COMPONENTS) as AppType[]).map((key) => {
              const isActive = activeApp === key

              return (
                <Button
                  key={key}
                  onClick={() => setActiveApp(key)}
                  className={`w-full justify-start gap-3 h-12 border-[3px] font-bold text-left transition-all ${
                    isActive
                      ? "bg-[#FF6B00] text-black border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)]"
                      : "bg-[#0A0A0F] text-white border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(255,107,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px]"
                  }`}
                >
                  <Icon name={APP_ICONS[key]} size={20} />
                  {APP_LABELS[key]}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto bg-[#0D0D1A]">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-5xl font-black mb-4 text-white">ДОБРО ПОЖАЛОВАТЬ</h2>
                <p className="text-xl text-[#FF6B00] font-bold tracking-wider">ВЫБЕРИ РАЗДЕЛ В МЕНЮ СЛЕВА</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}