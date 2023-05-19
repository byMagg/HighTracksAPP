import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TrackPage } from './track.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';


describe('TrackPage', () => {
  let component: TrackPage;
  let fixture: ComponentFixture<TrackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TrackPage, HttpClientTestingModule, RouterTestingModule, AngularFireModule.initializeApp(environment.firebase)]
    }).compileComponents();
    fixture = TestBed.createComponent(TrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});