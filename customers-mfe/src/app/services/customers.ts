import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Customers {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  postCustomer(customerToCreate: Customer) {
    return this._httpClient.post(`${this.apiUrl}/customers`, customerToCreate);
  }
  getCustomers() {
    return this._httpClient.get(`${this.apiUrl}/customers`);
  }
  putCustomer(customerToUpdate: Customer, id: string) {
    return this._httpClient.put(`${this.apiUrl}/customers/${id}`, customerToUpdate);
  }
}
