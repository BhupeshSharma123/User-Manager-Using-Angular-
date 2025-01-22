/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiServicesService } from './api-services.service';

describe('Service: ApiServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiServicesService]
    });
  });

  it('should ...', inject([ApiServicesService], (service: ApiServicesService) => {
    expect(service).toBeTruthy();
  }));
});
