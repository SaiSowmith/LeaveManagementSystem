import { User } from './models/login-user';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

 
export class ContactService {

  private user:firebase.User

  constructor(
    private db: AngularFireDatabase,
    private firebaseApp: FirebaseApp,
    ) {
  }

  create(contacts) {
    // return this.db.object('/lkhljh').update(employee);

    // console.log(contacts.key);
    // var path: String = "/contacts/" + contacts.key
    // console.log(path);
    // return this.db.object(`/contacts/${contacts.key}`).set(contacts);

    // return this.firebaseApp.database().ref().child('/contacts/').push().key;

    // const item = { ...item, id: pushId };
    // this.db.list('contacts').set(item.id, item);
    // const USER_KEY = this.$user.getters['auth/getUserId']
    // var a = User.GetUserId();
    // var Id = this.user.uid;
    // console.log("ID",Id);
    // return this.db.object(`/contacts/${Id}`).update(contacts);

    var pushId = this.db.createPushId();
    console.log("PushID",pushId);
    return this.db.object(`/contacts/${pushId}`).update(contacts);

  }

  getAll() {
    return this.db.list('/contacts').valueChanges();
  }

  get(contactsId) {
    return this.db.object('/contacts/' + contactsId);
  }

  update(contactsId, contacts) {
    return this.db.object('/contacts/' + contactsId).update(contacts);
  }

  delete(contactsId) {
    return this.db.object('/contacts/' + contactsId).remove();
  }

}