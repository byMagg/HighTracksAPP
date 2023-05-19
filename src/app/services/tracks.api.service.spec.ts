import { TestBed } from '@angular/core/testing';

import { TracksApiService } from './tracks.api.service';
import { Track } from '../models/track.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('TracksApiService', () => {
  let service: TracksApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase)],
      providers: [provideRouter([])],
    });
    service = TestBed.inject(TracksApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of tracks', async () => {
    const tracks: Track[] = await service.searchTracksSpotify("Pininfarina");
    expect(tracks.length).toBeGreaterThan(0);
  });
});
