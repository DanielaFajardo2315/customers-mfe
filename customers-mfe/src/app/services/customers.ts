import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  postCustomer(customerToCreate: Customer) {
    return this._httpClient.post(`${this.apiUrl}/users`, customerToCreate);
  }
  getCustomers() {
    return this._httpClient.get(`${this.apiUrl}/users`);
  }
  putCustomer(customerToUpdate: Customer, id: string) {
    return this._httpClient.put(`${this.apiUrl}/users/${id}`, customerToUpdate);
  }
  delateCustomer(id: string) {
    return this._httpClient.delete(`${this.apiUrl}/users/${id}`);
  }
}
