import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentRecord, GlobalService } from './global.service';

/** Compatibility facade. GlobalService owns the only PocketBase subscription. */
@Injectable({ providedIn: 'root' })
export class RealtimeGalleryService {
  readonly gallery$: Observable<ContentRecord[]>;

  constructor(global: GlobalService) {
    this.gallery$ = global.gallery$;
  }
}
