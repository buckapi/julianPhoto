import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about/about.component';
import { ServiceComponent } from './components/service/service/service.component';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    AboutComponent,
    ServiceComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'julianpwa';

  constructor(public global: GlobalService) { }
}
