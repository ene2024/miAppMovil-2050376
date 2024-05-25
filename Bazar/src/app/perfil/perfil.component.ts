import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  currentUser: firebase.User | null = null;
  userDisplayName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.userDisplayName = this.authService.userDisplayName;
  }

  logout() {
    this.authService.logout();
  }
}
