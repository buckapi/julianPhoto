import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
services: any[] = [];
item: any = {};
searchTerm: string = '';

get filteredServices() {
  if (!this.searchTerm) return this.services;
  return this.services.filter(service =>
    service.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
constructor(public global: GlobalService) {}

  ngOnInit(): void {
    this.global.services$.subscribe((services : any[]) => {
      this.services = services;
    });
  }

  sendToWhatsApp(item: any) {
    const phone = '972526767187';
    const message = `Hola, estoy interesad@ en el servicio: ${item.name},%0APrecio: ${item.price}`;
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
    this.resetForm()
  }

  resetForm() {
    this.item = {
      name: '',
      price: ''
    };
  }
}
