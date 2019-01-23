import { ITodoObject } from "../intefaces/ITodoObject";

export class SortHelper {
    constructor() { }

    public static onlyInportant(todoCollection: ITodoObject[]): ITodoObject[] {
        return todoCollection.filter((todo: ITodoObject) => {
            return todo.importance > 0;
        });
    }

    public static byUser(todoCollection: ITodoObject[], user: string): ITodoObject[] {
        return todoCollection.filter((todo: ITodoObject) => {
            if (todo.user) {
                let filter = new RegExp(user, 'i');
                return filter.exec(todo.user);
            }
        });
    }
}