import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import PocketBase from 'pocketbase';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  activeRoute: string = 'home';
  pb = new PocketBase('https://db.buckapi.lat:8055');

  private servicesSubject = new BehaviorSubject<any[]>([]);
  services$ = this.servicesSubject.asObservable();

  constructor() { 
    this.initServicesRealtime();
  }
  setRoute(route: string) {
    this.activeRoute = route;
  }
  async initServicesRealtime() {
    // Fetch inicial
    const result = await this.pb.collection('services').getFullList();
    this.servicesSubject.next(result);

    // Suscripción realtime
    this.pb.collection('services').subscribe('*', (e: any) => {
      let current = this.servicesSubject.getValue();
      if (e.action === 'create') {
        current = [...current, e.record];
      } else if (e.action === 'update') {
        current = current.map((c: any) => c.id === e.record.id ? e.record : c);
      } else if (e.action === 'delete') {
        current = current.filter((c: any) => c.id !== e.record.id);
      }
      this.servicesSubject.next(current);
    });
  }
}
