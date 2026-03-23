const SCHEDULE = [
  {
    stage: "Групповой этап",
    date: "Неизвестно",
    time: "Неизвестно",
    team1: "Неизвестно",
    team2: "Неизвестно",
    map: "Неизвестно",
    status: "tbd",
  },
  {
    stage: "Полуфинал",
    date: "Неизвестно",
    time: "Неизвестно",
    team1: "Неизвестно",
    team2: "Неизвестно",
    map: "Неизвестно",
    status: "tbd",
  },
  {
    stage: "Финал",
    date: "Неизвестно",
    time: "Неизвестно",
    team1: "Неизвестно",
    team2: "Неизвестно",
    map: "Неизвестно",
    status: "tbd",
  },
]

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  upcoming: { label: "Скоро", color: "#FF6B00" },
  live: { label: "LIVE", color: "#22C55E" },
  tbd: { label: "TBD", color: "#6B7280" },
  done: { label: "Завершён", color: "#374151" },
}

export function MiniAppResume() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-[#FF6B00] pb-4 text-white">РАСПИСАНИЕ</h2>

      <div className="space-y-4">
        {SCHEDULE.map((match, i) => {
          const status = STATUS_LABELS[match.status]
          return (
            <div
              key={i}
              className="bg-[#1A1A2E] p-5 border-[3px] border-[#FF6B00] shadow-[4px_4px_0px_0px_rgba(255,107,0,0.3)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#FF6B00] font-black text-sm tracking-wider uppercase">{match.stage}</span>
                <span
                  className="px-3 py-1 border-[2px] font-black text-xs text-white"
                  style={{ backgroundColor: status.color, borderColor: status.color }}
                >
                  {status.label}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-white font-black text-xl">{match.team1}</p>
                </div>

                <div className="text-center px-6">
                  <p className="text-[#FF6B00] font-black text-2xl">VS</p>
                  <p className="text-gray-400 text-xs font-bold mt-1">{match.map}</p>
                </div>

                <div className="text-center flex-1">
                  <p className="text-white font-black text-xl">{match.team2}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-700">
                <span className="text-gray-400 text-sm font-bold">{match.date}</span>
                <span className="text-[#FF6B00] font-black">{match.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}