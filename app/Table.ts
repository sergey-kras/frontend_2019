import { ITodoObject } from "./intefaces/ITodoObject";
import { FileSystem } from "./helpers/FileSystem";
import { ICommand } from "./intefaces/ICommand";
import { Show } from "./commands/Show";
import { PipeHelper } from "./helpers/PipeHelper";

export class Table {
    constructor(path: string, context: ICommand) {
        this.path = path;
        this.context = context;
    }

    private path: string;
    private context: ICommand;
    private todoCollection?: Array<ITodoObject>;

    public setContext(context: ICommand){
        this.context = context;
    }

    public parseFolders(): void {
        const filePaths = FileSystem.getAllFilePathsWithExtension(this.path, 'js');
        filePaths.map(filePath => {
            let todoObg: { path: string, body: string } = {
                path: filePath,
                body: FileSystem.readFile(filePath),
            }
            PipeHelper.getValidTodo(todoObg)
        });
    }

    public show() {
        this.context.show();
    }
}

let some = new Table('./',new Show());
some.parseFolders();