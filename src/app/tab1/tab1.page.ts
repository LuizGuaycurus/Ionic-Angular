import { Component } from '@angular/core';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  protected eventos: any;

  constructor(
    public EventoService: EventoService,
  ) {}
  
  // photos = [
  //   {
  //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sultan_the_Barbary_Lion.jpg/440px-Sultan_the_Barbary_Lion.jpg',
  //     description: 'Leão'
  //   },
  //   {
  //     url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Lioness_Etosha_NP.jpg/500px-Lioness_Etosha_NP.jpg',
  //     description: 'Leoa'
  //   }
  // ];

  ngOnInit() {
    this.eventos = this.EventoService.getAll();
  }

}
