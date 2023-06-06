import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Track } from '../models/track.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { SearchFilter } from '../home/tracks/tracks.page';
import { GeolocationService } from './geolocation.service';
import { Coords } from '../models/coords.model';
import { Comment } from '../models/comment.model';
import { Recommendation } from '../models/recommendation.model';

@Injectable({
  providedIn: 'root'
})
export class TracksApiService {

  url = environment.url;
  token = this.authService.getJWT();

  constructor(private http: HttpClient, private authService: AuthService, private geoService: GeolocationService) { }

  async getRecommendations(): Promise<Recommendation[]> {
    const titles = (await this.getTracks()).map(track => track.name);
    const body = {
      "tracks": titles
    }
    try {
      const res = (await lastValueFrom(this.http.put<any>(`${this.url}recommendations`, body, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })))['tracks'];
      console.log(res);
      return res;
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 500) console.log("Error updating track")
      }
      return [];
    }
  }

  async searchTracksSpotify(title: string, offset: number = 0): Promise<Track[]> {
    try {
      const tracks: Track[] = (await lastValueFrom(this.http.get<any>(`${this.url}search/${encodeURI(title)}?offset=${offset}`)))['tracks']['items']
      return tracks.map((track: any) => {
        return {
          _id: track.id,
          ...track,
          id: undefined
        };
      });
    } catch (error: unknown) {
      console.log(error);
      return [];
    }
  }

  async searchTracks(title: string, _field: SearchFilter = "name" as SearchFilter): Promise<Track[]> {
    try {
      return await lastValueFrom(this.http.get<Track[]>(`${this.url}tracks/search?${_field}=${encodeURI(title)}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) throw new Error("Track not found");
        if (error.status === 500) throw new Error("Error getting track")
        if (error.status === 0) throw new Error("Error connecting to server")
      }
      throw error;
    }
  }

  async getTrack(trackId: string): Promise<Track> {
    try {
      const respMongo = lastValueFrom(this.http.get<Track>(`${this.url}tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));

      const respFirebase = firstValueFrom(this.afs.doc<Track>(`tracks/${trackId}`).valueChanges());

      const [trackMongo, trackFirebase] = await Promise.all([respMongo, respFirebase]);

      return trackMongo || trackFirebase;
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) throw new Error("Track not found");
        if (error.status === 500) throw new Error("Error getting track")
        if (error.status === 0) throw new Error("Error connecting to server")
      }
      throw error;
    }
  }

  async getTracks(): Promise<Track[]> {
    try {
      return await lastValueFrom(this.http.get<Track[]>(`${this.url}tracks/`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 500) throw new Error("Error getting track")
        if (error.status === 0) throw new Error("Error connecting to server")
      }
    }
    return [];
  }

  async insertTrack(track: Track): Promise<boolean> {
    let coords: Coords | undefined;
    try {
      coords = await this.geoService.getLocation();
    } catch (error) {
      if (error instanceof GeolocationPositionError) console.log("Error getting location");
    }
    track.location = coords;
    const tracks: Track[] = [track];
    try {
      await lastValueFrom(this.http.post<Track>(`${this.url}tracks/`, tracks, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
      return true;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) throw Error("Track already exists");
      }
      return false;
    }
  }

  async insertTracks(tracks: Track[]): Promise<boolean> {
    let coords: Coords | undefined;
    try {
      coords = await this.geoService.getLocation();
    } catch (error) {
      if (error instanceof GeolocationPositionError) console.log("Error getting location");
    }
    if (coords) tracks.forEach(track => track.location = coords);
    try {
      await lastValueFrom(this.http.post<Track>(`${this.url}tracks/`, tracks, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
      return true;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) throw Error("Track already exists");
      }
      return false;
    }
  }

  async insertComment(trackId: string, comment: Comment): Promise<boolean> {
    let coords: Coords | undefined;
    try {
      coords = await this.geoService.getLocation();
    } catch (error) {
      if (error instanceof GeolocationPositionError) console.log("Error getting location");
    }
    if (coords) comment.location = coords;
    comment._id = ObjectID().toHexString();
    try {
      await lastValueFrom(this.http.post<Comment>(`${this.url}tracks/${trackId}/comments`, comment, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));

      const respFirebase = this.afs.collection('tracks').doc(trackId).collection('comments').doc(comment._id).set(comment);
      await Promise.all([respMongo, respFirebase])

      return true;
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          console.log("Track not found");
        }
      }
      console.error(error);
      return false;
    }
  }

  async updateTrack(track: Track): Promise<boolean> {
    try {
      await lastValueFrom(this.http.put<Track>(`${this.url}tracks/${track._id}`, track, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
      return true;
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) console.log("Track not found");
        if (error.status === 500) console.log("Error updating track")
      }
      return false;
    }
  }

  async deleteTrack(trackId: string): Promise<boolean> {
    try {
      await lastValueFrom(this.http.delete<Track>(`${this.url}tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
      return true;
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) console.log("Track not found");
        if (error.status === 500) console.log("Error deleting track")
      }
      return false;
    }
  }

  async getComments(trackId: string): Promise<Comment[]> {
    let comments: Comment[] = [];
    try {
      comments = await lastValueFrom(this.http.get<Comment[]>(`${this.url}tracks/${trackId}/comments`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
      console.log(comments)
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) console.log("Track not found");
        if (error.status === 500) console.log("Error getting comments")
      }
    }
    return comments
  }

  async deleteComment(trackId: string, commentId: string): Promise<boolean> {
    try {
      await lastValueFrom(this.http.delete<Comment>(`${this.url}tracks/${trackId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }));
      return true;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) console.log("Track not found");
        if (error.status === 500) console.log("Error deleting comment")
      }
      return false;
    }
  }

}
