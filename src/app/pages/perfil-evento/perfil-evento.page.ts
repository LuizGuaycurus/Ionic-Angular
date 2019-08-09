import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-perfil-evento',
  templateUrl: './perfil-evento.page.html',
  styleUrls: ['./perfil-evento.page.scss'],
})
export class PerfilEventoPage implements OnInit {

  protected evento:any;
  private key:string;

  constructor(
    public eventoService: EventoService,
    public activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.activeRouter.snapshot.paramMap.get("key");
    this.evento = this.eventoService.get(this.key);
  }

}
