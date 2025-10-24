import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Customer } from '../../interfaces/customer';
import { CustomersService } from '../../services/customers';
import { CustomerForm } from '../customer-form/customer-form';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CustomerForm,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit, AfterViewInit {
  private _customersService = inject(CustomersService);
  private dialog = inject(MatDialog);
  allCustomers: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>();
  
  // Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


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

  // Eliminar cliente
  deleteCustomer(id: string) {
    this._customersService.delateCustomer(id).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: '¿Desea eliminar este cliente?',
          text: 'No podrá revertir esta acción',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'var(--primary-color)',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Cliente eliminado',
              text: 'Este cliente ha sido eliminado exitosamente',
              icon: 'success',
            });
          }
        });
      },
      error: (err: any) => {
        console.error('Error al eliminar el cliente: ', err);
        Swal.fire({
          title: 'Ocurrió un error',
          text: 'Este cliente no ha podido ser eliminado, intente de nuevo',
          icon: 'error',
        });
      },
    });
  }

  // Redirección actualizar cliente
  putCustomer(customer: Customer) {
    const dialogRef = this.dialog.open(CustomerForm, {
      width: '80%',
      height: '80%',
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showCustomers();
      }
    });
  }

  // Paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: Customer) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Nombre',
      cell: (element: Customer) => `${element.name}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: Customer) => `${element.email}`,
    },
    {
      columnDef: 'phone',
      header: 'Teléfono',
      cell: (element: Customer) => `${element.phone}`,
    },
    {
      columnDef: 'company',
      header: 'Empresa',
      cell: (element: Customer) => `${element.company}`,
    },
    {
      columnDef: 'location',
      header: 'Ubicación',
      cell: (element: Customer) => `${element.location}`,
    },
    {
      columnDef: 'position',
      header: 'Cargo',
      cell: (element: Customer) => `${element.position}`,
    },
    {
      columnDef: 'actions',
      header: 'Acciones',
      cell: (element: Customer) => '',
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);

  ngOnInit() {
    this.showCustomers();
  }
}
