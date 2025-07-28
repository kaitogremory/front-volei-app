import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private authService: AuthService) {}

  getPlayers(): Promise<any> {
    const url = `${this.apiUrl}`;    
    const headers  = this.authService.createDefaultHttpHeaders();    
    return this.http.request('GET', url, { headers }).toPromise();
  }

  async createPlayer(request: any): Promise<any> {
    const url = `${this.apiUrl}`;
    const body = JSON.stringify(request);
    const headers  = this.authService.createDefaultHttpHeaders();
    
    return this.http.request('POST', url, { body, headers }).toPromise();
  }
}
