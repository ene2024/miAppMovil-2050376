import { TestBed } from '@angular/core/testing';

import { CargarPService } from './cargar-p.service';

describe('CargarPService', () => {
  let service: CargarPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
