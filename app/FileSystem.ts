import * as fs from "fs";

export class FileSystem {
    constructor() { }

    public getAllFilePathsWithExtension(directoryPath: string, extension: string, filePaths: Array<string> = []) {
        const fileNames: Array<string> = fs.readdirSync(directoryPath);
        fileNames.map(
            (fileName) => {
                const filePath = directoryPath + '/' + fileName;
                if (fs.statSync(filePath).isDirectory()) {
                    this.getAllFilePathsWithExtension(filePath, extension, filePaths)
                } else if (filePath.endsWith(`.${extension}`) && !filePath.includes('node_modules')) { 
                    console.log(filePath);
                    filePaths.push(filePath);
                }
            }
        )
        return filePaths[0];
    }
}

let FileSystemObg = new FileSystem();
console.log(FileSystemObg.getAllFilePathsWithExtension('../', 'js'));