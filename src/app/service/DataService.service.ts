import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Contact } from '../contact';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}
  loadData(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>('assets/address-book.json').pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }
}
