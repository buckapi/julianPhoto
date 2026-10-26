import { Injectable } from '@angular/core';
import PocketBase, { RecordAuthResponse } from 'pocketbase';

const PB_URL = 'http://127.0.0.1:8091';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  readonly pb = new PocketBase(PB_URL);

  get isAuthenticated(): boolean {
    return this.pb.authStore.isValid && this.pb.authStore.record?.collectionName === 'site_admins';
  }

  async login(identity: string, password: string): Promise<RecordAuthResponse> {
    const response = await this.pb.collection('site_admins').authWithPassword(identity.trim(), password);
    if (!this.isAuthenticated) {
      this.logout();
      throw new Error('La cuenta no tiene permisos de administración.');
    }
    return response;
  }

  async refresh(): Promise<boolean> {
    if (!this.isAuthenticated) return false;
    try {
      await this.pb.collection('site_admins').authRefresh();
      return this.isAuthenticated;
    } catch {
      this.logout();
      return false;
    }
  }

  logout(): void { this.pb.authStore.clear(); }
}
