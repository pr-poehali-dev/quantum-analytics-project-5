import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export default function RegisteredPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const player = location.state?.player

  if (!player) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #FF6B00 1px, transparent 1px), linear-gradient(to bottom, #FF6B00 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      />

      <div className="relative z-10 w-full max-w-md text-center">
        {/* Big checkmark */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#FF6B00] border-[4px] border-[#FF6B00] shadow-[6px_6px_0px_0px_rgba(255,107,0,0.4)] flex items-center justify-center">
            <Icon name="Check" size={48} className="text-black" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-white mb-2">ГОТОВО!</h1>
        <p className="text-[#FF6B00] font-bold tracking-widest text-sm mb-8">ЗАЯВКА ПРИНЯТА</p>

        {/* Player card */}
        <div className="bg-[#1A1A2E] border-[3px] border-[#FF6B00] shadow-[6px_6px_0px_0px_rgba(255,107,0,0.4)] p-6 mb-8 text-left">
          <p className="text-gray-400 font-bold text-xs tracking-wider uppercase mb-4">Данные участника</p>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <span className="text-gray-400 font-medium text-sm">Имя</span>
              <span className="text-white font-black">{player.real_name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <span className="text-gray-400 font-medium text-sm">Ник</span>
              <span className="text-[#FF6B00] font-black text-lg">{player.nickname}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <span className="text-gray-400 font-medium text-sm">Steam</span>
              <span className="text-white font-bold text-sm">{player.steam_account}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium text-sm">Турнир</span>
              <span className="text-white font-bold text-sm">Open Season 2025</span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm font-medium mb-8">
          Следи за расписанием матчей на главной странице
        </p>

        <Button
          onClick={() => navigate("/")}
          className="w-full h-14 bg-[#FF6B00] text-black border-[3px] border-[#FF6B00] font-black text-lg shadow-[4px_4px_0px_0px_rgba(255,107,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          НА ГЛАВНУЮ
        </Button>
      </div>
    </div>
  )
}
