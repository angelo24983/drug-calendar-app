import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescrizioneListComponent } from './prescrizione-list.component';

describe('PrescrizioneListComponent', () => {
  let component: PrescrizioneListComponent;
  let fixture: ComponentFixture<PrescrizioneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescrizioneListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrescrizioneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
