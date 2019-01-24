import { ITodoObject } from "../intefaces/ITodoObject";

export class SortHelper {
    constructor() { }

    public static onlyImportant(todoCollection: ITodoObject[]): ITodoObject[] {
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

    public static afterDate(todoCollection: ITodoObject[], date: string): ITodoObject[] {
        return todoCollection.filter((todo: ITodoObject) => {
            if (todo.date) {
                return new Date(todo.date) > new Date(date);
            }
        });
    }

    public static sortBy(todoCollection: ITodoObject[], type: string): ITodoObject[] {
        function dynamicSort(property: any) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a: any, b: any) {
                if(!a[property]) a[property] = '';
                if(!b[property]) b[property] = '';
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        return todoCollection.sort(dynamicSort(type));
    }
}