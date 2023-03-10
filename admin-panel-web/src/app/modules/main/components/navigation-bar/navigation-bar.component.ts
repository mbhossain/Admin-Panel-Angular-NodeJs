/* Angular Stuff */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Third party */
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* Our own stuff */
import { SidePanelState } from '../../models/side-panel-state.enum';
import { SidePanelService } from '../../services/side-panel.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState!: SidePanelState;

  constructor(
    private _sidePanelService: SidePanelService
    , private _authService: AuthenticationService
    , private _router: Router
  ) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._sidePanelService
      .panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => this.currentPanelState = state);
  }

  public handleSingleClick(): void {
    console.log('single click');
    if (this.currentPanelState === SidePanelState.CLOSE || this.currentPanelState === SidePanelState.COLLAPSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN);
    } else {
      this._sidePanelService.changeState(SidePanelState.COLLAPSE);
    }
  }

  public handleDoubleClick(): void {
    console.log('double click');
    if (this.currentPanelState === SidePanelState.CLOSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN)
    } else {
      this._sidePanelService.changeState(SidePanelState.CLOSE);
    }
  }

  public signOut() {
    this._authService.logoutUser();
    this._router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}
