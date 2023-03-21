import { TestBed } from '@angular/core/testing';

import { HikesService } from './hikes.service';

describe('HikesService', () => {
  let service: HikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
