import { ITodoObject } from "./ITodoObject";

export interface ICommand {
    todoCollection?: Array<ITodoObject>;
    sort(type?: string): void;
    show(): void;
    set(todoCollection: ITodoObject[]): void;
}