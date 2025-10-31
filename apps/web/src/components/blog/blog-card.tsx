import Link from "next/link";
import type { MarblePost } from "@/types/marble";
import { Card, CardContent } from "@feedgot/ui/components/card";

type BlogCardProps = {
  post: MarblePost;
};

export function BlogCard({ post }: BlogCardProps) {
  const date = post.publishedAt ? new Date(post.publishedAt) : null;
  const author =
    post.author ??
    (post.authors && post.authors.length > 0 ? post.authors[0] : null);
  const toPlain = (s?: string | null) => (s ? s.replace(/<[^>]+>/g, " ") : "");
  const words = `${toPlain(post.content)} ${toPlain(post.excerpt)}`
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const readMinutes = words.length
    ? Math.max(1, Math.round(words.length / 200))
    : null;
  const tags = post.tags ?? [];
  const category = post.category ?? null;
  const label = category?.name ?? tags[0]?.name ?? null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full"
      prefetch={false}
    >
      <Card className="h-full overflow-hidden transition-colors group-hover:bg-muted/30 flex flex-col">
        {post.coverImage ? (
          <div className="aspect-[16/9] w-full relative">
            <img
              src={post.coverImage ?? ""}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : null}
        <CardContent className="py-6 flex-1 flex flex-col">
          {label ? (
            <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {label}
            </span>
          ) : null}

          <div className="mt-3 flex items-center gap-2">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={author?.name ?? "Author"}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : null}
            {author?.name ? (
              <span className="text-xs text-muted-foreground">
                {author.name}
              </span>
            ) : null}
            {date ? (
              <span className="text-xs text-muted-foreground">
                {date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Latest</span>
            )}
            {readMinutes ? (
              <span className="text-xs text-muted-foreground">
                — {readMinutes} min read
              </span>
            ) : null}
          </div>

          <h3 className="mt-2 text-lg font-semibold text-foreground line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="text-muted-foreground mt-2 line-clamp-2">
              {post.excerpt}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}
