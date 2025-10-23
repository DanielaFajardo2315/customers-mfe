import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CustomerList } from './components/customer-list/customer-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CustomerList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('customers-mfe');
}
