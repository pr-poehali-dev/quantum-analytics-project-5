const RULES = [
  {
    title: "Формат турнира",
    content:
      "Групповой этап: 2 группы по 4 команды, каждая команда играет Bo1 против остальных в группе. Топ-2 из каждой группы выходят в плей-офф. Полуфиналы — Bo3, финал — Bo3.",
  },
  {
    title: "Состав команды",
    content:
      "В каждой команде от 5 до 7 игроков (5 основных + до 2 запасных). Регистрация команды — не позднее чем за 48 часов до начала. Замена игрока допускается только до старта группового этапа.",
  },
  {
    title: "Технические требования",
    content:
      "Все игроки обязаны использовать лицензионную версию CS2. Пинг не должен превышать 80ms. В случае технических неполадок у игрока — пауза до 10 минут, затем замена или техническое поражение.",
  },
  {
    title: "Читерство и баны",
    content:
      "Любое использование читов, эксплойтов или стороннего ПО влечёт немедленную дисквалификацию команды. Все игроки проходят проверку VAC и EAC. Организаторы имеют право запросить демозапись любого матча.",
  },
  {
    title: "Призовой фонд",
    content:
      "1 место — 50% призового фонда. 2 место — 30%. 3-4 место — по 10%. Точная сумма призового фонда будет объявлена после закрытия регистрации.",
  },
]

export function MiniAppWritings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-[#FF6B00] pb-4 text-white">ПРАВИЛА</h2>

      <div className="space-y-4">
        {RULES.map((rule, i) => (
          <div
            key={i}
            className="bg-[#1A1A2E] p-6 border-[3px] border-[#FF6B00] shadow-[4px_4px_0px_0px_rgba(255,107,0,0.3)]"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="bg-[#FF6B00] text-black font-black px-2 py-1 text-sm border-[2px] border-[#FF6B00] shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-black text-white">{rule.title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed pl-10">{rule.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#1A1A2E] p-4 border-[3px] border-[#FF6B00] text-center">
        <p className="text-[#FF6B00] font-black">По всем вопросам обращайся к организатору турнира</p>
      </div>
    </div>
  )
}
