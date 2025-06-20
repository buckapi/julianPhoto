import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about/about.component';
import { ServiceComponent } from './components/service/service/service.component';
import { GlobalService } from './services/global.service';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    GalleryComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'julianpwa';

  constructor(public global: GlobalService) { }
}
