export interface Board {
    id: string;
    name: string;
    slug: string;
    isVisible?: boolean;
}

export interface BoardSettings extends Board {
    description?: string;
    isDefault?: boolean;
}
