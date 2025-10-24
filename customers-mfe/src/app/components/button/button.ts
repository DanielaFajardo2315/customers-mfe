import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../interfaces/customer';
import { CustomersService } from '../../services/customers';
import { CustomerFormCreate } from '../customer-form-create/customer-form-create';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-button',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CustomerFormCreate,
    MatDialogModule,
    MatTableModule,
  ],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  private _customersService = inject(CustomersService);
  private dialog = inject(MatDialog);
  allCustomers: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>();

  // Mostrar clientes
  showCustomers() {
    this._customersService.getCustomers().subscribe({
      next: (resp: any) => {
        this.allCustomers = resp;
        this.dataSource.data = this.allCustomers;
        console.log(resp);
      },
      error: (err: any) => {
        console.error('Error al mostrar los clientes: ', err);
      },
    });
  }

  postCustomer() {
    const dialogRef = this.dialog.open(CustomerFormCreate, {
      width: '80%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showCustomers();
      }
    });
  }
}
