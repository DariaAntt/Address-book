import { Component } from '@angular/core';
import { Contact } from '../../contact';
import { FavoriteContactsService } from '../../service/FavoriteContactService.service';

@Component({
  selector: 'app-favorite-contacts',
  templateUrl: './favorite-contacts.component.html',
  styleUrl: './favorite-contacts.component.css',
})
export class FavoriteContactsComponent {
  favorite_contacts: Contact[] = [];

  constructor(private favoriteService: FavoriteContactsService) {}

  ngOnInit() {
    this.favorite_contacts = this.favoriteService.getGroup();
  }
}
