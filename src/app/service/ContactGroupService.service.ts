import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import { ContactGroup } from '../contact_group';

@Injectable({ providedIn: 'root' })
export class ContactGroupService {
  private groups: ContactGroup = new ContactGroup();
  // private selected_group: Contact[] = this.groups.family;
  // private family: Contact[] = this.groups.family;
  // private close_friends: Contact[] = this.groups.close_friends;
  // private work: Contact[] = this.groups.work;

  getGroup(group: string): Contact[] {
    switch (group) {
      case 'family':
        return this.groups.family;
      case 'close_friends':
        return this.groups.close_friends;
      case 'work':
        return this.groups.work;
      default:
        console.log("This group doesn't exist");
        return [];
    }
  }

  add(contact: Contact) {
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
    switch (contact.group) {
      case 'family':
        this.groups.family.push(new_contact);
        break;
      case 'close_friends':
        this.groups.close_friends.push(new_contact);
        break;
      case 'work':
        this.groups.work.push(new_contact);
        break;
      default:
        console.log("This group doesn't exist");
    }
  }

  update(editing_contact: Contact) {
    this.delete(Number(editing_contact.id_));
    this.add(editing_contact);
  }

  delete(id: number) {
    this.groups.family = this.groups.family.filter(
      (contact) => contact.id_ !== id
    );
    this.groups.close_friends = this.groups.close_friends.filter(
      (contact) => contact.id_ !== id
    );
    this.groups.work = this.groups.work.filter((contact) => contact.id_ !== id);
    return this.groups;
    // если не возвращать полученный массив, то массив в главной компоненете не меняется
  }
}
