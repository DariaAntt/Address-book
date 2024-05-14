import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGroupPageComponent } from './contact-group-page.component';

describe('ContactGroupPageComponent', () => {
  let component: ContactGroupPageComponent;
  let fixture: ComponentFixture<ContactGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactGroupPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
