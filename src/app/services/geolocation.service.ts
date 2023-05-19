import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Coords } from '../models/coords.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  coords: Coords = {
    latitude: 0,
    longitude: 0,
    accuracy: 0
  };

  constructor() { }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.coords.latitude = position.coords.latitude;
    this.coords.latitude = position.coords.longitude;
    this.coords.accuracy = position.coords.accuracy;
    return this.coords;
  }
}
