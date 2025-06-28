import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about/about.component';
import { ServiceComponent } from './components/service/service/service.component';
import { GlobalService } from './services/global.service';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';

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
  constructor(public global: GlobalService) { }

  ngOnInit(): void {
    this.global.gallery$.subscribe((gallery : any[]) => {
      this.gallery = gallery;
    });
  }
}
