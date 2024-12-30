import { Component, inject, model, ChangeDetectionStrategy } from '@angular/core';
import { Prescrizione } from '../../models/Prescrizione.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PrescrizioneCreateComponent } from '../prescrizione-create/prescrizione-create.component';
import { PrescrizioneService } from '../../services/prescrizione.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-prescrizione-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  templateUrl: './prescrizione-list.component.html',
  styleUrl: './prescrizione-list.component.css'
})
export class PrescrizioneListComponent {

  readonly dialog = inject(MatDialog);

  selected = model<Date | null>(null);

  prescrizioneList: Prescrizione[] = [];

  private _bottomSheet = inject(MatBottomSheet);

  private prescrizioneService = inject(PrescrizioneService);

  constructor() {
    this.prescrizioneService.getItems().subscribe(data => {
      this.prescrizioneList = data;
    });
  }

  openDialog() {
    this.prescrizioneService.getItemsByDate(this.selected()!).then(data => {
      this.prescrizioneList = data;
      const dialogRef = this.dialog.open(PrescrizioneItemDialog);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  addNewPrescrizione(): void {
    this._bottomSheet.open(PrescrizioneCreateComponent);
  }

  markAsDone(item: Prescrizione): void {
    item.done = true;
    this.prescrizioneService.updateItem(item.id, item)
      .then(data => console.log(data))
      .catch(error => console.log('Error', error));
  }

  markAsUndone(item: Prescrizione): void {
    item.done = false;
    this.prescrizioneService.updateItem(item.id, item)
      .then(data => console.log(data))
      .catch(error => console.log('Error', error));
  }

  deletePrescrizione(item: Prescrizione): void {
    this.prescrizioneService.deleteItem(item.id)
      .then(data => console.log(data))
      .catch(error => console.log('Error', error));
  }

}

@Component({
  selector: 'prescrizione-item-dialog',
  templateUrl: 'prescrizione-item-dialog.html',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrescrizioneItemDialog { }
