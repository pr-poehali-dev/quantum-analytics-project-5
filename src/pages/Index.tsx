import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import { AnimatedRobot } from "@/components/AnimatedRobot"
import { ChatPanel } from "@/components/ChatPanel"
import { Dock } from "@/components/Dock"
import { OSOverlay } from "@/components/OSOverlay"
import { Button } from "@/components/ui/button"

function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[] = []
    const colors = ["#FF6B00", "#FF2E63", "#ffffff", "#ffaa44"]

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          life: 1,
          maxLife: 0.6 + Math.random() * 0.6,
          size: 2 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }
    window.addEventListener("mousemove", onMove)

    let raf: number
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08
        p.life -= 0.03
        if (p.life <= 0) { particles.splice(i, 1); continue }
        const alpha = p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha * 0.8
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <CursorTrail />
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