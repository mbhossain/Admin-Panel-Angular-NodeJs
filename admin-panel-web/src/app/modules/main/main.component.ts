/* Angular Stuff */
import { Component, OnInit } from '@angular/core';
import { DashboardLayoutConfiguration } from './models/dashboard-layout-configuration.model';
import { NavigationLink } from './models/navigation-link.model';
import { SidePanelPosition } from './models/side-panel-position.enum';
import { SidePanelState } from './models/side-panel-state.enum';

/* Our own stuff */


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public configuration: DashboardLayoutConfiguration;
  public links: NavigationLink[] = [];

  constructor() {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT, 
      SidePanelState.OPEN
    );
    this.createLinks();
   }

  ngOnInit(): void {
  }

  private createLinks() {
    this.links = [
      new NavigationLink("Home", ['home'], "fas fa-home"),
      new NavigationLink("Dashboard", ['dashbaord'], "fas fa-tachometer-alt fa-spin"),
      new NavigationLink("Account Info", ['account'], "fas fa-user fa-spin"),
      new NavigationLink("Categories", ['categories'], "fa fa-university fa-spin")
    ]
  }

}
