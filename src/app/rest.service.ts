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
  login(credentials:any): Observable<any>
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
  register(credentials:any): Observable<any>
  {
    return this.api.post(`${this.db}/signup`, {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
      lastname: credentials.lastname
    }, this.httpOptions)
  }

  /**
   * Obtener los datos del usaurio en sesión
   */
  getUserData(credentials:any): Observable<any>
  {
    return this.api.get(`${this.db}/users/current?token=${credentials.token}` ,this.httpOptions)
  }

  /**
   * Actualizar los datos del cliente
   *
   * @param   {JSON}              data  Array de datos
   *
   */
  updateMyData(data:any): Observable<any>
  {
    return this.api.put(`${this.db}/users/current`, data, this.httpOptions)
  }


  /**
   * Borrar la cuenta del cliente
   *
   * @param   {String}              token  Token del cliente
   *
   * @return  {Observable<any>}        [return description]
   */
  deleteMyAccount(token:any): Observable<any>
  {
    return this.api.delete(`${this.db}/users/current?token=${token}` ,this.httpOptions)
  }

  /**
   * Obtener los CMA's cercanos según la distancia, latitud y longitud
   *
   * @param   {any}  data  {latitude: '', longitude: '', token: '', distance: ''}
   *
   */
  getNearCMAS(data:any): Observable<any>
  {
    return this.api.post(`${this.db}/cmas/nearby/${data.distance}`,
    {
      token: data.token,
      latitude: data.latitude,
      longitude: data.longitude
    },
    this.httpOptions)
  }

  /**
   * Obtener todo el catálogo de servicios
   *
   * @param   {any}              token  Token del cliente
   */
  getAllServices(token:any): Observable<any>
  {
    return this.api.get(`${this.db}/services?token=${token}`)
  }


  /**
   * Obtener la información de un CMA
   *
   * @param   {JSON}              data
   */
  getCmaInfo(data:any): Observable<any>
  {
    return this.api.get(`${this.db}/cmas/${data.id}?token=${data.token}`, this.httpOptions)
  }



  searchServicesOrWorkshops(data:any): Observable<any>
  {
    return this.api.post(`${this.db}/cmas/search/${data.search}`,
      {
        latitude: data.latitude,
        longitude: data.longitude,
        token: data.token
      },
      this.httpOptions)
  }
}
