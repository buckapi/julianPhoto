import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../services/global.service';
import { PLATFORM_ID, Inject } from '@angular/core';
/* import Swiper from 'swiper/bundle'; */
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper/bundle';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // <-- Corrected here
})
export class HomeComponent implements AfterViewInit {
  services: any[] = [];
  swiper?: Swiper;

  constructor(public global: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    
  }

  ngOnInit(): void {
    this.global.services$.subscribe((services: any[]) => {
      this.services = services;
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',  // ← Muy importante
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: { nextEl: '.ccsw-next', prevEl: '.ccsw-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
      });
    }
  }
}
