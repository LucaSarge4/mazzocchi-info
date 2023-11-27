import { Component, DestroyRef, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Sort, SortDirection } from "@angular/material/sort";
import { BehaviorSubject, EMPTY, Observable, ReplaySubject, catchError, combineLatest, delay, distinctUntilChanged, filter, forkJoin, map, of, switchMap, take, tap } from "rxjs";
import * as XLSX from 'xlsx';
import { UserRoleEnum } from "../models/user.type";
import { BackendService } from "../services/backend.service";
import { InformativaDialogComponent } from "./informativa-dialog.component";

export type SortingType = {
    sortingDir: SortDirection;
    sortingField: string;
}

const DEFAULT_SORTING: SortingType = {
    sortingDir: 'desc',
    sortingField: 'codice'
}

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

    sortingConfig$ = new BehaviorSubject<SortingType>(DEFAULT_SORTING);

    filterConfig$ = new BehaviorSubject<{ filterField: string | null, filterValue: string | null }>({ filterField: null, filterValue: null });

    loading$ = new BehaviorSubject(false);
    isAdmin$: Observable<boolean>;

    forceRefresh$ = new ReplaySubject(1);

    readonly displayedColumns: { key: string, label: string }[] = [
        { label: 'Codice', key: 'codice' },
        { label: 'Materiale', key: 'materiale' },
        { label: 'Spessore', key: 'spessore' },
        { label: 'DimX', key: 'dimX' },
        { label: 'DimY', key: 'dimY' },
        { label: 'Area', key: 'area' },
        { label: 'Peso', key: 'peso' },
        { label: 'Ritaglio', key: 'ritaglio' },
        { label: 'Qta', key: 'qta' },
        { label: 'Udata1', key: 'udata1' },
        { label: 'Udata2', key: 'udata2' },
        { label: 'Udata3', key: 'udata3' }
    ];

    columnsKeys = this.displayedColumns.map(elm => elm.key);

    dataSource$: Observable<any[]>;

    private readonly _destroy = inject(DestroyRef);

    constructor(private _backendService: BackendService, private _dialogService: MatDialog) {
        this.forceRefresh$.next(EMPTY);

        this.dataSource$ = combineLatest([
            this.paginatorState$,
            this.sortingConfig$,
            this.filterConfig$.pipe(
                filter(({ filterField, filterValue }) => filterField !== null && filterValue !== null || filterField === null && filterValue === null),
            ),
            this.forceRefresh$
        ]).pipe(
            distinctUntilChanged(),
            tap(_ => this.loading$.next(true)),
            delay(300),
            switchMap(([paginator, sorting, filter]) => this._getItems(paginator, sorting, filter).pipe(
                tap(({ current_page, total_count, total_pages }) => {
                    this.responseConfig$.next({
                        totalCount: total_count,
                        totalPages: total_pages
                    });
                }),
                map(response => response.results),
                catchError(err => of([])),
                delay(300),
                tap(_ => this.loading$.next(false)),
            ))
        );

        this.isAdmin$ = this._backendService.getUser().pipe(
            take(1),
            map(response => response.data.user.role === UserRoleEnum.ADMIN),
            catchError(err => of(false))
        );
    }

    private _getItems(paginator: { page: number, size: number }, sorting: SortingType, filter: { filterField: string | null, filterValue: string | null } | null): Observable<any> {
        return this._backendService.getTableData(paginator, sorting, filter);
    }

    sortData(event: Sort): void {
        this.sortingConfig$.next({
            sortingDir: event.direction,
            sortingField: event.active
        });
    }

    handleRefresh(): void {
        this.forceRefresh$.next(EMPTY);
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
            XLSX.writeFile(wb, 'export_lamiere.xlsx');
            this.loading$.next(false);
        }
        );
    }

    handleDialog(): void {
        this._dialogService.open(InformativaDialogComponent);
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