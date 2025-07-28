import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {}
  
  createDefaultHttpHeaders(withBearer:boolean = true): any {
    let defaultHttpHeaders: HttpHeaders; 
    if(withBearer) {
      defaultHttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getToken()});
    } else {
      defaultHttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    }

    return defaultHttpHeaders;
  }

  getToken() {
    return '';
    /*
    const user = this.getUserFromStorage();
    if(user) {
      return this.getUserFromStorage().token;  
    } else {
      this.router.navigate(['/login']);  
      return '';
    } 
      */   
  }

  getUserFromStorage() {    
    return this.localStorageService.get('user');    
  }

  async login(request: any): Promise<any> {      
    const url = `${this.apiUrl}/login`;
    const body = JSON.stringify(request);
    const headers  = this.createDefaultHttpHeaders();    
    return this.http.request('POST', url, { body, headers }).toPromise();
  }

  async registrar(request: any): Promise<any> {
    const url = `${this.apiUrl}/registro`;
    const body = JSON.stringify(request);
    const headers  = this.createDefaultHttpHeaders();    
    return this.http.request('POST', url, { body, headers }).toPromise();
  }

  armazenarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obterToken() {
    return localStorage.getItem('token');
  }  
}
