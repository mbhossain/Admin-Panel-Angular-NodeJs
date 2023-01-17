import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationLink } from '../../models/navigation-link.model';
import { SidePanelState } from '../../models/side-panel-state.enum';
import { SidePanelService } from '../../services/side-panel.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navigation-side-panel',
  templateUrl: './navigation-side-panel.component.html',
  styleUrls: ['./navigation-side-panel.component.scss']
})
export class NavigationSidePanelComponent implements OnInit, OnDestroy {
  @Input()
  public links: NavigationLink[] = [];

  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState!: SidePanelState;
  public SidePanelState = SidePanelState;

  constructor(private _sidePanelService: SidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._sidePanelService.panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => this.currentPanelState = state);
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }

}
