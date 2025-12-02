import { j } from "./jstack"

const routerImports = {
  workspace: () => import("./router/workspace").then((m) => m.createWorkspaceRouter()),
  board: () => import("./router/board").then((m) => m.createBoardRouter()),
  branding: () => import("./router/branding").then((m) => m.createBrandingRouter()),
  team: () => import("./router/team").then((m) => m.createTeamRouter()),
  storage: () => import("./router/storage").then((m) => m.createStorageRouter()),
  changelog: () => import("./router/changelog").then((m) => m.createChangelogRouter()),
}

const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler)

const appRouter = j.mergeRouters(api, {
  workspace: routerImports.workspace,
  board: routerImports.board,
  branding: routerImports.branding,
  team: routerImports.team,
  storage: routerImports.storage,
  changelog: routerImports.changelog,
})

export type AppRouter = typeof appRouter
export default appRouter
