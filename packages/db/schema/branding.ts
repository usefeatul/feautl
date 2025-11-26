import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  json,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { workspace } from "./workspace";

// Extended branding configuration
export const brandingConfig = pgTable(
  "branding_config",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),

    // Color scheme
    primaryColor: text("primary_color").default("#3b82f6"),

    // Theme settings
    theme: text("theme", { enum: ["light", "dark", "system"] }).default(
      "system"
    ),

    // Layout preferences
    layoutStyle: text("layout_style", {
      enum: ["compact", "comfortable", "spacious"],
    }).default("comfortable"),
    sidebarPosition: text("sidebar_position", {
      enum: ["left", "right"],
    }).default("left"),

    // Branding visibility
    hidePoweredBy: boolean("hide_powered_by").default(false),
    showWorkspaceName: boolean("show_workspace_name").default(true),
    showLogo: boolean("show_logo").default(true),

    // Custom domain settings
    customDomain: text("custom_domain"),
    sslEnabled: boolean("ssl_enabled").default(false),
    domainVerified: boolean("domain_verified").default(false),

    // Social and SEO
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    ogImage: text("og_image"),

    // Advanced customization
    customFields: json("custom_fields").$type<{
      headerLinks?: { name: string; url: string; external: boolean }[];
      footerText?: string;
      announcementBar?: { text: string; color: string; enabled: boolean };
      socialLinks?: { platform: string; url: string }[];
    }>(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) =>
    ({
      brandingWorkspaceUnique: uniqueIndex("branding_workspace_unique").on(
        table.workspaceId
      ),
    }) as const
);

// Predefined color palettes
export const colorPalette = pgTable("color_palette", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  colors: json("colors")
    .$type<{
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    }>()
    .notNull(),
  isDefault: boolean("is_default").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type BrandingConfig = typeof brandingConfig.$inferSelect;
export type ColorPalette = typeof colorPalette.$inferSelect;
