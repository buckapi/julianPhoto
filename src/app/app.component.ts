import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about/about.component';
import { ServiceComponent } from './components/service/service/service.component';
import { GlobalService } from './services/global.service';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    GalleryComponent,
    HomeComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'julianpwa';
  gallery: any[] = [];
  menuItems = [
    { label: 'Inicio', route: 'home', visible: () => true, scrollToTop: () => this.global.setRoute('home') },
    { label: 'Galeria', route: 'gallery', visible: () => true, scrollToTop: () => this.global.setRoute('gallery') },
    { label: 'Servicios', route: 'service', visible: () => true, scrollToTop: () => this.global.setRoute('service') },
    { label: 'Sobre mi', route: 'about', visible: () => true, scrollToTop: () => this.global.setRoute('about') },
    { label: 'Contactos', route: 'contact', visible: () => true, scrollToTop: () => this.global.setRoute('contact') },
  ]; 
  constructor(public global: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.global.gallery$.subscribe((gallery : any[]) => {
      this.gallery = gallery;
    });
    }
    navigateTo(route: string): void {
      this.global.activeRoute = route; // Redirige a la vista correspondiente
    }
    
    onSelect(event: any) {
      const selectedValue = event.target.value;
    
      switch(selectedValue) {
        case 'login':
          this.global.activeRoute = 'login';
          break;
        case 'register':
          this.global.activeRoute = 'register';
          break;
        case 'profile-specialist':
          this.global.activeRoute = 'profile-specialist';
          break;
       
        default:
          break;
      }
    }
    
    
}
