import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserDOAService } from '../api/DOA/user-doa.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNoAuthComponent } from '../components/modal-no-auth/modal-no-auth.component';
import { EncryptedStorageService } from '../utilities/encryptedStorageService';
import *  as constants from '../utilities/constants';
import { FunctionsComponent } from '../utilities/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLoggedIn: boolean;

  constructor(
    private userService: UserDOAService,
    public matDialog: MatDialog,
    private router: Router,
    private storageSecure: EncryptedStorageService
  ) { }

  canActivate() {
    if (!this.userService.isLoggedIn()) {
      this.isLoggedIn = false;
      this.matDialog.open(ModalNoAuthComponent);
      this.router.navigate(['/']);
    }
    else {
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

  userIsLogged(): boolean {

    let user = JSON.parse(this.storageSecure.decryptSecureStorage(constants.user_info));
    let f = new FunctionsComponent();

    let isLogged = this.userService.isLoggedIn()
    let isValidUser = false;
    if (user != null) {
      isValidUser = f.getRol(user.role_id) == constants.rol.GAdmin || f.getRol(user.role_id) == constants.rol.PAdmin || f.getRol(user.role_id) == constants.rol.Other
        || f.getRol(user.role_id) == constants.rol.Own
    }

    return isValidUser && isLogged
  }
}
