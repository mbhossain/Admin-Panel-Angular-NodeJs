/* Angular Stuff */
import { Injectable } from '@angular/core';

/* Third party */
import { BehaviorSubject, Observable } from 'rxjs';

/* Our own stuff */
import { SidePanelState } from '../models/side-panel-state.enum';

@Injectable({
  providedIn: 'root'
})
export class SidePanelService {
  private _panelState: SidePanelState;
  private _panelStateSource: BehaviorSubject<SidePanelState>;
  public panelStateChanges: Observable<SidePanelState>;

  constructor() {
    this._panelState = SidePanelState.OPEN;
    this._panelStateSource = new BehaviorSubject<SidePanelState>(this._panelState);
    this.panelStateChanges = this._panelStateSource.asObservable();
  }

  public changeState(state: SidePanelState): void {
    this._panelState = state;
    this._panelStateSource.next(this._panelState);
  }
}
