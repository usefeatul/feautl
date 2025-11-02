export default function NpsTool() {
  return (
    <div className="prose prose-sm sm:prose-base prose-zinc dark:prose-invert mt-6">
      <h2>What is NPS?</h2>
      <p>Net Promoter Score (NPS) measures loyalty based on 0–10 ratings.</p>
      <h3>Calculation</h3>
      <p><code>NPS = % Promoters (9–10) − % Detractors (0–6)</code></p>
      <p>Passives (7–8) count toward total responses but do not affect the score directly.</p>
    </div>
  )
}