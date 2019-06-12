import { TestBed } from '@angular/core/testing';

import { StaniceService } from './stanice.service';

describe('StaniceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaniceService = TestBed.get(StaniceService);
    expect(service).toBeTruthy();
  });
});
