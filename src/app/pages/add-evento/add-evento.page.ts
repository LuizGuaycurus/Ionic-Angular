import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.page.html',
  styleUrls: ['./add-evento.page.scss'],
})
export class AddEventoPage implements OnInit {

  public evento: Evento;
  public key: string;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public activeRouter: ActivatedRoute,
    public eventoService: EventoService
  ) { }

  ngOnInit() {
    this.evento = new Evento;
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

}
