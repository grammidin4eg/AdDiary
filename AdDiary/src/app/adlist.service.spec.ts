import { TestBed, inject } from '@angular/core/testing';

import { AdlistService } from './adlist.service';

describe('AdlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlistService]
    });
  });

  it('should be created', inject([AdlistService], (service: AdlistService) => {
    expect(service).toBeTruthy();
  }));
});
