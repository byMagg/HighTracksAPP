import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          AppComponent,
          IonicModule.forRoot(),
          AngularFireAuthModule,
          AngularFirestoreModule,
          AngularFireStorageModule,
          AngularFireDatabaseModule,
          HttpClientTestingModule,
          AngularFireModule.initializeApp(environment.firebase),
        ],
        providers: [AuthService, provideRouter([])],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch JWT on initialization', fakeAsync(() => {
  //   spyOn(authService, 'fetchJWT').and.returnValue(Promise.resolve());

  //   fixture.detectChanges();
  //   tick();

  //   expect(authService.fetchJWT).toHaveBeenCalled();
  // }));
});
