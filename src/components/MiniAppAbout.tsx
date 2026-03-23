const PLAYERS = [
  { nickname: "ShadowX", realName: "Алексей Петров", rank: "Global Elite", team: "Neon Wolves", kills: 1842 },
  { nickname: "FireStrike", realName: "Дмитрий Иванов", rank: "Supreme", team: "Neon Wolves", kills: 1540 },
  { nickname: "QuantumK", realName: "Сергей Смирнов", rank: "Global Elite", team: "Iron Foxes", kills: 1901 },
  { nickname: "VortexZ", realName: "Максим Козлов", rank: "LEM", team: "Iron Foxes", kills: 1220 },
  { nickname: "NightBlade", realName: "Андрей Новиков", rank: "Supreme", team: "Dark Storm", kills: 1670 },
  { nickname: "GhostAim", realName: "Илья Федоров", rank: "Global Elite", team: "Dark Storm", kills: 1980 },
  { nickname: "CyberPulse", realName: "Роман Орлов", rank: "LEM", team: "Free Agent", kills: 1110 },
  { nickname: "StormRush", realName: "Павел Волков", rank: "Supreme", team: "Free Agent", kills: 1390 },
]

const RANK_COLORS: Record<string, string> = {
  "Global Elite": "#FFD700",
  "Supreme": "#C084FC",
  "LEM": "#60A5FA",
}

export function MiniAppAbout() {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6 border-b-[3px] border-[#FF6B00] pb-4">
        <h2 className="text-4xl font-black text-white">ИГРОКИ</h2>
        <span className="bg-[#FF6B00] text-black px-4 py-2 border-[3px] border-[#FF6B00] font-black text-lg">
          {PLAYERS.length} участников
        </span>
      </div>

      <div className="grid gap-3">
        {PLAYERS.map((player, i) => (
          <div
            key={i}
            className="bg-[#1A1A2E] p-4 border-[3px] border-[#FF6B00] shadow-[4px_4px_0px_0px_rgba(255,107,0,0.3)] flex items-center justify-between hover:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-[#FF6B00] font-black text-xl w-8">#{i + 1}</span>
              <div>
                <p className="text-white font-black text-lg leading-none">{player.nickname}</p>
                <p className="text-gray-400 text-sm font-medium">{player.realName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm font-bold">{player.team}</span>
              <span
                className="px-3 py-1 border-[2px] font-bold text-xs text-black"
                style={{ backgroundColor: RANK_COLORS[player.rank] || "#888", borderColor: RANK_COLORS[player.rank] || "#888" }}
              >
                {player.rank}
              </span>
              <span className="text-white font-black text-sm bg-[#0A0A0F] px-3 py-1 border-[2px] border-[#FF6B00]">
                {player.kills.toLocaleString()} K
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-gray-500 text-sm font-medium text-center">
        * Данные участников обновляются перед началом турнира
      </p>
    </div>
  )
}
