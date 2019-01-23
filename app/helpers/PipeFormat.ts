import { ITodoObject } from "../intefaces/ITodoObject";
import { IrowSetting } from "../intefaces/IrowSetting";

export class PipeFormat {
    constructor() { }
    spaceSymbol: string = '-';
    paddingNumber: number = 2;
    padingSymbol: string = ' ';
    separatorSymbol: string = '|';
    completeTable?: string;
    headers: string[] = [];

    public addHeader() {
        let header: string = '';
        this.headers.map((title: string) => {
            header =
                header +
                this.padingSymbol.repeat(this.paddingNumber) +
                title +
                this.padingSymbol.repeat(this.paddingNumber) +
                this.separatorSymbol
        });

        header = header.substr(0, header.length - 1)
        console.log(header);
    }

    public addFooter() {
        this.completeTable +
            `-----------------------------------------------`;
    }

    public makeLine(todo: ITodoObject) {

    }

    public getValidList(todo: ITodoObject, settings: IrowSetting[]) {
        settings.map((setting: IrowSetting) => {
            this.headers.push(setting.title);
        })
    }
}