import { ICommand } from "../intefaces/ICommand";
import { ITodoObject } from "../intefaces/ITodoObject";
import { PipeFormat } from "../helpers/PipeFormat";
import { SortHelper } from "../helpers/sortHelper";
import { PipeParse } from "../helpers/pipeParse";

export class User implements ICommand {
    constructor() {
        this.pipeFormat = new PipeFormat();
    }

    todoCollection: ITodoObject[] = [];
    pipeFormat: PipeFormat;

    public sort(command: string): void {
        let user = command.replace('user ','');
        this.todoCollection = SortHelper.byUser(this.todoCollection, user);
        this.todoCollection = PipeParse.datePattern(this.todoCollection);
        this.todoCollection = PipeParse.importantPattern(this.todoCollection);
        this.todoCollection = PipeParse.userPattern(this.todoCollection);
    }

    public show(): void {
        console.log(this.pipeFormat.getValidList(this.todoCollection));
    }

    public set(todoCollection: ITodoObject[]): void {
        this.todoCollection = todoCollection;
    }
}