import { Injectable } from '@angular/core'

// REST
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

// Env
import * as dev from '../environments/environment'
import * as production from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class RESTService {
  // API en modo de desarrollo
  db = dev.SERVER_URL
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    })
  }
  // API en producción
  // db = production.SERVER_URL
  constructor
  (
    private api: HttpClient,
  )
  {}

  /**
   * Iniciar sesión
   *
   * @return  {JSON}  Token
   */
  login(credentials:any)
  {
    return this.api.post(`${this.db}/login`, {
      email: credentials.email,
      password: credentials.password
    }, this.httpOptions)
  }

  /**
   * Registrar a un usuario nuevo
   *
   * @param   {JSON}  credentials  Credenciales
   * 
   */
  register(credentials:any)
  {
    return this.api.post(`${this.db}/signup`, {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    }, this.httpOptions)
  }
}
