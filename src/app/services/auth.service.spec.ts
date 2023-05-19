import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebase)]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
