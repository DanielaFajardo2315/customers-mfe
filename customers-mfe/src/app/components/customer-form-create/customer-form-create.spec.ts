import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormCreate } from './customer-form-create';

describe('CustomerFormCreate', () => {
  let component: CustomerFormCreate;
  let fixture: ComponentFixture<CustomerFormCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFormCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFormCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
