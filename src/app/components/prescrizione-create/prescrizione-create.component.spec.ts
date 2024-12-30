import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescrizioneCreateComponent } from './prescrizione-create.component';

describe('PrescrizioneCreateComponent', () => {
  let component: PrescrizioneCreateComponent;
  let fixture: ComponentFixture<PrescrizioneCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescrizioneCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrescrizioneCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
