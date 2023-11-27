import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'tableValue'
})
export class TableValuePipe implements PipeTransform {

    constructor() {
    }

    transform(value: any, ...args: { key: string }[]): string {
        const key = args[0].key;
        switch (key) {
            case "ritaglio":
                return value == 1 ? "Ritaglio" : "";
            default:
                return value;
        }
    }
}