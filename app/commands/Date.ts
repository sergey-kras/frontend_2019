import { ICommand } from "../intefaces/ICommand";
import { ITodoObject } from "../intefaces/ITodoObject";

export class Date implements ICommand {
    constructor() { }

    todoCollection: ITodoObject[] = [];

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