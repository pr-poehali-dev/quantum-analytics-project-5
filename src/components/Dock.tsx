import { useUIStore } from "@/lib/ui-store"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type AppType = "about" | "resume" | "writings" | "art"

const DOCK_ITEMS: Array<{ id: AppType; label: string; icon: string }> = [
  { id: "about", label: "Игроки", icon: "Users" },
  { id: "resume", label: "Расписание", icon: "CalendarDays" },
  { id: "writings", label: "Правила", icon: "ScrollText" },
  { id: "art", label: "Галерея", icon: "Image" },
]

export function Dock() {
  const { openOS } = useUIStore()

  return (
    <div className="flex gap-3 p-4 bg-[#1A1A2E] border-[3px] border-[#FF6B00] shadow-[4px_4px_0px_0px_rgba(255,107,0,0.5)]">
      {DOCK_ITEMS.map(({ id, label, icon }) => (
        <Button
          key={id}
          onClick={() => openOS(id)}
          className="w-14 h-14 p-0 flex flex-col gap-1 bg-[#0A0A0F] text-[#FF6B00] border-[3px] border-[#FF6B00] shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] hover:bg-[#FF6B00] hover:text-black hover:shadow-[1px_1px_0px_0px_rgba(255,107,0,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          aria-label={label}
          title={label}
        >
          <Icon name={icon} size={18} />
          <span className="text-[8px] font-bold leading-none">{label}</span>
        </Button>
      ))}
    </div>
  )
}
