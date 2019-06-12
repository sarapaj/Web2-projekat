import { TestBed } from '@angular/core/testing';

import { LinijeService } from './linije.service';

describe('LinijeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinijeService = TestBed.get(LinijeService);
    expect(service).toBeTruthy();
  });
});
