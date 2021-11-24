import { TestBed } from '@angular/core/testing';
import { MsalGuard } from './msal.guard';
import {MSAL_INSTANCE, MsalService} from "@azure/msal-angular";
import {MSALInstanceFactory} from "../app.module";

describe('MsalGuard', () => {
  let guard: MsalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          MsalService,
        {
          provide: MSAL_INSTANCE,
          useFactory : MSALInstanceFactory,
        },
      ]
    });
    guard = TestBed.inject(MsalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
