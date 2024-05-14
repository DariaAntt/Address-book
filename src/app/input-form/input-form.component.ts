import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../service/ContactService.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
})
export class InputFormComponent {
  @Output() sendOutTask = new EventEmitter<Contact>();

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl(''),
    phone_number: new FormControl('', [
      Validators.required,
      this.customePhoneValidator,
      Validators.minLength(11),
      Validators.maxLength(12),
    ]),
    email: new FormControl('', this.customeEmailValidator),
    note: new FormControl(''),
    group: new FormControl(''),
    favorite: new FormControl(''),
  });

  onSubmit() {
    console.log('Данные успешно сохранены');
  }

  sendData(
    name_out: string,
    surname_out: string,
    phone_number_out: string,
    email_out: string,
    note_out: string,
    group_out: string,
    favorite_out: string
  ) {
    const new_task = new Contact(
      0,
      name_out,
      surname_out,
      phone_number_out,
      email_out,
      note_out,
      group_out,
      Boolean(Number(favorite_out))
    );

    this.sendOutTask.emit(new_task);
    this.contactForm.reset();
  }

  onreInitForm() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl(''),
      phone_number: new FormControl('', [
        Validators.required,
        // Validators.pattern('/^w+@[a-zA-Z_]+?.[a-zA-Z]{2,20}$/'),
        this.customePhoneValidator,
        Validators.minLength(11),
        Validators.maxLength(12),
      ]),
      email: new FormControl('', this.customeEmailValidator),
      note: new FormControl(''),
      group: new FormControl(''),
      favorite: new FormControl(''),
    });
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

  customePhoneValidator(control: AbstractControl) {
    const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    const value = control.value;
    if (!pattern.test(value) && control.touched)
      return {
        phoneError: true,
      };
    else return null;
  }
  getPhoneError(control: any): string {
    if (control.errors?.required && control.touched)
      return '*Обязательное поле';
    else if (control.errors?.minLength && control.touched)
      return 'Номер телефона состоит из 11 цифр';
    else if (control.errors?.phoneError)
      return 'Неверный формат номера телефона';
    else return '';
  }
}
