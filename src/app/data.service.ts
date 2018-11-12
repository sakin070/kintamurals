import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {EventData} from './model/eventData';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  eventRef: AngularFirestoreCollection<EventData> = this.db.collection('events');
  constructor(private db: AngularFirestore) {
    this.getEventsByDate('2018/11/12');
  }

  public getEventsByDate(date: string) {
    return this.db.collection('cards', ref => ref.where('date', '==', date ))
      .snapshotChanges().pipe(map(actions => { return actions.map( a => {
        const data = a.payload.doc.data() as EventData;
        const id = a.payload.doc.id;
        console.log(data);
        return {id, data};
      }); }));

  }
}
