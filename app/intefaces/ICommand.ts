import { ITodoObject } from "./ITodoObject";

export interface ICommand {
    todoCollection?: Array<ITodoObject>;
    sort(todoCollection: Array<ITodoObject>): void;
    show(): void;
}