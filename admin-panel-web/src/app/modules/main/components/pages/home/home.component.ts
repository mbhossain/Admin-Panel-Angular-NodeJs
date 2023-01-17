import { Component } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private test: BaseDataService) {

  }
  ngOnInit() { }
}
