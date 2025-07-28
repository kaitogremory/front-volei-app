import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = `${environment.apiUrl}/players`;
    
  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  async getPlayers(): Promise<any> {
    const url = `${this.apiUrl}`;    
    const headers  = this.authService.createDefaultHttpHeaders();    
    return this.http.get(url, { headers }).toPromise();
  }

  async createPlayer(request: any): Promise<any> {
    const url = `${this.apiUrl}`;
    const body = JSON.stringify(request);
    const headers  = this.authService.createDefaultHttpHeaders();
        
    return this.http.post(url, request, { headers }).toPromise();
  }

  async updatePlayer(id: string, request: any): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    const body = JSON.stringify(request);
    const headers  = this.authService.createDefaultHttpHeaders();

    return this.http.put(url, request, { headers }).toPromise();
  }

  async deletePlayer(id: string): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.authService.createDefaultHttpHeaders();

    return this.http.delete(url, { headers }).toPromise();
  }

}
