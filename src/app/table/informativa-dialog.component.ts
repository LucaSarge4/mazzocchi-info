import { Component } from "@angular/core";
@Component({
    selector: 'dialog-elements-example-dialog',
    template: `
        <h1 mat-dialog-title>Informativa</h1>
        <div mat-dialog-content>
            Giacenza espressa nella lista valida a fini consultazione. La correttezza è salvo ordini/impegni in corso già allocati,
            correttezza precedenti scarichi e controllo fisico a magazzino. Dove indicato RITAGLIO alla colonna Ritaglio le misure DimX e DimY sono lorde e l’area è netta; 
            l’utilizzo va verificato effettivo con nesting sulla geometria del ritaglio. Area e peso sono da moltiplicare per la quantità per avere il totale di riga.
        </div>
        <div mat-dialog-actions>
            <button mat-button mat-dialog-close>Chiudi</button>
        </div>
    `,
})
export class InformativaDialogComponent { }