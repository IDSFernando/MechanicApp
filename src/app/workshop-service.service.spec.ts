import { TestBed } from '@angular/core/testing';

import { WorkshopServiceService } from './workshop-service.service';

describe('WorkshopServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkshopServiceService = TestBed.get(WorkshopServiceService);
    expect(service).toBeTruthy();
  });
});
