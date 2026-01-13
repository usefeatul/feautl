import Link from "next/link"

export default function NotFound() {
  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden">
      <div className="mx-auto max-w-lg  text-center">
        <h1 className="text-3xl font-sans tracking-wider ">Whoops…</h1>
        <p className="text-accent mt-2 text-sm font-mono">
          Sorry, there’s no such page. Go back
          <Link
            href="/"
            className="ml-1 text-primary text-sm font-normal hover:text-primary"
            aria-label="Go back home"
          >
            home?
          </Link>
        </p>
      </div>
    </main>
  )
}
