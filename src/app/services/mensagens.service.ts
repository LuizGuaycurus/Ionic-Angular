import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(
    public alertController: AlertController,
  ) { }

  //Alertas ------------------------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

  // //Permissão -------------------------------------------
  // permitir() {
  //   //Verifica se Existe permissão no sistema: Camera
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA)
  //     .then(
  //       result => console.log('Has permission?', result.hasPermission),
  //       err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  //     );
  // }
}
