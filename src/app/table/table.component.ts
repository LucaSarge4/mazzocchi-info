import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, delay, distinctUntilChanged, forkJoin, map, take, tap } from "rxjs";
import * as XLSX from 'xlsx';
import { BackendService } from "../services/backend.service";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    paginatorState$ = new BehaviorSubject<{ page: number, size: number }>({
        page: 1,
        size: 20,
    });

    responseConfig$ = new BehaviorSubject({
        totalCount: 0,
        totalPages: 0
    });

    loading$ = new BehaviorSubject(false);

    displayedColumns: { key: string, label: string }[] = [
        { label: 'Codice', key: 'codice' },
        { label: 'Materiale', key: 'materiale' },
        { label: 'Spessore', key: 'spessore' },
        { label: 'DimX', key: 'dim_x' },
        { label: 'DimY', key: 'dim_y' },
        { label: 'Area', key: 'area' },
        { label: 'Peso', key: 'peso' },
        { label: 'Ritaglio', key: 'ritaglio' },
        { label: 'Qta', key: 'qta' },
        { label: 'Udata1', key: 'udata1' },
        { label: 'Udata2', key: 'udata2' },
        { label: 'Udata3', key: 'udata3' }
    ];

    columnsKeys = this.displayedColumns.map(elm => elm.key);

    dataSource$ = new BehaviorSubject<any[]>([]);

    private readonly _destroy = inject(DestroyRef);

    constructor(private _backendService: BackendService) {
        this.paginatorState$.pipe(
            distinctUntilChanged(),
            tap(value => this._getItems(value)),
            takeUntilDestroyed(this._destroy)
        ).subscribe();
    }

    private _getItems(paginator: { page: number, size: number }): void {
        this.loading$.next(true);
        this._backendService.getTableData(paginator).pipe(
            tap(({ current_page, total_count, total_pages }) => {
                this.responseConfig$.next({
                    totalCount: total_count,
                    totalPages: total_pages
                });
            }),
            map(response => response.results),
            tap(items => this.dataSource$.next(items)),
            delay(300),
            tap(_ => this.loading$.next(false)),
            take(1)
        ).subscribe();
    }

    handlePageEvent(event: { pageIndex: number, pageSize: number }): void {
        const mapped = { page: event.pageIndex + 1, size: event.pageSize };
        this.paginatorState$.next(mapped);
    }

    handleExport(): void {
        this.loading$.next(true);

        this._getAllDataToExport().pipe(take(1)).subscribe(data => {
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
            /* generate workbook and add the worksheet */
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            /* save to file */
            XLSX.writeFile(wb, 'export_orders.xlsx');
            this.loading$.next(false);
        }
        );


    }

    private _getAllDataToExport(): Observable<any[]> {
        const allObs: Observable<any>[] = [];
        for (let index = 0; index < this.responseConfig$.value.totalPages; index++) {
            allObs.push(this._backendService.getTableData({ page: index + 1, size: this.paginatorState$.value.size }));
        }
        return forkJoin(allObs).pipe(
            tap(_ => console.log(_)),
            map((allRes => {
                const allData = [];
                for (const singleRes of allRes) {
                    allData.push(...singleRes.results);
                }
                return allData;
            })),
            take(1)
        );
    }

}