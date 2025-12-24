import { eq, and } from "drizzle-orm"
import { board, post, user } from "@oreilla/db"

function mkSlug(t: string) {
  const base = t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  const suffix = Math.random().toString(36).slice(2, 8)
  return base ? `${base}-${suffix}` : `post-${suffix}`
}

export async function seedWorkspaceOnboarding(db: any, workspaceId: string, creatorUserId: string) {
  const founderId = "oreilla-founder"
  const founderEmail = "jean@oreilla.com"
  const [founder] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, founderId))
    .limit(1)
  if (!founder) {
    await db.insert(user).values({
      id: founderId,
      name: "Jean Daly",
      email: founderEmail,
      emailVerified: true,
      image: "/logo.svg",
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  } else {
    await db
      .update(user)
      .set({ name: "Jean Daly", image: "/logo.svg", updatedAt: new Date() })
      .where(eq(user.id, founderId))
  }

  const [featuresBoard] = await db
    .select({ id: board.id })
    .from(board)
    .where(and(eq(board.workspaceId, workspaceId), eq(board.slug, "features")))
    .limit(1)
  const [bugsBoard] = await db
    .select({ id: board.id })
    .from(board)
    .where(and(eq(board.workspaceId, workspaceId), eq(board.slug, "bugs")))
    .limit(1)

  const rows: Array<typeof post.$inferInsert> = []

  if (featuresBoard?.id) {
    rows.push(
      {
        boardId: featuresBoard.id,
        title: "Welcome to Oreilla – collect feedback, build a roadmap, and share updates",
        content: [
          "Oreilla is a lightweight feedback platform that helps teams collect ideas, track bugs, and keep users in the loop.",
          "Use the “Features” board for new ideas and the “Bugs” board for issues. Posts can be upvoted and commented on, so the most-wanted items rise to the top.",
          "Statuses (Pending → Review → Planned → Progress → Completed) show where each item stands. The public roadmap reflects these states so everyone knows what’s next.",
          "When work ships, publish a changelog entry to close the loop with your community. Invite teammates, set your brand colors, and connect a custom domain to make the space yours.",
        ].join("\n\n"),
        slug: mkSlug("Welcome to Oreilla"),
        authorId: founderId,
        isAnonymous: false,
        status: "published",
        roadmapStatus: "review",
        publishedAt: new Date(),
      },
      {
        boardId: featuresBoard.id,
        title: "How to submit your first idea",
        content: [
          "Click the “Submit idea” button, pick the “Features” board, and give your request a short, clear title.",
          "In the description, tell us the problem you’re facing or the value you’d like to see. The more context you share, the easier it is for the team to evaluate.",
          "Add tags such as UI, Security, or Support to keep things organized. We’ll suggest similar posts while you type so you can upvote an existing request instead of creating a duplicate.",
          "Once your idea is posted, others can upvote and comment. We’ll move it through the status pipeline and onto the roadmap when it’s planned for development.",
        ].join("\n\n"),
        slug: mkSlug("How to submit your first idea"),
        authorId: founderId,
        isAnonymous: false,
        status: "published",
        roadmapStatus: "pending",
        publishedAt: new Date(),
      },
      {
        boardId: featuresBoard.id,
        title: "Customize your space – branding, boards, and domain",
        content: [
          "Head to Settings → Branding to upload a logo, set a primary color, and choose a light or dark theme so the portal matches your product.",
          "Use Settings → Boards to control which boards are public, whether guests can post or comment, and whether member names are hidden.",
          "On the Starter or Professional plan you can connect a custom domain (e.g., feedback.yourapp.com) so the entire experience lives under your brand.",
        ].join("\n\n"),
        slug: mkSlug("Customize your space"),
        authorId: founderId,
        isAnonymous: false,
        status: "published",
        roadmapStatus: "planned",
        publishedAt: new Date(),
      }
    )
  }

  if (bugsBoard?.id) {
    rows.push(
      {
        boardId: bugsBoard.id,
        title: "How to report a bug",
        content: [
          "Choose the “Bugs” board, then write a short title that summarizes the issue.",
          "In the description, include:\n- What you were trying to do\n- The exact steps that led to the bug\n- What you expected to happen\n- What actually happened (include screenshots or screen recordings if possible)",
          "Add environment details such as browser, OS, and app version so we can reproduce the issue quickly. We’ll triage the report and update its status as we investigate and ship a fix.",
        ].join("\n\n"),
        slug: mkSlug("How to report a bug"),
        authorId: founderId,
        isAnonymous: false,
        status: "published",
        roadmapStatus: "pending",
        publishedAt: new Date(),
      },
      {
        boardId: bugsBoard.id,
        title: "Stay in the loop – votes, status, and changelog",
        content: [
          "Upvote a bug report to show you’re affected and help us prioritize.",
          "Watch the status to follow progress from Pending through Review, Progress, and Completed.",
          "When a fix ships, we’ll publish a changelog entry and automatically update the linked bug so you know it’s resolved.",
        ].join("\n\n"),
        slug: mkSlug("Stay in the loop"),
        authorId: founderId,
        isAnonymous: false,
        status: "published",
        roadmapStatus: "review",
        publishedAt: new Date(),
      }
    )
  }

  if (rows.length > 0) {
    await db.insert(post).values(rows)
  }
}