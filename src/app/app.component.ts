import { Component } from '@angular/core';
import { Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserStorageService } from '../providers/database/user-storage-service';
import { AuthService } from '../providers/database/auth-service';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { VisitorPage } from '../pages/visitor/visitor';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  profilePage : any;
  rootPage : any = TabsPage;

  constructor(
    public platform: Platform,
    public menuCtrl: MenuController,
    public userStorageService: UserStorageService,
    public authService : AuthService,
    public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.authService.getAuthentication().subscribe((state) =>{
        if(state === null) {
          this.menuCtrl.enable(false);
          this.rootPage = LoginPage;
          return
        }

        this._verifyIfUserIsArchangel().then((validate) => {
          this.menuCtrl.enable(true);
          this.rootPage = TabsPage;
        }).catch(() => {
          this._showMessage();
          this.menuCtrl.enable(false);
          this.rootPage = LoginPage;
        })
      });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.rootPage = page;
  }

  signOut() {
    this.authService.signOut();
  }

  _verifyIfUserIsArchangel() {
    return new Promise((resolve, reject) => {
      this.userStorageService.getUser().then((user : any) => {
        if(user.type_user === 'Arcanjo') {
          resolve(true)
        } else {
          reject(false)
        }
      })
    })
  }
  _showMessage() {
    let alert = this.alertCtrl.create({
      title: "Ops! Ocorreu um problema.",
      subTitle: "Este usuário não possuí permissão para ter acesso!",
      buttons: ['Ok']
    });
    alert.present();
  }


}
