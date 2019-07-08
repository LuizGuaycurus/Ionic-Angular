import { Component } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected nuser: number = 0;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuarioService.getAll()
      .subscribe(
        res => this.nuser = res.length
        ,
        err => this.nuser = 0
      )
  }

}
