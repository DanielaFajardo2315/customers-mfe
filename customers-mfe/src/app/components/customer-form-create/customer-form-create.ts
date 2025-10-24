import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../interfaces/customer';
import { CustomersService } from '../../services/customers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form-create',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './customer-form-create.html',
  styleUrl: './customer-form-create.css',
})
export class CustomerFormCreate implements OnInit {
  private _customersService = inject(CustomersService);
  private _dialogRef = inject(MatDialogRef);
  private _data = inject(MAT_DIALOG_DATA) as Customer | null;

  postCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl<number | null>(null, [Validators.required, Validators.minLength(7)]),
    company: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this._data) {
      this.postCustomerForm.patchValue(this._data as any);
    }
  }

  // Crear cliente
  save(): void {
    if (this.postCustomerForm.invalid) {
      this.postCustomerForm.markAllAsTouched();
      return;
    }

    const updatedCustomer: Customer = {
      id: this._data?.id || '',
      name: this.postCustomerForm.value.name || '',
      email: this.postCustomerForm.value.email || '',
      phone: this.postCustomerForm.value.phone || 0,
      company: this.postCustomerForm.value.company || '',
      location: this.postCustomerForm.value.location || '',
      position: this.postCustomerForm.value.position || '',
    };

    this._customersService.postCustomer(updatedCustomer).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: 'Cliente creado correctamente',
          icon: 'success',
        }).then(() => {
          this._dialogRef.close(true);
        });
      },
      error: (err: any) => {
        console.error('Error al crear el cliente: ', err);
        Swal.fire({
          title: 'Ocurrió un error',
          text: 'Este cliente no ha podido ser creado, intente de nuevo',
          icon: 'error',
        });
      },
    });
  }

  cancel(): void {
    this._dialogRef.close(false);
  }
}
