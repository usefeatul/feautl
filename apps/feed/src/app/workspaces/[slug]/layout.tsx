import { Container } from "@/components/global/container"
import BrandVarsEffect from "@/components/global/BrandVarsEffect"
import Sidebar from "@/components/sidebar/Sidebar"
import MobileSidebar from "@/components/sidebar/MobileSidebar"
import { getBrandingColorsBySlug } from "@/lib/workspace"
import WorkspaceHeader from "@/components/global/WorkspaceHeader"

export const dynamic = "force-dynamic"

export default async function WorkspaceLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { primary: p } = await getBrandingColorsBySlug(slug)
  return (
    <Container className="min-h-screen flex gap-6" maxWidth="8xl">
      <style>{`:root{--primary:${p};--ring:${p};--sidebar-primary:${p};}`}</style>
      <BrandVarsEffect primary={p} />
      <Sidebar />
      <main className="mt-4 flex-1 pb-20 md:pb-0">
        <WorkspaceHeader />
        {children}
      </main>
      <MobileSidebar />
    </Container>
  )
}
