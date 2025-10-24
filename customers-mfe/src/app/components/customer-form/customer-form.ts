import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from '../../interfaces/customer';
import { CustomersService } from '../../services/customers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  imports: [],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  private _customersService = inject(CustomersService);
  putCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(<number | null>null, [Validators.required, Validators.minLength(7)]),
    company: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
  });

  putCustomerById(id: string, customerToUpdate: Customer) {
    if (this.putCustomerForm.invalid) {
      this.putCustomerForm.markAllAsTouched();
      return;
    }
    const customerData: Customer = {
      id: '',
      name: this.putCustomerForm.value.name || '',
      email: this.putCustomerForm.value.email || '',
      phone: this.putCustomerForm.value.phone || 0,
      company: this.putCustomerForm.value.company || '',
      location: this.putCustomerForm.value.location || '',
      position: this.putCustomerForm.value.position || '',
    };
    this._customersService.putCustomer(customerToUpdate, id).subscribe({
      next: (resp: any) => {
        console.log('Cliente actualizado: ', resp);
        Swal.fire({
          title: 'Cliente actualizado correctamente',
          icon: 'success',
          draggable: true,
        });
      },
      error: (err: any) => {
        console.error('Error al actualizar el cliente: ', err);
        Swal.fire({
                  title: 'Ocurrió un error',
                  text: 'Este cliente no ha podido ser actualizado, intente de nuevo',
                  icon: 'error',
                });
      },
    });
  }
}
