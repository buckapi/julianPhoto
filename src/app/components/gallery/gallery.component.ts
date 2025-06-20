import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  gallery: any[] = [];
  
  constructor(public global: GlobalService) { }

  ngOnInit(): void {
    this.global.gallery$.subscribe((gallery : any[]) => {
      this.gallery = gallery;
    });
  }
}
