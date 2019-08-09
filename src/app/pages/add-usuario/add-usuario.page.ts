import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireAuth } from '@angular/fire/auth'

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
  protected preview: any;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public usuarioService: UsuarioService,
    public activeRouter: ActivatedRoute,
    private camera: Camera,
    private afAuth:AngularFireAuth
  ) { }

  ngOnInit() {
    this.usuario = new Usuario;
    this.preview = null;
    this.key = this.activeRouter.snapshot.paramMap.get("key");
    if (this.key) {
      this.usuarioService.get(this.key).subscribe(
        res =>{
         this.usuario = res
         this.preview = res.foto
        },  
        err => this.key = null
      );
    }
  }

  onSubmit(form) {
    if (form.valid) {
      this.usuario.foto = this.preview;
      if (!this.key) {
        this.afAuth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.pws)
          .then(
            res => {
              //this.usuario.email = null;
              this.usuario.pws = null;
              this.usuarioService.save(this.usuario, res.user.uid);
              this.presentAlert("Aviso", "Cadastrado!");
              form.reset();
              this.router.navigate(['/']);
            },
            err => {
              this.presentAlert("Epa!", "Erro ao cadastrar!");
            }
          ).catch(
            err => {
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
            err => {
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

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
    }, (err) => {
      // Handle error
    });
  }

}
