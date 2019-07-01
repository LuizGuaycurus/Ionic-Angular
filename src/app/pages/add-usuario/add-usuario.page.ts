import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../model/usuario';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  public usuario: Usuario;

  constructor() { }

  ngOnInit() {
    this.usuario = new Usuario;
  }

  onSubmit(form) {
    if(form.valid){
    console.log("Cadastrado", this.usuario);
  }}
}
