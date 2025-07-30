import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Session } from '../interfaces/Session';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/sessions`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  async getSessions(): Promise<any> {
    const url = `${this.apiUrl}`;    
    const headers  = this.authService.createDefaultHttpHeaders();    
    return this.http.get(url, { headers }).toPromise();
  }

  async getActiveSession(): Promise<any> {
    const url = `${this.apiUrl}/active`;    
    const headers  = this.authService.createDefaultHttpHeaders();  
    return this.http.get(url, { headers }).toPromise();
  }

  async createSession(request: any): Promise<any> {
    const url = `${this.apiUrl}`;
    const body = JSON.stringify(request);
    const headers  = this.authService.createDefaultHttpHeaders();
    return this.http.post(url, body, { headers }).toPromise();
  }

  async closeSession(id: string): Promise<any> {
    const url = `${this.apiUrl}/${id}/close`;
    const headers  = this.authService.createDefaultHttpHeaders();
    return this.http.put(url, { headers }).toPromise();
  }

  async updateSession(request: any): Promise<any> {
    const url = `${this.apiUrl}/${request.id}`;
    const body = JSON.stringify(request);
    const headers  = this.authService.createDefaultHttpHeaders();
    return this.http.put(url, body, { headers }).toPromise();
  }

  async updateTeams(sessionId: string, teams: any[]): Promise<any> {
    const url = `${this.apiUrl}/${sessionId}/teams`;
    const headers = this.authService.createDefaultHttpHeaders();
    return this.http.put(url, { teams }, { headers }).toPromise();
  }
}
