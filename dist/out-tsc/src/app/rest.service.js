import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
// REST
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Env
import * as dev from '../environments/environment';
var RESTService = /** @class */ (function () {
    // API en producción
    // db = production.SERVER_URL
    function RESTService(api) {
        this.api = api;
        // API en modo de desarrollo
        this.db = dev.SERVER_URL;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            })
        };
    }
    /**
     * Iniciar sesión
     *
     * @return  {JSON}  Token
     */
    RESTService.prototype.login = function (credentials) {
        return this.api.post(this.db + "/login", {
            email: credentials.email,
            password: credentials.password
        }, this.httpOptions);
    };
    /**
     * Registrar a un usuario nuevo
     *
     * @param   {JSON}  credentials  Credenciales
     *
     */
    RESTService.prototype.register = function (credentials) {
        return this.api.post(this.db + "/signup", {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            name: credentials.name,
            lastname: credentials.lastname
        }, this.httpOptions);
    };
    /**
     * Obtener los datos del usaurio en sesión
     */
    RESTService.prototype.getUserData = function (credentials) {
        return this.api.get(this.db + "/users/current?token=" + credentials.token, this.httpOptions);
    };
    /**
     * Obtener los CMA's cercanos según la distancia, latitud y longitud
     *
     * @param   {any}  data  {latitude: '', longitude: '', token: '', distance: ''}
     *
     */
    RESTService.prototype.getNearCMAS = function (data) {
        return this.api.post(this.db + "/cmas/nearby/1000", {
            token: data.token,
            latitude: data.latitude,
            longitude: data.longitude
        }, this.httpOptions);
    };
    /**
     * Obtener todo el catálogo de servicios
     *
     * @param   {any}              token  Token del cliente
     */
    RESTService.prototype.getAllServices = function (token) {
        return this.api.get(this.db + "/services?token=" + token);
    };
    RESTService.prototype.getCmaInfo = function (data) {
        return this.api.get(this.db + "/cmas/" + data.id + "?token=" + data.token, this.httpOptions);
    };
    RESTService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RESTService);
    return RESTService;
}());
export { RESTService };
//# sourceMappingURL=rest.service.js.map