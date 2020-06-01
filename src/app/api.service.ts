import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_API_URL = 'https://localhost:4200/';
  private username: string = 'demo';
  private password: string = 'enablex';
  constructor(private httpClient: HttpClient) {}

  public createRoom() {
    return this.httpClient.post(
      this.BASE_API_URL + 'createRoom/',
      {},
      {
        headers: new HttpHeaders({
          Authorization: 'Basic ' + btoa(this.username + ':' + this.password)
        })
      }
    );
  }

  public getAuthToken({ tokenData }) {
    return this.httpClient.post(this.BASE_API_URL + 'createToken/', tokenData, {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.username + ':' + this.password)
      })
    });
  }

  public getRoomData({ roomId }) {
    return this.httpClient.get(this.BASE_API_URL + `getRoom/${roomId}`, {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.username + ':' + this.password)
      })
    });
  }
}
