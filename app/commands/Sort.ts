import { ICommand } from "../intefaces/ICommand";
import { ITodoObject } from "../intefaces/ITodoObject";
import { PipeFormat } from "../helpers/PipeFormat";
import { SortHelper } from "../helpers/sortHelper";
import { PipeParse } from "../helpers/pipeParse";

export class Sort implements ICommand {
    constructor() {
        this.pipeFormat = new PipeFormat();
    }

    todoCollection: ITodoObject[] = [];
    compileTodoCollection: ITodoObject[] = [];
    pipeFormat: PipeFormat;

    public sort(command: any): void {
        this.compileTodoCollection = this.todoCollection;
        switch (true) {
            case command[1] === 'importance':
                this.compileTodoCollection = SortHelper.sortBy(this.todoCollection, '-importance');
                break;
            case command[2] === 'user':
                this.compileTodoCollection = SortHelper.sortBy(this.todoCollection, '-user');
                break;
            case command[3] === 'date':
                this.compileTodoCollection = SortHelper.sortBy(this.todoCollection, '-date');
                break;
            default:
                return;
        }

        this.compileTodoCollection = PipeParse.datePattern(this.todoCollection);
        this.compileTodoCollection = PipeParse.importantPattern(this.todoCollection);
        this.compileTodoCollection = PipeParse.userPattern(this.todoCollection);
    }

    public show(): void {
        console.log(this.pipeFormat.getValidList(this.compileTodoCollection));
    }

    public set(todoCollection: ITodoObject[]): void {
        this.todoCollection = todoCollection;
    }
}