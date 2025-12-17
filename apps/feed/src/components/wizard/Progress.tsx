"use client"

export default function Progress({ step, total }: { step: number; total: number }) {
  const progress = ((step + 1) / total) * 100

  return (
    <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-primary transition-all duration-500 ease-out" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  )
}