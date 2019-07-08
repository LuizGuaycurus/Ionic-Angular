import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.page.html',
  styleUrls: ['./list-usuario.page.scss'],
})
export class ListUsuarioPage implements OnInit {

  protected usuarios: any;

  constructor(
    public usuarioService: UsuarioService
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
  
  atualizar(){}

  remover(){}
}
