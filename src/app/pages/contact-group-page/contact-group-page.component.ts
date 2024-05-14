import { Component } from '@angular/core';
import { Contact } from '../../contact';
import { ContactGroupService } from '../../service/ContactGroupService.service';
import { ContactGroup } from '../../contact_group';
import { ContactService } from '../../service/ContactService.service';

@Component({
  selector: 'app-contact-group-page',
  templateUrl: './contact-group-page.component.html',
  styleUrl: './contact-group-page.component.css',
})
export class ContactGroupPageComponent {
  // groups: ContactGroup = new ContactGroup();
  book: Contact[] = [];
  editing_contact: Contact | null = null;
  selected_group: Contact[] = [];

  family: Contact[] = [];
  close_friends: Contact[] = [];
  work: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private groupService: ContactGroupService
  ) {}

  ngOnInit() {
    this.book = this.contactService.getAllContacts();
    this.family = this.groupService.getGroup('family');
    this.close_friends = this.groupService.getGroup('close_friends');
    this.work = this.groupService.getGroup('work');

    this.selected_group = this.family;
  }

  click_select_group(select_group: string) {
    switch (select_group) {
      case 'family':
        this.selected_group = this.family;
        break;
      case 'close_friends':
        this.selected_group = this.close_friends;
        break;
      case 'work':
        this.selected_group = this.work;
        break;
      default:
        console.log("This group doesn't exist");
    }
  }

  click_deleteContact(id: string) {
    const new_group = this.groupService.delete(Number(id));
    this.contactService.delete_group(Number(id));

    this.family = new_group.family;
    this.close_friends = new_group.close_friends;
    this.work = new_group.work;
    this.ngOnInit();
  }
}
