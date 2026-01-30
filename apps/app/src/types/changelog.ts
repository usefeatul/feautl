export interface ChangelogEntry {
    id: string;
    title: string;
    summary?: string;
    publishedAt?: string | Date;
    tags?: string[];
}
