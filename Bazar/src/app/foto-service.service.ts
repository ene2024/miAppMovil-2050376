import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Foto } from './foto.model';



@Injectable({
  providedIn: 'root'
})



export class FotoServiceService {
  public fotos: Foto[] = [];

  constructor() { }
public async addNewToGallery() {
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });

  // Agregar la nueva foto al principio del array fotos
  this.fotos.unshift({
    filepath: '',
    webViewPath: capturedPhoto.webPath
  });

 

}
  

}
