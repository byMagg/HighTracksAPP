import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from 'selenium-webdriver/http';

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

  it('should logout', async () => {
    await service.doLogout();
    expect(service.token).toBeFalsy();
  });

  afterAll(async () => {
    await service.doLogout();
  });
});
