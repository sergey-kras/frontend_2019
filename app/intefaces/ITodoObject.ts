export interface ITodoObject {
    comment: string;
    filename: string;
    user?: string | null;
    date?: Date | null | string;
    importance: number | string;
    [key:string]: any;
}
