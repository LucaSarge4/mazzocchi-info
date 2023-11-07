import { Component } from "@angular/core";
import { Observable, map, of } from "rxjs";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    displayedColumns: { key: string, label: string }[] = [
        { label: 'Codice', key: 'code' },
        { label: 'Materiale', key: 'material' },
        { label: 'Spessore', key: 'thickness' },
        { label: 'DimX', key: 'dimX' },
        { label: 'DimY', key: 'dimY' },
        { label: 'Area', key: 'area' },
        { label: 'Peso', key: 'weight' },
        { label: 'Ritaglio', key: 'cutout' },
        { label: 'Qta', key: 'quantity' },
        { label: 'Udata1', key: 'udata1' },
        { label: 'Udata2', key: 'udata2' },
        { label: 'Udata3', key: 'udata3' }
    ];

    columnsKeys = this.displayedColumns.map(elm => elm.key);

    dataSource$: Observable<any[]>;

    constructor() {
        this.dataSource$ = of([
            { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
            { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
            { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
            { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
            { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
            { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
            { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
            { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
            { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
        ]).pipe(
            map(elm => elm as unknown as any[])
        );
    }
}