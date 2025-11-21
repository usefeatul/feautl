"use client"

export default function RightInfo() {
  const blocks = [
    { label: "Collect", color: "bg-red-400" },
    { label: "Discuss", color: "bg-purple-500" },
    { label: "Plan", color: "bg-emerald-500" },
    { label: "Publish", color: "bg-blue-500" },
  ]
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      {blocks.map((b) => (
        <div key={b.label} className={`${b.color} text-white rounded-2xl px-6 sm:px-8 py-5 sm:py-6 text-2xl sm:text-3xl font-bold shadow-sm w-[160px] sm:w-[200px] text-center`}>{b.label}</div>
      ))}
    </div>
  )
}