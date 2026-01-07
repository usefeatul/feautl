ALTER TABLE "workspace_domain" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workspace_domain" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "workspace_invite" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workspace_invite" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "workspace_member" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workspace_member" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "board" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "board" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "board_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "duplicate_of_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_merge" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_merge" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "post_merge" ALTER COLUMN "source_post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_merge" ALTER COLUMN "target_post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_report" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_report" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "post_report" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_tag" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_tag" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "post_tag" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_tag" ALTER COLUMN "tag_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_update" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post_update" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "post_update" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tag" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tag" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "parent_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment_mention" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment_mention" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comment_mention" ALTER COLUMN "comment_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment_reaction" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment_reaction" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comment_reaction" ALTER COLUMN "comment_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment_report" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment_report" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "comment_report" ALTER COLUMN "comment_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_vote_history" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_vote_history" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vote" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vote" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vote" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vote" ALTER COLUMN "comment_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vote_aggregate" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vote_aggregate" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vote_aggregate" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vote_aggregate" ALTER COLUMN "comment_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "branding_config" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "branding_config" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "workspace_slug_reservation" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workspace_slug_reservation" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "changelog_entry" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "changelog_entry" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "changelog_entry" ALTER COLUMN "board_id" SET DATA TYPE text;