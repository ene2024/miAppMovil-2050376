import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Foto } from './foto.model';

@Injectable({
  providedIn: 'root'
})
export class FotoServiceService {
  public fotos: Foto[] = [];

  constructor() { }

  public async addNewToGallery(): Promise<Foto> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFile: Foto = {
      filepath: '',
      webViewPath: capturedPhoto.webPath
    };

    this.fotos.unshift(savedImageFile);

    return savedImageFile;
  }
}
