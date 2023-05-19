import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditPage } from './edit.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditPage', () => {
  let component: EditPage;
  let fixture: ComponentFixture<EditPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), EditPage, HttpClientTestingModule, RouterTestingModule, AngularFireModule.initializeApp(environment.firebase)]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
