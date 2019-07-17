import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
})
export class LoginUsuarioPage implements OnInit {

  protected email: string;
  protected pws: string;

  constructor(
    public afAuth: AngularFireAuth,
    public msg:MensagensService
  ) { }

  ngOnInit() {
  }
  onSubmit(form){
    if(form.valid){
      this.login();
    } else {
      this.msg.presentAlert("Erro!", "Campos obrigatórios!");
    }
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.pws);
  }

  loginWeb() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
