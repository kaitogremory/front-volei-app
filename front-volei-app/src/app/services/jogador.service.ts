import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private apiUrl = `${environment.apiUrl}/usuarios`;
  
    constructor(private http: HttpClient, private authService: AuthService) {}
  
    listar(): Promise<any> {
      const url = `${this.apiUrl}/`;    
      const headers  = this.authService.createDefaultHttpHeaders();    
      return this.http.request('GET', url, { headers }).toPromise();
    }
}
