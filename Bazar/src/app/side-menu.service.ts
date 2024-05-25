import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private showSidemenuSubject = new BehaviorSubject<boolean>(true);
  showSidemenu$ = this.showSidemenuSubject.asObservable();

  constructor() {}

  
  toggleSidemenu(newValue?: boolean) {
    if (newValue !== undefined) {
      this.showSidemenuSubject.next(newValue);
    } else {
      this.showSidemenuSubject.next(!this.showSidemenuSubject.value);
    }
  }
}
