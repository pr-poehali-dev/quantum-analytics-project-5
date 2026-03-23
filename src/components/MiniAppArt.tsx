const GALLERY: { title: string; event: string; year: string; emoji: string }[] = []

export function MiniAppArt() {
  return (
    <div className="max-w-4xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-[#FF6B00] pb-4 text-white">ГАЛЕРЕЯ</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY.map((item, i) => (
          <div
            key={i}
            className="bg-[#1A1A2E] border-[3px] border-[#FF6B00] shadow-[4px_4px_0px_0px_rgba(255,107,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          >
            <div className="aspect-square bg-gradient-to-br from-[#1A1A2E] to-[#0A0A0F] border-b-[3px] border-[#FF6B00] flex items-center justify-center">
              <span className="text-7xl">{item.emoji}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-black text-white mb-1">{item.title}</h3>
              <p className="text-sm text-[#FF6B00] font-bold">{item.event}</p>
              <p className="text-sm text-gray-500 font-medium">{item.year}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 font-medium">Фото и видео с турниров будут добавляться по мере проведения матчей</p>
      </div>
    </div>
  )
}