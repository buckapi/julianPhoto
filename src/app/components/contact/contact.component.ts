import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  sending = false;
  submitError = '';
  contact = {
    name: '',
    email: '',
    comments: ''
  };

  constructor(private readonly global: GlobalService) {}

  async sendToWhatsApp() {
    this.sending = true;
    this.submitError = '';
    try {
      await this.global.submitContactMessage({
        name: this.contact.name,
        email: this.contact.email,
        message: this.contact.comments,
      });
    } catch (error) {
      console.error('No fue posible guardar el mensaje de contacto.', error);
      this.submitError = 'No pudimos enviar tu mensaje. Inténtalo nuevamente.';
      return;
    } finally {
      this.sending = false;
    }

    const phone = '972526767187';
    const message = `Hola, me contacto desde la web JulianPilcue.com, mi nombre es: ${this.contact.name}%0A, mi correo es ${this.contact.email}%0A y mi mensaje es: ${this.contact.comments}`;
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
    this.resetForm();
  }

  resetForm() {
    this.contact = {
      name: '',
      email: '',
      comments: ''
    };
  }
}
