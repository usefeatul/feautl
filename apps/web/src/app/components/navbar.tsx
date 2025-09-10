import { GitHubIcon } from "@feedgot/ui/icons/github"
import { TwitterIcon } from "@feedgot/ui/icons/twitter"

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
      <nav className="flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm shadow-lg w-full max-w-4xl">
        <div className="flex items-center">
          <img src="/logo.svg" alt="FeedGot" className="h-8 w-auto" />
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <TwitterIcon size={20} className="text-current" />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <GitHubIcon size={20} className="text-current" />
          </a>
        </div>
      </nav>
    </div>
  )
}