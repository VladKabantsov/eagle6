import { TestBed } from '@angular/core/testing';

import { EntitiesDataSourceService } from './entities-data-source.service';

describe('EntitiesDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntitiesDataSourceService = TestBed.get(EntitiesDataSourceService);
    expect(service).toBeTruthy();
  });
});
