import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../new/new.component';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = 'http://localhost:5169/api/collection/';
  constructor(private http: HttpClient) {}
  createCollection(collection: Collection): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, collection);
  }
  getAllCollections(): Observable<Collection[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Collection[]>(url);
  }
  getUserCollections(email: string): Observable<Collection[]> {
    const url = `${this.apiUrl}${email}`;
    return this.http.get<Collection[]>(url);
  }
  deleteCollection(collectionId: number): Observable<any> {
    const url = `${this.apiUrl}${collectionId}`;
    return this.http.delete(url);
  }
}
