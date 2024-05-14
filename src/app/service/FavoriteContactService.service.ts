import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import { FavoriteContacts } from '../favorite-contacts';

@Injectable({ providedIn: 'root' })
export class FavoriteContactsService {
  private favorite_group: FavoriteContacts = new FavoriteContacts();

  getGroup(): Contact[] {
    return this.favorite_group.favorite_contacts;
  }

  add(contact: Contact) {
    if (Boolean(Number(contact.favorite)) === true) {
      const new_contact: Contact = {
        id_: Number(contact.id_),
        name_: contact.name_,
        surname: contact.surname,
        phone_number_: contact.phone_number_,
        email: contact.email,
        note: contact.note,
        group: contact.group,
        favorite: Boolean(Number(contact.favorite)),
      };
      this.favorite_group.favorite_contacts.push(new_contact);
    }
  }

  update(editing_contact: Contact) {
    this.delete(Number(editing_contact.id_));
    this.add(editing_contact);
  }

  delete(id: number): Contact[] {
    this.favorite_group.favorite_contacts =
      this.favorite_group.favorite_contacts.filter(
        (contact) => contact.id_ !== Number(id)
      );
    // если не возвращать полученный массив, то массив в главной компоненете не меняется
    return this.favorite_group.favorite_contacts;
  }
}
