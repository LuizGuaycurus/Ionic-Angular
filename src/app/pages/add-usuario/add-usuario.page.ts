import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Usuario } from './../../model/usuario';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  public usuario: Usuario;

  constructor(
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.usuario = new Usuario;
  }

  onSubmit(form) {
    if (form.valid) {
      // console.log("Cadastrado", this.usuario);
      this.presentAlert("Aviso", "Cadastrado!");
      form.reset();
      this.router.navigate(['/']);
    }
  }
  
  async presentAlert(titulo:string, texto:string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

}

