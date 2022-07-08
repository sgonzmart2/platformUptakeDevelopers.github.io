import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { AuthService } from '../api/api';
import { UserService } from '../api/user.service';
import { EncryptedStorageService } from '../../utilities/encryptedStorageService'
import *  as constants from '../../utilities/constants';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { user } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDOAService {
  public getUserRol = new Subject();

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
    private userService: UserService,
    private storageSecure: EncryptedStorageService,
    private router: Router) { }


  /**
    * Login into the dashboard with a valid user
    * Validation of the credentials
    * @param loginData username and password
    * @returns the response from the server
    */
  public login(loginData: any): Observable<any> {
    let authService: AuthService = new AuthService(this.http, null, null);
    this.loggedIn.next(true);
    return authService.getUserDetails(loginData);
  }

  public decodeToken(token: string) {
    return jwt_decode(token);
  }

  /**
  * Check the JWT credentials for blocking routes
  */
  public isLoggedIn() {

    var token = this.getToken();
    return token != null ? true : false
  }

  public emitLogin() {
    this.loggedIn.next(true);
  }

  public logout() {
    this.loggedIn.next(false);

    this.router.navigate(['/']);
  }

  public updateUserInfo() {
    if (this.isLoggedIn()) {
      this.login(this.getToken()).subscribe(
        response => {
          let currentUser: user = response;
          this.storeData(currentUser.role_title)
          this.storageSecure.secureStorage(constants.user_info, JSON.stringify(currentUser))
        });
    }
  }

  get isLoggedInObservable(): BehaviorSubject<any> {
    return this.loggedIn as BehaviorSubject<any>;
  }

  getToken() {
    let user_id = this.storageSecure.decryptSecureStorage(constants.user_id);
    return user_id;
  }

  userIsAdmin(): boolean {
    let user = JSON.parse(this.storageSecure.decryptSecureStorage(constants.user_info));
    let f = new FunctionsComponent();
    if (user != null) {
      this.storeData(user.role_title)
      return (f.getRol(user.role_id) == constants.rol.GAdmin || f.getRol(user.role_id) == constants.rol.PAdmin)
    }
    else
      return false;
  }

  userIsOwner(): boolean {
    let user = JSON.parse(this.storageSecure.decryptSecureStorage(constants.user_info));
    let f = new FunctionsComponent();
    if (user != null) {
      this.storeData(user.role_title)
      return (f.getRol(user.role_id) == constants.rol.Own)
    }
    else
      return false;
  }


  allowToInDeep(): boolean {
    let user = JSON.parse(this.storageSecure.decryptSecureStorage(constants.user_info));
    let f = new FunctionsComponent();
    if (user != null) {
      this.storeData(user.role_title);
      return (f.getRol(user.role_id) == constants.rol.GAdmin || f.getRol(user.role_id) == constants.rol.PAdmin
        || f.getRol(user.role_id) == constants.rol.Own)
    }
    else
      return false
  }

  getUserWeigths() {
    this.updateUserInfo();
    let user = JSON.parse(this.storageSecure.decryptSecureStorage(constants.user_info));
    if (user != null) {
      return user.custom_KPI_weights;
    }
    else
      return []
  }

  insertNewUserWeights(body) {
    return this.userService.insertNewUserWeights(body)
  }

  async storeData(data) {
    this.getUserRol.next(data);
  }
}
