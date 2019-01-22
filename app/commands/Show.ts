import { ICommand } from "../intefaces/ICommand";
import { ITodoObject } from "../intefaces/ITodoObject";

export class Show implements ICommand {
    constructor() {}

    todoCollection?: Array<ITodoObject>;

    public sort(todoCollection: Array<ITodoObject>): void {
        this.todoCollection = todoCollection;
    }

    public show(): void {
        console.log(this.todoCollection);
    }
}