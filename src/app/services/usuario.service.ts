import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Usuario } from './../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public db: AngularFireDatabase
  ) { }

  save(usuario: Usuario) {
    return this.db.list("usuario").push(usuario);
  }

}
