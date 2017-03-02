import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/database/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  formGroup: FormGroup
  loading: any
  ctrlLogo: boolean = false

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public fb : FormBuilder,
    public authService: AuthService) {
      this.formGroup = this.fb.group({
        email: ["", Validators.required],
        password:  ["", [Validators.required, Validators.minLength(6)]]
      });
    }

  login(credentials) {
    this._showLoading();
    this.authService.signInWithEmail(credentials).then(() => {
      this.loading.dismiss();
    }).catch((error : any) => {
      console.log(error);
      this._showError(this._validateMessagesError(error.code));
    });
  }

  loginFacebook() {
    this._showLoading();
    this.authService.signWithFacebook().then(() => {
      this.loading.dismiss();
    }).catch((error : any) => {
      console.log(error);
      this._showError(this._validateMessagesError(error.code));
    });
  }

  _showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loading.present();
  }

  _showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: "Houve algum problema!",
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  _validateForm(credentials) : any {
    if(!credentials.email || !credentials.password) {
      this._showError('Preencha todos os campos');
      return false;
    }

    return true;
  }

  _validateMessagesError(message) {
    let errorMessages = {
      userNotFind : 'Este usuário não existe',
      userEquals : 'Não foi possivel realizar o cadastro, este usuário já existe',
      userIncorrect: 'E-mail ou senhas incorretas',
      offline: 'Não foi possivel realizar a conexão com os nossos servidores',
      undefined: 'Ocorreu algum problema desconhecido, entre em contato conosco para resolver este problema'
    }

    switch(message) {
      case "auth/email-already-in-use":
        return errorMessages.userEquals
      case "auth/wrong-password":
        return errorMessages.userIncorrect
      case "auth/user-not-found":
        return errorMessages.userNotFind
      case "auth/network-request-failed":
        return errorMessages.offline
      default:
        return errorMessages.undefined;
    }
  }


}
