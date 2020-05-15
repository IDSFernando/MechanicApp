import { Injectable } from '@angular/core';
// REST
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class WorkshopServiceService {
  db = "127.0.0.1:8000/api/v1"
  constructor(
    private api: HttpClient
  ) {}

  getCMAS(): Observable<any>{
    return this.api.get(`${this.db}/talleres/`)
  }
}
