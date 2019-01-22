import { ITodoObject } from "./intefaces/ITodoObject";
import { FileSystem } from "./helpers/FileSystem";
import { ICommand } from "./intefaces/ICommand";
import { Show } from "./commands/Show";
import { PipeParse } from "./helpers/PipeParse";

export class Table {
    constructor(path: string, context: ICommand) {
        this.path = path;
        this.context = context;
        this.parseFolders();
    }

    private path: string;
    private context: ICommand;
    private todoCollection: ITodoObject[] = [];

    public setContext(context: ICommand): void {
        this.context = context;
    }

    public parseFolders(): void {
        const filePaths = FileSystem.getAllFilePathsWithExtension(this.path, 'js');
        filePaths.map(filePath => {

            let todoObg: { path: string, body: string } = {
                path: filePath,
                body: FileSystem.readFile(filePath),
            }

            const validTodoCollection = PipeParse.getValidTodo(todoObg);
            if (validTodoCollection) {
                validTodoCollection.map((todoObg: ITodoObject) => {
                    this.todoCollection.push(todoObg);
                });
            }

        });
    }

    public sort(type?: string) {
        this.context.sort(type);
    }

    public setTodoCollectionToContext() {
        this.context.set(this.todoCollection);
    }

    public show() {
        this.context.show();
    }
}