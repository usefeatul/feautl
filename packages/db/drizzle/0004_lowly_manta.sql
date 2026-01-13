DROP INDEX "vote_post_anon_unique";--> statement-breakpoint
DROP INDEX "vote_comment_anon_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "vote_post_anon_unique" ON "vote" USING btree ("post_id","fingerprint");--> statement-breakpoint
CREATE UNIQUE INDEX "vote_comment_anon_unique" ON "vote" USING btree ("comment_id","fingerprint");--> statement-breakpoint
ALTER TABLE "vote" DROP COLUMN "ip_address";--> statement-breakpoint
ALTER TABLE "vote" DROP COLUMN "user_agent";