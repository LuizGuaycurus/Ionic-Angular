import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/model/evento';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.page.html',
  styleUrls: ['./add-evento.page.scss'],
})
export class AddEventoPage implements OnInit {

  public evento: Evento;
  public key: string;
  protected preview: any;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public activeRouter: ActivatedRoute,
    public eventoService: EventoService,
    private camera: Camera,
  ) { }

  ngOnInit() {
    this.evento = new Evento;
    this.preview = null;
    this.key = this.activeRouter.snapshot.paramMap.get("key");
    if (this.key) {
      this.eventoService.get(this.key).subscribe(
        res =>{
         this.evento = res
        },  
        err => this.key = null
      );
    }
  }

  onSubmit(form) {
    if (form.valid) {
      if (!this.key) {
        //console.log("Cadastrado", this.usuario );
        // then é como um então, tem dois resultados , um verdadeiro e um falso
        this.eventoService.save(this.evento).then(
          res => {
            this.presentAlert("Aviso", "Cadastrado");
            form.reset();
            this.router.navigate(['/']);
          },
          err => {
            this.presentAlert("Epa!", "Erro ao Cadastrar");
          }
        )
      } else {
        this.eventoService.update(this.evento, this.key)
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
      destinationType: this.camera.DestinationType.DATA_URL,
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
