import { useEffect, useRef } from "react"

interface AnimatedRobotProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function AnimatedRobot({ className = "", size = "lg" }: AnimatedRobotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pupilRef = useRef<HTMLDivElement>(null)

  const sizePx = { sm: 80, md: 128, lg: 200 }[size]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !pupilRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      const maxDist = sizePx * 0.18
      const dist = Math.min(
        maxDist,
        Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)) / 4
      )

      const moveX = Math.cos(angle) * dist
      const moveY = Math.sin(angle) * dist

      pupilRef.current.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [sizePx])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,46,99,0.15) 0%, transparent 70%)",
          animation: "eye-pulse 3s ease-in-out infinite",
        }}
      />

      {/* Eyeball */}
      <div
        className="absolute inset-0 rounded-full border-4 border-black"
        style={{
          background: "radial-gradient(circle at 40% 35%, #ffffff, #d0d0d0 60%, #a0a0a0)",
          boxShadow: "0 0 30px rgba(255,46,99,0.5), 4px 4px 0px 0px rgba(0,0,0,1), inset 0 4px 20px rgba(0,0,0,0.15)",
        }}
      />

      {/* Iris */}
      <div
        className="absolute rounded-full"
        style={{
          width: "52%",
          height: "52%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle at 40% 35%, #FF6B00, #FF2E63 50%, #6b0020)",
          boxShadow: "0 0 15px rgba(255,46,99,0.6)",
        }}
      />

      {/* Pupil */}
      <div
        ref={pupilRef}
        className="absolute rounded-full"
        style={{
          width: "26%",
          height: "26%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle at 35% 35%, #333, #000)",
          transition: "transform 0.08s ease-out",
          boxShadow: "0 0 8px rgba(0,0,0,0.8)",
        }}
      />

      {/* Glare */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "14%",
          height: "14%",
          top: "22%",
          left: "32%",
          background: "rgba(255,255,255,0.85)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "7%",
          height: "7%",
          top: "34%",
          left: "44%",
          background: "rgba(255,255,255,0.5)",
        }}
      />

      <style>{`
        @keyframes eye-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}

export default AnimatedRobot
