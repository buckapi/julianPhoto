import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
services: any[] = [];

constructor(public global: GlobalService) {}

ngOnInit(): void {
  this.global.services$.subscribe((services : any[]) => {
    this.services = services;
  });
}
}
