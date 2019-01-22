import * as fs from "fs";

export class FileSystem {
    constructor() { }

    static getAllFilePathsWithExtension(directoryPath: string, extension: string, filePaths: Array<string> = []): Array<string> {
        const fileNames: Array<string> = fs.readdirSync(directoryPath);
        fileNames.map(
            (fileName) => {
                const filePath = directoryPath + '/' + fileName;
                // TODO: Раскомментить код ниже, если нужно искать файлы во всех папках
                if (fs.statSync(filePath).isDirectory()) {
                    this.getAllFilePathsWithExtension(filePath, extension, filePaths)
                }
                if (filePath.endsWith(`.${extension}`) && !filePath.includes('node_modules')) {
                    filePaths.push(filePath);
                }
            }
        )
        return filePaths;
    }

    static readFile(path: string, charset: string = 'utf8') {
        return fs.readFileSync(path, charset); 
    }
}