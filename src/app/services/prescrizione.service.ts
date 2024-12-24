import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Prescrizione } from '../models/Prescrizione.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescrizioneService {
  private collectionName = 'prescriziones';

  constructor(private firestore: Firestore) { }

  //create new item
  async createItem(item: Prescrizione): Promise<void> {
    const itemsCollection = collection(this.firestore, this.collectionName);
    await addDoc(itemsCollection, item);
  }

  //get items
  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, this.collectionName);
    return collectionData(itemsCollection, { idField: 'id' }).pipe(
      map((items) =>
        items.map((item) => {
          //check if dates are instances of timestamp
          if (item['da'] instanceof Timestamp || item['a'] instanceof Timestamp) {
            return { ...item, da: item['da'].toDate(), a: item['a'].toDate() };
          }
          return item;
        })
      )
    );
  }

  //read a single item by ID
  getItemById(id: string): Observable<any> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(itemDoc, { idField: 'id' });
  }

  //update an item
  async updateItem(id: string, data: any): Promise<void> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(itemDoc, data);
  }

  //delete an item
  async deleteItem(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(itemDoc);
  }
}
