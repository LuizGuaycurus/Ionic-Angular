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

  ngOnInit() {
    this.eventos = this.EventoService.getAll();
  }

}
