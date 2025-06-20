import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor(public global: GlobalService) { }
}
