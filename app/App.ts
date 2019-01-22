import { readLineConsole } from "./helpers/Console";
import { Table } from "./Table";
import { Show } from "./commands/Show";

class App {
    constructor(){}
    static table: Table;

    public static start() {
        App.table = new Table(process.cwd(), new Show());
        App.table.setTodoCollectionToContext();

        console.log('Please, write your command!');
        readLineConsole(this.processCommand);
    }

    public static processCommand(command: string) {
        switch (command) {
            case 'exit':
                process.exit(0);
                break;
            case 'show':
                App.table.show();
                break;
            default:
                console.log('wrong command');
                break;
        }
    }
}

App.start()


// TODO you can do it!
