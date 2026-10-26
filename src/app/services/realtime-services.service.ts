import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentRecord, GlobalService } from './global.service';

/** Compatibility facade. GlobalService owns the only PocketBase subscription. */
@Injectable({ providedIn: 'root' })
export class RealtimeServicesService {
  readonly services$: Observable<ContentRecord[]>;

  constructor(global: GlobalService) {
    this.services$ = global.services$;
  }
}
