import { ITodoObject } from "../intefaces/ITodoObject";
import { IrowSetting } from "../intefaces/IrowSetting";

export class PipeFormat {
    constructor() { }
    private spaceSymbol: string = '-';
    private paddingNumber: number = 2;
    private padingSymbol: string = ' ';
    private separatorSymbol: string = '|';
    private completeTable?: string;
    private settings: IrowSetting[] = [
        {
            propertyName: 'importance',
            title: '!',
            max: 1,
            currentMax: 0,
        },
        {
            propertyName: 'user',
            title: 'user',
            max: 10,
            currentMax: 0,
        },
        {
            propertyName: 'date',
            title: 'date',
            max: 10,
            currentMax: 0,
        },
        {
            propertyName: 'comment',
            title: 'comment',
            max: 50,
            currentMax: 0,
        },
        {
            propertyName: 'filename',
            title: 'fileName',
            max: 15,
            currentMax: 0,
        },
    ];

    private addHeader(): string {
        let header: string = '';
        this.settings.map((title: IrowSetting) => {
            header =
                header +
                this.lineWidthControl(title) +
                this.separatorSymbol
        });
        header = header.substr(0, header.length - 1);
        return header;
    }

    private addHr(): string {
        let width: number = 0;
        this.settings.map((property: IrowSetting) => {
            width += property.currentMax + 2 * this.paddingNumber + 1;
        });
        return this.spaceSymbol.repeat(width - 1);
    }

    private addBody(todoCollection: ITodoObject[]): string {
        let body: string = '';
        todoCollection.map((todo: ITodoObject) => {
            body += this.lineWidthControl(todo) + "\n";
        });

        return body;
    }

    private makeLine(todo: ITodoObject) {

    }

    private lineWidthControl(line: IrowSetting | ITodoObject): string {
        if (line.title) { //Для отрисовки хэдера
            let lineLength = line.title.length;
            let validLine = this.padingSymbol.repeat(this.paddingNumber)
                + line.title
                + this.padingSymbol.repeat(line.currentMax - lineLength + this.paddingNumber);
            return validLine;
        } else { //Для отрисовки строки
            let validLine: string = '';
            Object.keys(line).forEach((property: string) => {
                let settingProperty: IrowSetting | undefined = this.settings.find(findingProperty => findingProperty.propertyName === property);
                let todoProperty: string = String(line[property]);

                if (!settingProperty) {
                    console.log(new TypeError('Неверная связка с this.settings'));
                    return;
                }
                todoProperty = todoProperty.length > settingProperty.currentMax
                    ? todoProperty.substr(0, settingProperty.currentMax - 3) + '...'
                    : todoProperty + this.padingSymbol.repeat(
                        settingProperty.currentMax - todoProperty.length);



                validLine += this.padingSymbol.repeat(this.paddingNumber)
                    + todoProperty
                    + this.padingSymbol.repeat(this.paddingNumber)
                    + this.separatorSymbol;


            });
            return validLine;
        }
    }

    public getValidList(todoCollection: ITodoObject[]): string {
        todoCollection.map((todo: ITodoObject) => {
            this.setSettings(todo);
        });
        return this.addHeader() + "\n"
            + this.addHr() + "\n"
            + this.addBody(todoCollection)
            + this.addHr();
    }

    private setSettings(todo: ITodoObject) {
        Object.keys(todo).forEach((property: string) => {
            let settingProperty: IrowSetting | undefined = this.settings.find(findingProperty => findingProperty.propertyName === property);
            let todoProperty: string = String(todo[property]);
            let todoPropertyLength: number = todoProperty ? todoProperty.length : 0;
            if (!settingProperty) {
                console.log(new TypeError('Неверная связка с this.settings'));
                return;
            }
            settingProperty.currentMax = Math.max(settingProperty.currentMax, todoPropertyLength);
            settingProperty.currentMax = settingProperty.currentMax > settingProperty.max ? settingProperty.max : settingProperty.currentMax;
        });
    }
}