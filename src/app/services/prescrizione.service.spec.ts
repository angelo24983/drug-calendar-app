import { TestBed } from '@angular/core/testing';

import { PrescrizioneService } from './prescrizione.service';

describe('PrescrizioneService', () => {
  let service: PrescrizioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescrizioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
