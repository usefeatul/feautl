"use client"

export default function RightInfo() {
  const blocks = [
    { label: "Collect", color: "bg-red-400" },
    { label: "Discuss", color: "bg-purple-500" },
    { label: "Plan", color: "bg-emerald-500" },
    { label: "Publish", color: "bg-blue-500" },
  ]
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full">
      {blocks.map((b) => (
        <div key={b.label} className={`${b.color} text-white rounded-2xl px-10 py-8 text-4xl font-bold shadow-sm w-[320px] text-center`}>{b.label}</div>
      ))}
    </div>
  )
}