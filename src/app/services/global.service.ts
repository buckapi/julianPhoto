import { Injectable, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import PocketBase, { RecordModel } from 'pocketbase';

export interface ContentRecord extends RecordModel {
  title?: string;
  name?: string;
  cover?: string;
  images?: string[] | string;
  image?: string;
  files?: string[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class GlobalService implements OnDestroy {
  activeRoute = 'home';
  menuOpen = false;
  readonly pb = new PocketBase('http://127.0.0.1:8091');

  private readonly servicesSubject = new BehaviorSubject<ContentRecord[]>([]);
  readonly services$ = this.servicesSubject.asObservable();
  private readonly gallerySubject = new BehaviorSubject<ContentRecord[]>([]);
  readonly gallery$ = this.gallerySubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    // Do not request a local API while Angular is prerendering on the server.
    if (isPlatformBrowser(this.platformId)) {
      void this.loadCollection('services', this.servicesSubject);
      void this.loadCollection('gallery', this.gallerySubject);
    }
  }

  setRoute(route: string) {
    this.activeRoute = route;
    this.menuOpen = false;
  }

  private async loadCollection(
    collection: 'services' | 'gallery',
    subject: BehaviorSubject<ContentRecord[]>,
  ): Promise<void> {
    try {
      const records = await this.pb.collection(collection).getFullList<ContentRecord>({ sort: 'sort_order,-created' });
      subject.next(records.map((record) => this.withFileUrls(collection, record)));

      await this.pb.collection(collection).subscribe('*', (event) => {
        const record = this.withFileUrls(collection, event.record as ContentRecord);
        const current = subject.getValue();
        const next = event.action === 'create'
          ? [...current, record]
          : event.action === 'update'
            ? current.map((item) => item.id === record.id ? record : item)
            : current.filter((item) => item.id !== record.id);
        subject.next(next);
      });
    } catch (error) {
      // Keep the existing UI usable if PocketBase is unavailable or blocked by an extension.
      console.error(`No fue posible cargar ${collection} desde PocketBase.`, error);
    }
  }

  async submitContactMessage(payload: ContactMessagePayload): Promise<void> {
    await this.pb.collection('contact_messages').create({ ...payload, status: 'new' });
  }

  private withFileUrls(collection: 'services' | 'gallery', record: ContentRecord): ContentRecord {
    const fileNames = collection === 'services'
      ? [record.cover, ...this.asArray(record.images)]
      : this.asArray(record.image);

    return {
      ...record,
      // Components previously displayed `name`; this preserves their visual markup.
      name: record.title ?? record.name ?? '',
      files: fileNames.filter((file): file is string => Boolean(file))
        .map((file) => this.pb.files.getURL(record, file)),
    };
  }

  private asArray(value?: string | string[]): string[] {
    return Array.isArray(value) ? value : value ? [value] : [];
  }

  ngOnDestroy(): void {
    void this.pb.collection('services').unsubscribe('*');
    void this.pb.collection('gallery').unsubscribe('*');
  }
}
