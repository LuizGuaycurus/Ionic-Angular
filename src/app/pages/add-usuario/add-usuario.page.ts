import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Usuario } from './../../model/usuario';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  public usuario: Usuario;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.usuario = new Usuario;
  }

  onSubmit(form) {
    if (form.valid) {
      // console.log("Cadastrado", this.usuario);
      this.usuarioService.save(this.usuario)
        .then(
          res => {
            this.presentAlert("Aviso", "Cadastrado!");
            form.reset();
            this.router.navigate(['/']);
          },
          err=>{
            this.presentAlert("Epa!", "Erro ao cadastrar!");
          }
        )
    }
  }

  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

}

