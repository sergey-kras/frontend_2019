export interface ITodoObject {
    comment: string;
    filename: string;
    user?: string | null;
    date?: Date | null;
    importance?: number;
}
