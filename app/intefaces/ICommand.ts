import { ITodoObject } from "./ITodoObject";

export interface ICommand {
    todoCollection: Array<ITodoObject>;
    show(): void;
    sort(): void;
}