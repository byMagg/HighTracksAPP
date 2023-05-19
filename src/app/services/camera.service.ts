import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async takePictureBase64(): Promise<string | undefined> {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    if (image && image.base64String) {
      return image.base64String;
    }
    return undefined;
  }
}
