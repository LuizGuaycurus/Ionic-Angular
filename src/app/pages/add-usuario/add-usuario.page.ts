import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public key: string;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public usuarioService: UsuarioService,
    public activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.usuario = new Usuario;
    this.key = this.activeRouter.snapshot.paramMap.get("key");
    if (this.key) {
      this.usuarioService.get(this.key).subscribe(
        res => this.usuario = res,
        err => this.key = null
      );
    }
  }

  onSubmit(form) {
    if (form.valid) {
      if (!this.key) {
        this.usuarioService.save(this.usuario)
          .then(
            res => {
              this.presentAlert("Aviso", "Cadastrado!");
              form.reset();
              this.router.navigate(['/']);
            },
            err => {
              this.presentAlert("Epa!", "Erro ao cadastrar!");
            }
          ).catch(
            err=>{
              this.presentAlert("Erro!", "Ao acessar ao sistema!");
              this.router.navigate(['/']);
            }
          )
      } else {
        this.usuarioService.update(this.usuario, this.key)
          .then(
            res => {
              this.presentAlert("Aviso", "Atualizado!");
              form.reset();
              this.router.navigate(['/']);
            },
            err => {
              this.presentAlert("Epa!", "Erro ao atualizar!");
            }
          ).catch(
            err=>{
              this.presentAlert("Erro!", "Ao acessar ao sistema!");
              this.router.navigate(['/']);
            }
          )
      }
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

