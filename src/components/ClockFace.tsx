export default function ClockFace({ hour }: { hour: number }) {
  const angle = (hour % 12) * 30
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 200 200" className="h-48 w-48 drop-shadow-lg" role="img" aria-label="Reloj">
        <circle cx="100" cy="100" r="92" fill="#fff" stroke="#f59e0b" strokeWidth="10" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = ((i + 1) * 30 * Math.PI) / 180
          return (
            <text key={i} x={100 + 68 * Math.sin(a)} y={100 - 68 * Math.cos(a) + 8} textAnchor="middle" fontSize="22" fontWeight="800" fill="#334155" fontFamily="Baloo 2, sans-serif">
              {i + 1}
            </text>
          )
        })}
        <line x1="100" y1="100" x2="100" y2="42" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
        <line x1="100" y1="100" x2="100" y2="55" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" transform={`rotate(${angle} 100 100)`} />
        <circle cx="100" cy="100" r="7" fill="#334155" />
      </svg>
    </div>
  )
}
