import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-evento',
  templateUrl: './list-evento.page.html',
  styleUrls: ['./list-evento.page.scss'],
})
export class ListEventoPage implements OnInit {

  protected eventos: any;

  constructor(
    public eventoService: EventoService,
    public alertController: AlertController
  ) { }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);}

    remover(key){
      this.eventoService.remove(key).then(
        res=>{
          this.presentAlert("Aviso", "Evento Apagado")
        },
        err=>{
          this.presentAlert("Epa!","Erro ao Apagar");
        }
      )
    }

  ngOnInit() {
    this.eventos = this.eventoService.getAll();
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
