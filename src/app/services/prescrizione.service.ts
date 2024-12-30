import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, DocumentData, Firestore, getDocs, query, QuerySnapshot, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { Prescrizione } from '../models/Prescrizione.model';
import { from, map, Observable } from 'rxjs';

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

  //read a single item by ID
  async getItemsByDate(date: Date): Promise<any[]> {

    console.log(date);
    const itemsCollection = collection(this.firestore, this.collectionName);
    // Create a query against the collection.
    const q = query(itemsCollection, where("da", "<=", date), where("a", ">=", date));
    const querySnapshot = await getDocs(q);
    const items: any[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      let data = doc.data();
      //check if dates are instances of timestamp
      if (data['da'] instanceof Timestamp || data['a'] instanceof Timestamp) {
        data = { ...data, da: data['da'].toDate(), a: data['a'].toDate() };
      }
      items.push(data);
    });

    return items;
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
