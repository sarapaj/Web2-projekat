import { TestBed } from '@angular/core/testing';

import { KarteService } from './karte.service';

describe('KarteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KarteService = TestBed.get(KarteService);
    expect(service).toBeTruthy();
  });
});
