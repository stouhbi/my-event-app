
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AlertController} from "ionic-angular";

@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;
  public profilePictureRef: any;

  constructor(public alertCtrl : AlertController) {
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref('userProfile/' + this.currentUser + '/eventList');
    this.profilePictureRef = firebase.storage().ref();

  }

  createEvent(eventName: string, eventDate: string,
              eventPrice: number, eventCost: number): any {
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice,
      cost: eventCost,
      revenue: eventCost * -1
    }).then( newEvent => {
      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
    });
  }

  getEventList(): any {
    return this.eventList;
  }

  getEventDetail(eventId): any {
    return this.eventList.child(eventId);
  }

  addGuest(guestName, eventId, eventPrice, guestPicture = null): any {

    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then((newGuest) => {
      this.eventList.child(eventId).child('revenue').transaction( (revenue) => {
        revenue += eventPrice;
        return revenue;
      });
      if (guestPicture != null) {
        this.profilePictureRef.child('guestProfile/'+newGuest.key+'/profilePicture.png')
          .putString(guestPicture, 'base64')
          .then((savedPicture) => {
            this.eventList.child(eventId).child('guestList').child(newGuest.key).child('profilePicture')
              .set(savedPicture.downloadURL);
          }, error => {

            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: JSON.stringify(error),
              buttons: ['OK']
            });

            alert.present();
          });

      }
    });
  }

}
