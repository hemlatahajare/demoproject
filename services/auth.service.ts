import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Response, Headers, RequestOptions, Http } from '@angular/http'
//import { HttpClient, HttpHeaders } from '@angular/common/http';//Alter service used httpclient and httpheader in place of http and header
import { ApiConfigService } from '../services/api-config.service';
import { ApplicationIdService } from '../services/application-id.service';
import { BaseService } from "../services/base.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthrizationService extends BaseService {
  [x: string]: any;
  token: any;
  appId: any;
  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ApiConfigService, private router: Router, private applicationId: ApplicationIdService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
    //constant application id
    this.appId = applicationId.getApplicationId();
  }

  login(email: any, password: any) {

    let headers = new Headers();
    //let IPAddress:string=  "::9";
    let ApplicationId: string = this.appId;
    let IsCipher: string = "0";


    //sessionStorage.getItem('IPAddress');
    let Pid: string = "05104e95-8636-4298-96f1-5bccab959e9c";
    headers.append('Content-Type', 'application/json');


    return this.http
      .post(
        this.baseUrl + '/login',
        JSON.stringify({ ApplicationId, Pid, IsCipher, email, password }), { headers }

      )
      .pipe(map(res => res.json()
      ))
      .pipe(map(res => {
        if (res != "") {
          console.log(JSON.stringify(res))
          localStorage.setItem('auth_token', res.token);
          //Added New Line on 2018-12-32 By Nilesh to set username in session
          localStorage.setItem('email', email);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);

        }

        return res;
      }))
      .pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('email');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    // window.location.reload();
    this.router.navigate(['/login'])
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }



  getToken() {
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    return true;
  }
}
