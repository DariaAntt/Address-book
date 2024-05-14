import { Contact } from './contact';

export class ContactGroup {
  family: Contact[];
  close_friends: Contact[];
  work: Contact[];

  constructor() {
    this.family = [];
    this.close_friends = [];
    this.work = [];
  }
}
