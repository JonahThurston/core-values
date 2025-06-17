import { TestBed } from '@angular/core/testing';

import { ValuesManagerService } from './values-manager.service';

describe('ValuesManagerService', () => {
  let service: ValuesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValuesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
