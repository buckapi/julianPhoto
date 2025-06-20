import { Injectable, OnDestroy } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Service {
  name: string;
  images?: string[]; // JSON array
  status?: string;
}



@Injectable({
  providedIn: 'root',
})
export class RealtimeServicesService implements OnDestroy {
  private pb: PocketBase;
  private servicesSubject = new BehaviorSubject<Service[]>([]);

  // Observable for components to subscribe to
  public services$: Observable<Service[]> =
    this.servicesSubject.asObservable();

  constructor() {
    this.pb = new PocketBase('https://db.buckapi.lat:8055');
    this.subscribeToServices();
  }

  private async subscribeToServices() {
    try {
      // (Optional) Authentication
      await this.pb
        .collection('users')
        .authWithPassword('admin@email.com', 'admin1234');

      // Subscribe to changes in any record of the 'professionals' collection
      this.pb.collection('services').subscribe('*', (e : any) => {
        this.handleRealtimeEvent(e);
      });

      // Initialize the list of professionals
      this.updateServicesList();
    } catch (error) {
      console.error('Error during subscription:', error);
    }
  }

  private handleRealtimeEvent(event: any) {
    console.log(`Event Action: ${event.action}`);
    console.log(`Event Record:`, event.record);

    // Update the list of professionals
    this.updateServicesList();
  }

  private async updateServicesList() {
    try {
      // Get the updated list of professionals
      const records = await this.pb.collection('services').getFullList<Service>(200, {
        sort: '-created', // Sort by creation date
      });

      // Ensures each record conforms to Service structure
      const services = records.map((record: any) => ({
        ...record,
        images: Array.isArray(record.images) ? record.images : [],
        services: Array.isArray(record.services) ? record.services : [],
      })) as Service[];

      this.servicesSubject.next(services);
    } catch (error) {
      console.error('Error updating services list:', error);
    }
  }

  ngOnDestroy() {
    // Unsubscribe when the service is destroyed
    this.pb.collection('services').unsubscribe('*');
  }
}
