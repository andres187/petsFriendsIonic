import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');
  constructor(private httpService: HttpService, private storageService: StorageService, private router: Router) { }

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    })
  }

  login(postData: any): Observable<any>{
    return this.httpService.post('usuario/login', postData);
  }

  signup(postData: any): Observable<any>{
    return this.httpService.post('usuario/crear', postData);
  }

  logout(){
    //this.storageService.clear();
    this.storageService.removeItem(AuthConstants.AUTH).then(res => {
      this.userData$.next('');
      this.router.navigate(['']);
    })
  }
}
