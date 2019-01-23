import { ICommand } from "../intefaces/ICommand";
import { ITodoObject } from "../intefaces/ITodoObject";
import { PipeFormat } from "../helpers/PipeFormat";
import { PipeParse } from "../helpers/pipeParse";

export class Show implements ICommand {
    constructor() {
        this.pipeFormat = new PipeFormat();
    }

    todoCollection: ITodoObject[] = [];
    pipeFormat: PipeFormat;

    public sort(): void {
        this.todoCollection = PipeParse.datePattern(this.todoCollection);
        this.todoCollection = PipeParse.importantPattern(this.todoCollection);
        this.todoCollection = PipeParse.userPattern(this.todoCollection);
    }

    public show(): void {
        console.log(this.pipeFormat.getValidList(this.todoCollection));
//         this.todoCollection.map((singleTodo: ITodoObject) => {
//             console.log(`--------------
// Путь: ${singleTodo.filename} ,
// Юзер: ${singleTodo.user} ,
// Приоритет: ${singleTodo.importance} ,
// Комментарий: ${singleTodo.comment} ,
// Дата: ${singleTodo.date} ,
// --------------`)
//         });
    }

    public set(todoCollection: ITodoObject[]): void {
        this.todoCollection = todoCollection;
    }
}