import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetails } from '../models/UserDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobaldataService } from './globaldata.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserDetails>;
  public currentUser: Observable<UserDetails>;

  constructor(private http: HttpClient, private dataService: GlobaldataService) {
    this.currentUserSubject = new BehaviorSubject<UserDetails>(this.dataService.UserDetails);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDetails {
    return this.currentUserSubject.value;
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/Login`, { username, password })
      .pipe(map(user => {
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.dataService.UserDetails = new UserDetails();
          this.dataService.UserDetails = user;
          this.setToken('token', user.token);
          this.setToken('refreshToken', user.refreshToken);
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  private setToken(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.dataService.UserDetails = null;
    this.currentUserSubject.next(this.dataService.UserDetails);
  }

  register(username: string, password: string, firstname: string, lastname: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, { username, password, firstname, lastname })
      .pipe(map(user => {
        if (user.status) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.dataService.UserDetails = new UserDetails();
          this.dataService.UserDetails = user;
          // localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(this.dataService.UserDetails);
        }
        return user;
      }));
  }

}
