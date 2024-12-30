import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { PrescrizioneService } from '../../services/prescrizione.service';

@Component({
  selector: 'app-prescrizione-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './prescrizione-create.component.html',
  styleUrl: './prescrizione-create.component.css'
})
export class PrescrizioneCreateComponent {

  private _bottomSheetRef = inject<MatBottomSheetRef<PrescrizioneCreateComponent>>(MatBottomSheetRef);
  private prescrizioneService = inject(PrescrizioneService);

  prescrizioneForm!: FormGroup;

  constructor() {
    this.initForm();

  }

  initForm(): void {

    this.prescrizioneForm = new FormGroup({
      assegnatario: new FormControl('', Validators.required),
      farmaco: new FormControl('', Validators.required),
      quantita: new FormControl('', Validators.required),
      da: new FormControl(new Date(), Validators.required),
      a: new FormControl(new Date(), Validators.required),
      turno: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.prescrizioneForm.invalid) {
      return;
    }

    this.prescrizioneService.createItem(this.prescrizioneForm.value).then(data => {
      console.log('Saved data', data);
      this._bottomSheetRef.dismiss();
    });
  }

}
