import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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
export class HomeComponent implements AfterViewInit, OnDestroy {
  services: any[] = [];
  swiper?: Swiper;

  constructor(public global: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    
  }

  ngOnInit(): void {
    this.global.services$.subscribe((services: any[]) => {
      this.services = services;
      this.updateSwiper();
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSwiper();
    }
  }

  private updateSwiper(): void {
    if (!isPlatformBrowser(this.platformId) || !this.services.length) return;

    queueMicrotask(() => {
      this.swiper?.destroy(true, true);
      this.swiper = new Swiper('.home-swiper', {
        direction: 'horizontal',  // ← Muy importante
        slidesPerView: 1,
        spaceBetween: 10,
        // Loop requires more slides than the active viewport. Keep a single item visible,
        // but avoid Swiper's loop warning while data is loading or contains one item.
        loop: this.services.length > 1,
        navigation: { nextEl: '.ccsw-next', prevEl: '.ccsw-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
      });
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
