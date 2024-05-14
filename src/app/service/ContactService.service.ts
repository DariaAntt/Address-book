import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import { ContactGroupService } from './ContactGroupService.service';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { AppComponent } from '../app.component';
import { FavoriteContactsService } from './FavoriteContactService.service';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts_book: Contact[] = [];
  dataService: any;
  constructor(
    private http: HttpClient,
    private groupService: ContactGroupService,
    private favoriteService: FavoriteContactsService
  ) {}

  loadData(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>('assets/address-book.json').pipe(
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }

  getAllContacts(): Contact[] {
    if (AppComponent.read) {
      this.loadData().subscribe((read_book: Contact[]) => {
        read_book.forEach((c) => {
          this.contacts_book.push(c);
          this.groupService.add(c);
          this.favoriteService.add(c);
        });
      });

      AppComponent.read = false;
    }
    return this.contacts_book;
  }

  add(contact: Contact) {
    const new_contact: Contact = {
      id_: Number(new Date()),
      name_: contact.name_,
      surname: contact.surname,
      phone_number_: contact.phone_number_,
      email: contact.email,
      note: contact.note,
      group: contact.group,
      favorite: Boolean(Number(contact.favorite)),
    };
    this.contacts_book.push(new_contact);
  }

  delete(id: string): Contact[] {
    this.contacts_book = this.contacts_book.filter(
      (contact) => contact.id_ !== Number(id)
    );
    // если не возвращать полученный массив, то массив в главной компоненете не меняется
    return this.contacts_book;
  }

  update(updated_contact: Contact) {
    const contactIndex = this.contacts_book.findIndex(
      (contact) => contact.id_ === updated_contact.id_
    );
    if (contactIndex !== -1) {
      this.contacts_book[contactIndex] = {
        ...updated_contact,
      };
    }
  }

  delete_group(id: number): Contact[] {
    const contactIndex = this.contacts_book.findIndex(
      (contact) => contact.id_ === id
    );
    if (contactIndex !== -1) {
      this.contacts_book[contactIndex].group = '';
    }
    return this.contacts_book;
  }
}
