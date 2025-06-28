import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { LightboxModule, Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, LightboxModule],
  providers: [Lightbox],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  gallery: any[] = [];
  lightboxImages: any[] = [];

  constructor(public global: GlobalService,
     private lightbox: Lightbox) { }

  ngOnInit(): void {
    this.global.gallery$.subscribe((gallery : any[]) => {
      this.gallery = gallery;
      this.lightboxImages = gallery.map(gal => ({
        src: gal.files[0],
        caption: gal.name,
        thumb: gal.files[0]
      }));
    });
  }

  open(index: number): void {
    this.lightbox.open(this.lightboxImages, index);
  }

  close(): void {
    this.lightbox.close();
  }
}

