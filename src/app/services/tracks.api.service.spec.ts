import { TestBed } from '@angular/core/testing';

import { TracksApiService } from './tracks.api.service';
import { Track } from '../models/track.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { SearchFilter } from '../home/tracks/tracks.page';
import { Comment } from '../models/comment.model';

describe('TracksApiService', () => {
  let service: TracksApiService;
  let authService: AuthService;
  const mockTrack: Track = {
    "_id": "1mVLbFwad1wce7mAhFw2Ih",
    "album": {
      "artists": [
        {
          "id": "4IG1SDlwgNKzqTmjBrvY3K",
          "name": "Rei"
        },
        {
          "id": "01m2XZ7m7rAz6KY3scTdaV",
          "name": "Neo Pistea"
        },
        {
          "id": "1bAftSH8umNcGZ0uyV7LMg",
          "name": "Duki"
        }
      ],
      "id": "0CzV3HI7g08eTofa53ewRP",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b2736263a215c4e9dad58ec30165",
        },
        {
          "url": "https://i.scdn.co/image/ab67616d00001e026263a215c4e9dad58ec30165",
        },
        {
          "url": "https://i.scdn.co/image/ab67616d000048516263a215c4e9dad58ec30165",
        }
      ],
      "name": "Pininfarina (Remix)",
      "release_date": "2020-08-29",
      "release_date_precision": "day",
      "total_tracks": 1
    },
    "duration_ms": 260787,
    "name": "Pininfarina - Remix",
    "preview_url": "https://p.scdn.co/mp3-preview/84e2cc289dadf9fcf836e5e4d975034cc01a7984?cid=9d5b58343ae84cd6b44ed75f42f00694",
    "location": {
      "latitude": -2.5932231,
      "longitude": 0,
      "accuracy": 4027.7192246828
    },
    "comments": [],
  }

  // beforeAll(async () => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase)],

  //     providers: [provideRouter([])],
  //   });
  //   authService = TestBed.inject(AuthService);
  //   await authService.fetchJWT();
  //   service = TestBed.inject(TracksApiService);
  //   const track: Track = await service.getTrack("1mVLbFwad1wce7mAhFw2Ih");
  //   if (!track) await service.insertTrack(mockTrack);
  // });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebase)],
      providers: [provideRouter([])],
    });
    authService = TestBed.inject(AuthService);
    await authService.fetchJWT();
    service = TestBed.inject(TracksApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get JWT', () => {
    const token = service.token;
    console.log(token);
    expect(token).toBeTruthy();
  });

  it('should return a list of tracks from spotify', async () => {
    const tracks: Track[] = await service.searchTracksSpotify("Pininfarina");
    console.log(service.token);
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThan(0);
  });

  it('should return a list of tracks', async () => {
    const tracks: Track[] = await service.searchTracks("Pininfarina");
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThan(0);
  });

  it('should return all tracks', async () => {
    const tracks: Track[] = await service.getTracks();
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThan(0);
  });

  it('should return track by id', async () => {
    const track: Track = await service.getTrack("1mVLbFwad1wce7mAhFw2Ih");
    expect(track).toBeTruthy();
    expect(track._id).toBe("1mVLbFwad1wce7mAhFw2Ih");
  });

  it('should insert a track', async () => {
    const trackToAdd: Track = await service.getTrack("1mVLbFwad1wce7mAhFw2Ih");
    await service.deleteTrack("TEST");
    trackToAdd._id = "TEST";
    await service.insertTrack(trackToAdd);
    const track: Track = await service.getTrack("TEST");
    expect(track).toBeTruthy();
    expect(track._id).toBe("TEST");
  });

  it('should update a track', async () => {
    const trackToUpdate: Track = await service.getTrack("1mVLbFwad1wce7mAhFw2Ih");
    trackToUpdate.name = "TEST2";
    await service.updateTrack(trackToUpdate);
    const track: Track = await service.getTrack("1mVLbFwad1wce7mAhFw2Ih");
    expect(track).toBeTruthy();
    expect(track._id).toBe("1mVLbFwad1wce7mAhFw2Ih");
    expect(track.name).toBe("TEST2");
  });

  it('should delete a track', async () => {
    await service.deleteTrack("1mVLbFwad1wce7mAhFw2Ih");
    let track: Track | undefined;
    try {
      track = await service.getTrack("1mVLbFwad1wce7mAhFw2Ih");

    } catch (error) {

    }
    expect(track).toBeFalsy();
    await service.insertTrack(mockTrack);
  });

  it('should insert comment', async () => {
    const comment: Comment = {
      _id: "TEST",
      text: "TEST",
      author: "TEST",
      score: 0,
    }
    await service.insertComment("TEST", comment);

    const trackWithComment: Track = await service.getTrack("TEST");
    expect(trackWithComment).toBeTruthy();
    expect(trackWithComment._id).toBe("TEST");
    expect(trackWithComment.comments?.length).toBeGreaterThan(0);
    expect(trackWithComment.comments?.[0].text).toBe("TEST");

    await service.deleteComment("TEST", "TEST");

  });

});
