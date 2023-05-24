import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TrackPage } from './track.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Track } from 'src/app/models/track.model';


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

  it("should define trackid correctly", () => {
    const mockApiService: any = {
      getTrack: function () {
        return Promise.resolve(new Track("test", new Album("test", "test", "test")));
      }
    }
    const mockActivatedRoute: any = {
      params: of({ id: "123" })
    }
    const trackPage = new TrackPage(mockApiService, mockActivatedRoute);
    expect(trackPage.trackId).toEqual("123");
  });
});