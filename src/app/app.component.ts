import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyDGEUuckOfsyKzId6aFmMsYX90mW6jAouk",
      authDomain: "saadtouhbitest.firebaseapp.com",
      databaseURL: "https://saadtouhbitest.firebaseio.com",
      storageBucket: "saadtouhbitest.appspot.com",
      messagingSenderId: "616891425476"
    });
    console.log("database connection initialized");
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
