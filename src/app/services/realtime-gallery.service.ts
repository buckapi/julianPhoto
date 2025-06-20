import { Injectable, OnDestroy } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Gallery {
  name: string;
  images?: string[]; // JSON array
  status?: string;
}



@Injectable({
  providedIn: 'root',
})
export class RealtimeGalleryService implements OnDestroy {
  private pb: PocketBase;
  private gallerySubject = new BehaviorSubject<Gallery[]>([]);

  // Observable for components to subscribe to
  public gallery$: Observable<Gallery[]> =
    this.gallerySubject.asObservable();

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
      this.pb.collection('gallery').subscribe('*', (e : any) => {
        this.handleRealtimeEvent(e);
      });

      // Initialize the list of professionals
      this.updateGalleryList();
    } catch (error) {
      console.error('Error during subscription:', error);
    }
  }

  private handleRealtimeEvent(event: any) {
    console.log(`Event Action: ${event.action}`);
    console.log(`Event Record:`, event.record);

    // Update the list of professionals
    this.updateGalleryList();
  }

  private async updateGalleryList() {
    try {
      // Get the updated list of professionals
      const records = await this.pb.collection('gallery').getFullList<Gallery>(200, {
        sort: '-created', // Sort by creation date
      });

      // Ensures each record conforms to Service structure
      const gallery = records.map((record: any) => ({
        ...record,
        images: Array.isArray(record.images) ? record.images : [],
        services: Array.isArray(record.services) ? record.services : [],
      })) as Gallery[];

      this.gallerySubject.next(gallery);
    } catch (error) {
      console.error('Error updating gallery list:', error);
    }
  }

  ngOnDestroy() {
    // Unsubscribe when the service is destroyed
    this.pb.collection('gallery').unsubscribe('*');
  }
}
