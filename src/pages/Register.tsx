import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const REGISTER_URL = "https://functions.poehali.dev/1b1d3743-b2b3-4a35-a46a-9f488c0059b1"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ real_name: "", nickname: "", steam_account: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("https://functions.poehali.dev/1b1d3743-b2b3-4a35-a06a-9f488c0059b1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Ошибка регистрации")
        return
      }

      navigate("/registered", { state: { player: data } })
    } catch {
      setError("Ошибка соединения. Попробуй ещё раз.")
    } finally {
      setLoading(false)
    }
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

      <div className="relative z-10 w-full max-w-md">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#FF6B00] font-bold mb-8 hover:opacity-70 transition-opacity"
        >
          <Icon name="ArrowLeft" size={18} />
          На главную
        </button>

        <div className="bg-[#1A1A2E] border-[3px] border-[#FF6B00] shadow-[6px_6px_0px_0px_rgba(255,107,0,0.4)] p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-1">РЕГИСТРАЦИЯ</h1>
            <p className="text-[#FF6B00] font-bold tracking-wider text-sm">КАДЕТСКАЯ CСЬКА · ТУРНИР ПО CS2</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white font-black text-sm mb-2 tracking-wider uppercase">Имя</label>
              <input
                type="text"
                value={form.real_name}
                onChange={(e) => setForm({ ...form, real_name: e.target.value })}
                placeholder="Иван Иванов"
                required
                className="w-full p-3 bg-[#0A0A0F] text-white border-[3px] border-[#FF6B00] font-medium focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-black text-sm mb-2 tracking-wider uppercase">Игровой ник</label>
              <input
                type="text"
                value={form.nickname}
                onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                placeholder="ShadowX"
                required
                className="w-full p-3 bg-[#0A0A0F] text-white border-[3px] border-[#FF6B00] font-medium focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-black text-sm mb-2 tracking-wider uppercase">Аккаунт Steam</label>
              <input
                type="text"
                value={form.steam_account}
                onChange={(e) => setForm({ ...form, steam_account: e.target.value })}
                placeholder="steamcommunity.com/id/твой_ник"
                required
                className="w-full p-3 bg-[#0A0A0F] text-white border-[3px] border-[#FF6B00] font-medium focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.5)] transition-all placeholder:text-gray-600"
              />
            </div>

            {error && (
              <div className="bg-red-900/40 border-[2px] border-red-500 p-3">
                <p className="text-red-400 font-bold text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#FF6B00] text-black border-[3px] border-[#FF6B00] font-black text-lg shadow-[4px_4px_0px_0px_rgba(255,107,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "ОТПРАВКА..." : "ЗАРЕГИСТРИРОВАТЬСЯ"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}