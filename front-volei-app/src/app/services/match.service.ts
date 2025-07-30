import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private apiUrl = `${environment.apiUrl}/players`;
      
  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) {}  

  async createMatch(request: any): Promise<any> {
    const url = `${this.apiUrl}`;
    const body = JSON.stringify(request);
    const headers  = this.authService.createDefaultHttpHeaders();
    return this.http.post(url, body, { headers }).toPromise();
  }
}
