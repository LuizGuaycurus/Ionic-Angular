import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { UsuarioService } from './../../services/usuario.service';
import { present } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.page.html',
  styleUrls: ['./list-usuario.page.scss'],
})
export class ListUsuarioPage implements OnInit {

  protected usuarios: any;

  constructor(
    public usuarioService: UsuarioService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.getAll();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
  remover(key){
    this.usuarioService.remove(key).then(
      res=>{
        this.presentAlert("Aviso!", "Usuario apagado!");
      },
      err=>{
        this.presentAlert("Erro!", "Não foi possivel apagar o usuario!");
      }
    )
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
