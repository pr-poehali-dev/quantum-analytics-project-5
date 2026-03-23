import { useNavigate } from "react-router-dom"
import { AnimatedRobot } from "@/components/AnimatedRobot"
import { ChatPanel } from "@/components/ChatPanel"
import { Dock } from "@/components/Dock"
import { OSOverlay } from "@/components/OSOverlay"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      {/* Landing Page - Fixed height, no scroll */}
      <div className="h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ background: "#0A0A0F" }}>
        {/* Gradient wave blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div style={{
            position: "absolute", width: "70%", height: "70%",
            top: "-20%", left: "-15%",
            background: "radial-gradient(ellipse, rgba(255,46,99,0.18) 0%, transparent 70%)",
            animation: "blob1 10s ease-in-out infinite",
            borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", width: "60%", height: "60%",
            bottom: "-15%", right: "-10%",
            background: "radial-gradient(ellipse, rgba(255,107,0,0.15) 0%, transparent 70%)",
            animation: "blob2 13s ease-in-out infinite",
            borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", width: "50%", height: "50%",
            top: "30%", left: "30%",
            background: "radial-gradient(ellipse, rgba(80,0,180,0.12) 0%, transparent 70%)",
            animation: "blob3 16s ease-in-out infinite",
            borderRadius: "50%",
          }} />
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(28)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: i % 3 === 0 ? "2px" : "1px",
              height: i % 3 === 0 ? "2px" : "1px",
              borderRadius: "50%",
              background: i % 2 === 0 ? "rgba(255,107,0,0.7)" : "rgba(255,255,255,0.5)",
              top: `${(i * 37 + 5) % 100}%`,
              left: `${(i * 53 + 10) % 100}%`,
              animation: `sparkle ${2 + (i % 4)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
            }} />
          ))}
        </div>

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        <style>{`
          @keyframes blob1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(5%, 8%) scale(1.08); }
            66% { transform: translate(-4%, 4%) scale(0.95); }
          }
          @keyframes blob2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            40% { transform: translate(-6%, -5%) scale(1.1); }
            70% { transform: translate(4%, -8%) scale(0.96); }
          }
          @keyframes blob3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-8%, 6%) scale(1.12); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.5); }
          }
        `}</style>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 max-w-lg w-full">
          {/* AI Robot */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <AnimatedRobot />
            <h1 className="text-4xl font-black text-center text-white">Кадетская CSка</h1>
            <p className="text-[#FF6B00] font-bold text-lg tracking-widest uppercase">Турнир по CS2</p>
          </div>

          {/* Chat Panel */}
          <ChatPanel />

          <Button
            onClick={() => navigate("/register")}
            className="mt-4 px-8 h-12 bg-[#FF6B00] text-black border-[3px] border-[#FF6B00] font-black text-base shadow-[4px_4px_0px_0px_rgba(255,107,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(255,107,0,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all tracking-wider"
          >
            ЗАРЕГИСТРИРОВАТЬСЯ
          </Button>
        </div>

        <div className="relative z-10 pb-4">
          <Dock />
        </div>
      </div>

      {/* OS Overlay */}
      <OSOverlay />
    </>
  )
}