import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contact';
import { ContactService } from '../../service/ContactService.service';
import { ContactGroupService } from '../../service/ContactGroupService.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FavoriteContactsService } from '../../service/FavoriteContactService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  contacts_book: Contact[] = [];
  contact_send: Contact | null = null;
  update_contact: Contact | null = null;
  editing_contact: Contact | null = null;

  old_contact_id: number | 0 = 0;
  click_update: boolean = false;
  click_add: boolean = false;

  constructor(
    private contactService: ContactService,
    private groupService: ContactGroupService,
    private favoriteService: FavoriteContactsService
  ) {
    this.onreInitUpdateForm();
  }

  // форма для изменения данных контакта
  updateContactForm: FormGroup = new FormGroup({
    update_id: new FormControl(''),
    update_name: new FormControl('', Validators.required),
    update_surname: new FormControl(''),
    update_phone_number: new FormControl('', Validators.required),
    update_email: new FormControl('', this.customeEmailValidator),
    update_note: new FormControl(''),
    update_group: new FormControl(''),
    update_favorite: new FormControl(''),
  });
  onreInitUpdateForm() {
    this.updateContactForm = new FormGroup({
      update_id: new FormControl(''),
      update_name: new FormControl('', Validators.required),
      update_surname: new FormControl(''),
      update_phone_number: new FormControl('', Validators.required),
      update_email: new FormControl('', this.customeEmailValidator),
      update_note: new FormControl(''),
      update_group: new FormControl(''),
      update_favorite: new FormControl(''),
    });
  }

  ngOnInit() {
    this.contacts_book = this.contactService.getAllContacts();
    //заполняем поля формы для изменения контакта
    this.updateContactForm.patchValue({
      update_id: this.contact_send?.id_,
      update_name: this.contact_send?.name_,
      update_surname: this.contact_send?.surname,
      update_phone_number: this.contact_send?.phone_number_,
      update_email: this.contact_send?.email,
      update_note: this.contact_send?.note,
      update_group: this.contact_send?.group,
      update_favorite: this.contact_send?.favorite,
    });
  }

  catchAddClick(event: Contact): void {
    this.contactService.add(event);
    this.groupService.add(event);
    this.favoriteService.add(event);
    this.click_add = false;
  }
  addButton() {
    this.click_add = true;
  }

  click_deleteContact(id_out: string) {
    this.contacts_book = this.contactService.delete(id_out);
    this.groupService.delete(Number(id_out));
    this.favoriteService.delete(Number(id_out));
  }

  click_updateContact(contact: Contact) {
    this.click_update = true;
    this.editing_contact = contact;
  }
  click_saveEdit() {
    if (this.editing_contact !== null) {
      const index = this.contacts_book.findIndex(
        (contact) => contact.id_ === this.editing_contact!.id_
      );
      if (index !== -1) {
        this.editing_contact.favorite = Boolean(
          Number(this.editing_contact.favorite)
        );

        this.contactService.update(this.contacts_book[index]);
        this.groupService.update(this.editing_contact);
        this.favoriteService.update(this.editing_contact);
        this.editing_contact = null;
      }
    }
    this.click_update = false;
  }

  onUpdateSubmit() {
    console.log('Данные отправлены на обновление');
    this.click_update = false;
  }

  getError(control: any): string {
    if (control.errors?.emailError && control.touched)
      return 'Неверный формат почты';
    else return '';
  }

  customeEmailValidator(control: AbstractControl) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value) && control.touched)
      return {
        emailError: true,
      };
    else return null;
  }
}
