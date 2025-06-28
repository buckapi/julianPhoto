import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    comments: ''
  };

  sendToWhatsApp() {
    const phone = '972526767187';
    const message = `Hola, me contacto desde la web JulianPilcue.com, mi nombre es: ${this.contact.name}%0A, mi correo es ${this.contact.email}%0A y mi mensaje es: ${this.contact.comments}`;
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
    this.resetForm()
  }

  resetForm() {
    this.contact = {
      name: '',
      email: '',
      comments: ''
    };
  }
}
