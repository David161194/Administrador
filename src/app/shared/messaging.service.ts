import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';


@Injectable()
export class MessagingService {

  private messaging = firebase.messaging()

  private messageSource = new Subject()
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(private afs: AngularFirestore) {}

  /// get permission to send messages
getPermission(user) {
  this.messaging.requestPermission()
  .then(() => {
    console.log('Notification permission granted.');
    return this.messaging.getToken()
  })
  .then(token => {
    console.log(token)
    this.saveToken(user, token)
  })
  .catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });
}
  // Listen for token refresh
  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
      .then(refreshedToken => {
        console.log('Token refreshed.');
        this.saveToken(user, refreshedToken)
      })
      .catch( err => console.log(err, 'Unable to retrieve new token') )
    });
  }
// save the permission token in firestore
private saveToken(user, token): void {
  
  const currentTokens = user.fcmTokens || { }

  // If token does not exist in firestore, update db
  if (!currentTokens[token]) {
    const userRef = this.afs.collection('adminTok').doc('supervisor');
    userRef.update({ devtoken: token })
    const userTok = this.afs.collection('devicestokens').doc('Supervisor');
    userTok.update({ devtoken: token });
  }
}
  // used to show message when app is open
receiveMessages() {
  this.messaging.onMessage(payload => {
   console.log('Message received. ', payload);
   this.messageSource.next(payload)
 });
}
}