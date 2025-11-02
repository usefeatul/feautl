export default function ChurnTool() {
  return (
    <div className="prose prose-sm sm:prose-base prose-zinc dark:prose-invert mt-6">
      <h2>Customer churn</h2>
      <p><code>Customer churn rate = (Customers lost during period ÷ Customers at start of period) × 100%</code></p>
      <h2>Revenue churn</h2>
      <p><code>Revenue churn rate = (MRR lost from churn ÷ MRR at start of period) × 100%</code></p>
    </div>
  )
}