import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), LoginComponent, HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebase)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should check if user is logged', () => {
  //   expect(component.logged).toBeFalsy();
  // });


});
