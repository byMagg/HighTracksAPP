import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase)]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', async () => {
    await service.doLogout();
    await service.doLogin({ email: "dani@gmail.com", password: "123456" });
    console.log("HOLAHOLAAAAAAA" + service.token + AuthService.logged);
    expect(AuthService.logged).toBeTrue();
  });

  it('should logout', async () => {
    await service.doLogout();
    expect(service.token).toBeFalsy();
  });

  afterAll(async () => {
    await service.doLogout();
  });
});
