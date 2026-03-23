import { useEffect, useState } from "react"
import Icon from "@/components/ui/icon"

interface Player {
  id: number
  real_name: string
  nickname: string
  steam_account: string
  registered_at: string
}

export function MiniAppAbout() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("https://functions.poehali.dev/1b1d3743-b2b3-4a35-a06a-9f488c0059b1")
      .then((r) => r.json())
      .then((data) => setPlayers(data.players || []))
      .catch(() => setError("Не удалось загрузить список игроков"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6 border-b-[3px] border-[#FF6B00] pb-4">
        <h2 className="text-4xl font-black text-white">ИГРОКИ</h2>
        {!loading && !error && (
          <span className="bg-[#FF6B00] text-black px-4 py-2 border-[3px] border-[#FF6B00] font-black text-lg">
            {players.length} участников
          </span>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 gap-3">
          <Icon name="Loader2" size={28} className="text-[#FF6B00] animate-spin" />
          <span className="text-gray-400 font-bold">Загрузка...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border-[3px] border-red-500 p-6 text-center">
          <p className="text-red-400 font-bold">{error}</p>
        </div>
      )}

      {!loading && !error && players.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Icon name="Users" size={48} className="text-gray-600" />
          <p className="text-gray-400 font-bold text-lg">Пока нет зарегистрированных игроков</p>
          <p className="text-gray-600 text-sm">Будь первым — нажми «Зарегистрироваться» на главной</p>
        </div>
      )}

      {!loading && !error && players.length > 0 && (
        <div className="grid gap-3">
          {players.map((player, i) => (
            <div
              key={player.id}
              className="bg-[#1A1A2E] p-4 border-[3px] border-[#FF6B00] shadow-[4px_4px_0px_0px_rgba(255,107,0,0.3)] flex items-center justify-between hover:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#FF6B00] font-black text-xl w-8">#{i + 1}</span>
                <div>
                  <p className="text-white font-black text-lg leading-none">{player.nickname}</p>
                  <p className="text-gray-400 text-sm font-medium">{player.real_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm font-medium hidden sm:block">{player.steam_account}</span>
                <span className="text-gray-500 text-xs font-medium bg-[#0A0A0F] px-2 py-1 border border-gray-700">
                  {new Date(player.registered_at).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
