import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracksPage } from './tracks.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";


describe('TracksPage', () => {
  let component: TracksPage;
  let fixture: ComponentFixture<TracksPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TracksPage,
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TracksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
