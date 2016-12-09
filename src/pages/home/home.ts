import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


import {AuthData} from "../../providers/auth-data";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";
import {EventCreatePage} from "../event-create/event-create";
import {EventListPage} from "../event-list/event-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authData: AuthData) {

  }


  logOut(){
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

  goToCreate(){
    this.navCtrl.push(EventCreatePage);
  }

  goToList(){
    this.navCtrl.push(EventListPage);
  }

}
