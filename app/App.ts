const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

app();

function app() {
    const files = getFiles();

    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
        console.log(process.cwd());
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!