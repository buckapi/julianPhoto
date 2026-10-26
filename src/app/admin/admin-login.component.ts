import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], template: `
  <main class="login"><div class="login-art"><span>JP</span><p>JulianPhoto</p></div><form (ngSubmit)="submit()"><p class="eyebrow">ÁREA PRIVADA</p><h1>Bienvenido de vuelta.</h1><p class="intro">Inicia sesión para cuidar cada detalle de tu portafolio.</p>
  <label>Correo o usuario<input name="identity" [(ngModel)]="identity" autocomplete="username" required autofocus></label>
  <label>Contraseña<input name="password" [(ngModel)]="password" type="password" autocomplete="current-password" required></label>
  <p class="error" role="alert" *ngIf="error">{{ error }}</p><button [disabled]="loading">{{ loading ? 'Verificando acceso…' : 'Entrar al estudio' }} <span>→</span></button><small>Acceso exclusivo para administradores autorizados.</small></form></main>`,
  styles: [`.login{min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;background:#080808;color:#f5f3ef;font-family:Poppins,Arial,sans-serif}.login-art{background:linear-gradient(120deg,#0009,#0002),url('/images/bg/12.jpg') center/cover;display:grid;place-content:center;text-align:center}.login-art span{display:grid;place-items:center;width:86px;height:86px;border:1px solid #c9a45c;border-radius:50%;color:#d5b66e;font:30px Georgia;margin:auto}.login-art p{font-size:26px;letter-spacing:-1px}.login form{width:min(410px,86vw);margin:auto;display:grid;gap:16px}.eyebrow{margin:0;color:#c9a45c;font-size:10px;letter-spacing:2px}.login h1{margin:0;font-size:36px;font-weight:500;letter-spacing:-1.5px}.intro{color:#a6a39e;line-height:1.6;margin:0 0 12px}.login label{display:grid;gap:8px;font-size:11px;color:#d8d4cb}.login input{padding:13px;background:#111;border:1px solid #3e3e3e;color:#fff;font:14px Poppins}.login input:focus{outline:0;border-color:#c9a45c;box-shadow:0 0 0 2px #c9a45c22}.login button{margin-top:6px;padding:14px;border:0;background:#c9a45c;color:#17130b;font:600 12px Poppins;cursor:pointer}.login button span{float:right;font-size:17px}.login button:disabled{opacity:.65}.login small{color:#74716c;font-size:10px;text-align:center}.error{color:#fa9b93;margin:0;font-size:12px}@media(max-width:700px){.login{grid-template-columns:1fr}.login-art{min-height:180px}.login-art span{width:56px;height:56px;font-size:19px}.login-art p{font-size:21px}.login form{padding:40px 0 50px}.login h1{font-size:31px}}`]
})
export class AdminLoginComponent {
  identity = ''; password = ''; loading = false; error = '';
  constructor(private auth: AdminAuthService, private router: Router) {}
  async submit() { this.loading = true; this.error = ''; try { await this.auth.login(this.identity, this.password); await this.router.navigateByUrl('/admin'); } catch { this.error = 'No fue posible iniciar sesión. Verifica tus credenciales.'; } finally { this.loading = false; } }
}
