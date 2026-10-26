import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

type Section = 'dashboard' | 'services' | 'portfolio' | 'categories' | 'settings';
@Component({ standalone: true, imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive], templateUrl: './admin.component.html', styleUrl: './admin.component.css' })
export class AdminComponent implements OnInit {
  section: Section = 'dashboard'; loading = true; error = ''; notice = '';
  menuOpen = false;
  editor: 'service' | 'photo' | 'category' | null = null;
  services: any[] = []; gallery: any[] = []; categories: any[] = []; settings: any = {};
  service: any = { title: '', slug: '', description: '', price_from: 0, is_active: false, sort_order: 0 };
  photo: any = { title: '', description: '', category: '', featured: false, is_published: false, sort_order: 0 };
  category: any = { name: '', slug: '', description: '', is_active: false, sort_order: 0 };
  serviceFile?: File; photoFile?: File; categoryFile?: File;
  constructor(public auth: AdminAuthService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() { this.route.data.subscribe(d => { this.section = d['section'] || 'dashboard'; this.load(); }); }
  get publishedPhotos() { return this.gallery.filter(x => x.is_published).length; }
  async load() { this.loading = true; this.error = ''; try { const pb = this.auth.pb; [this.services, this.gallery, this.categories] = await Promise.all([pb.collection('services').getFullList({sort:'sort_order,-created'}), pb.collection('gallery').getFullList({sort:'sort_order,-created'}), pb.collection('gallery_categories').getFullList({sort:'sort_order,name'})]); const ss = await pb.collection('site_settings').getFullList({requestKey:null}); this.settings = ss[0] || { photographer_name: '' }; } catch (error) { this.error = this.readError(error, 'No fue posible cargar el contenido administrativo.'); } finally { this.loading = false; } }
  file(event: Event, target: 'serviceFile'|'photoFile'|'categoryFile') { const f = (event.target as HTMLInputElement).files?.[0]; if (!f) return; if (!['image/jpeg','image/png','image/webp'].includes(f.type) || f.size > 10485760) { this.error = 'Selecciona una imagen JPG, PNG o WebP de máximo 10 MB.'; return; } this[target] = f; }
  slug(value: string) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
  edit(kind: 'service'|'photo'|'category', item?: any) { const copy = item ? {...item} : kind === 'service' ? {title:'',slug:'',description:'',price_from:0,is_active:false,sort_order:0} : kind === 'photo' ? {title:'',description:'',category:'',featured:false,is_published:false,sort_order:0} : {name:'',slug:'',description:'',is_active:false,sort_order:0}; this[kind] = copy; this.editor = kind; this.menuOpen = false; }
  closeEditor() { this.editor = null; this.serviceFile = this.photoFile = this.categoryFile = undefined; }
  async saveService() { const d:any={...this.service}; delete d.id; delete d.collectionId; delete d.collectionName; delete d.created; delete d.updated; if (!d.slug) d.slug=this.slug(d.title); if (this.serviceFile) d.cover=this.serviceFile; await this.save('services',this.service,d); }
  async savePhoto() { const d:any={...this.photo}; delete d.id; delete d.collectionId; delete d.collectionName; delete d.created; delete d.updated; if (this.photoFile) d.image=this.photoFile; if (!this.photo.id && !d.image) { this.error='Selecciona una imagen para la fotografía.'; return; } await this.save('gallery',this.photo,d); }
  async saveCategory() { const d:any={...this.category}; delete d.id; delete d.collectionId; delete d.collectionName; delete d.created; delete d.updated; if (!d.slug) d.slug=this.slug(d.name); if (this.categoryFile) d.cover=this.categoryFile; await this.save('gallery_categories',this.category,d); }
  async saveSettings() { const d={...this.settings}; delete d.id; delete d.collectionId; delete d.collectionName; delete d.created; delete d.updated; await this.save('site_settings',this.settings,d); }
  private async save(collection:string, model:any, data:any) { this.error=''; try { model.id ? await this.auth.pb.collection(collection).update(model.id,data) : await this.auth.pb.collection(collection).create(data); this.notice='Cambios guardados.'; this.closeEditor(); await this.load(); } catch (error) { this.error=this.readError(error, 'No fue posible guardar los cambios.'); } }
  async remove(collection:string,item:any) { if (!confirm(`¿Eliminar “${item.title || item.name}”? Esta acción no se puede deshacer.`)) return; try { await this.auth.pb.collection(collection).delete(item.id); await this.load(); } catch (error) { this.error=this.readError(error, 'No fue posible eliminar el registro.'); } }
  private readError(error: any, fallback: string): string { if (error?.status === 401 || error?.status === 403) return 'Tu sesión no tiene permiso para esta acción. Inicia sesión nuevamente como administrador.'; const fields = error?.response?.data; if (fields && typeof fields === 'object') return Object.values(fields).map((x: any) => x?.message).filter(Boolean).join(' ') || fallback; return fallback; }
  async logout() { this.auth.logout(); await this.router.navigateByUrl('/admin/login'); }
  image(record:any, field:string) { return record?.[field] ? this.auth.pb.files.getURL(record,record[field],{thumb:'1200x800'}) : ''; }
}
