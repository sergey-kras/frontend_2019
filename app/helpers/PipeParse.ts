import { ITodoObject } from "../intefaces/ITodoObject";

export class PipeParse {
    constructor() { }

    public static findNeedString(body: string): string[] {
        const needle: RegExp = /\/\/\s*TODO\s*:*/i;
        const stringCollections: string[] = body.split("\n");
        const linesWithTodo: string[] = [];

        stringCollections.map((line) => {
            if (needle.exec(line)) {
                let cleanLine = line.search(needle) > 0 ? line.replace(line.substring(0, line.search(needle)), '') : line;
                cleanLine = cleanLine.replace(needle, '');
                linesWithTodo.push(cleanLine);
            }
        });

        return linesWithTodo;
    }

    public static getComment(line: string[]): string {
        return line[line.length - 1];
    }

    public static getUser(line: string[]) {
        if (line.length === 3) return line[0];
        if (line.length === 1) return null;
        if (!PipeParse.getDate(line)) {
            return line[0];
        }
    }

    public static getDate(line: string[]): Date | null {
        const needle: RegExp = /\d{4}(\-\d{2}(\-\d{2})*)*/;
        let result: Date | null = null;

        line.map((param: string) => {
            if (needle.exec(param) && /^[^/a-zA-ZА-Яа-я()]+$/.exec(param)) {
                result = new Date(param.split('-').join(','));
                result.setDate(result.getDate()+1);
            }
        });

        return result;
    }

    public static getImportance(line: string) {
        return line.split('!').length - 1;
    }

    public static getValidTodo(todoObject: { path: string, body: string }): ITodoObject[] | null {
        const todoLines: string[] = PipeParse.findNeedString(todoObject.body);
        const preValidTodo: { path: string, lines: string[] } = { path: todoObject.path, lines: todoLines };
        let resultValidTodo: ITodoObject[] = [];

        preValidTodo.lines.map((line: string) => {
            const sLine: string[] = line.split(';');
            let validTodo: ITodoObject = {
                importance: PipeParse.getImportance(line),
                user: PipeParse.getUser(sLine),
                date: PipeParse.getDate(sLine),
                comment: PipeParse.getComment(sLine).replace(/^\s*/,'').replace(/\s*$/,''),
                filename: todoObject.path.replace(process.cwd() + '/', ''),
            };
            resultValidTodo.push(validTodo);
        });

        if (resultValidTodo[0]) return resultValidTodo;
        return null;
    }

    public static datePattern(todoCollection: ITodoObject[]) {
        todoCollection.map((todo: ITodoObject) => {
            if (todo.date) {
                todo.date = new Date(todo.date).toISOString().slice(0, 10);;
            } else {
                todo.date = '';
            }
        });
        return todoCollection;
    }

    public static importantPattern(todoCollection: ITodoObject[]){
        todoCollection.map((todo: ITodoObject) => {
            todo.importance = todo.importance > 0 ? '!' : '';
        });
        return todoCollection;
    }

    public static userPattern(todoCollection: ITodoObject[]){
        todoCollection.map((todo: ITodoObject) => {
            todo.user = todo.user ? todo.user : '';
        });
        return todoCollection;
    }
}