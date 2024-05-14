export class Contact {
  id_: number | undefined;
  name_: string | undefined;
  surname: string | undefined;
  phone_number_: string | undefined;
  email: string | undefined;
  note: string | undefined;
  group: string | undefined;
  favorite: boolean | undefined;

  constructor(
    in_id: number,
    in_name: string,
    in_surname: string,
    in_phone_number: string,
    in_email: string,
    in_note: string,
    in_group: string,
    in_favorite: boolean
  ) {
    in_id === 0 ? (this.id_ = Date.now()) : (this.id_ = in_id);
    this.name_ = in_name;
    this.surname = in_surname;
    this.phone_number_ = in_phone_number;
    this.email = in_email;
    this.note = in_note;
    this.group = in_group;
    this.favorite = Boolean(in_favorite);
  }
}
