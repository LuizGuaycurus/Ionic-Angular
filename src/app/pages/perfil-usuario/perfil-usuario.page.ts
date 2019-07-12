import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  protected usuario: any;
  protected key: string;

  constructor(
    public usuarioService: UsuarioService,
    public activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.activeRouter.snapshot.paramMap.get("key");
    this.usuario = this.usuarioService.get(this.key);
  }

}
