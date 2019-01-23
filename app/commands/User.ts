import { ICommand } from "../intefaces/ICommand";
import { ITodoObject } from "../intefaces/ITodoObject";
import { PipeFormat } from "../helpers/PipeFormat";

export class User implements ICommand {
    constructor() {
        this.pipeFormat = new PipeFormat();
    }

    todoCollection: ITodoObject[] = [];
    pipeFormat: PipeFormat;

    public sort(): void {

    }

    public show(): void {
        this.todoCollection.map((singleTodo: ITodoObject) => {
            console.log(`--------------
Путь: ${singleTodo.filename} ,
Юзер: ${singleTodo.user} ,
Приоритет: ${singleTodo.importance} ,
Комментарий: ${singleTodo.comment} ,
Дата: ${singleTodo.date} ,
--------------`)
        });
    }

    public set(todoCollection: ITodoObject[]): void {
        this.todoCollection = todoCollection;
    }
}