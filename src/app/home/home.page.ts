import { Component } from '@angular/core';
import { ModalController, AlertController, Events } from '@ionic/angular';
import { ServiceDetailsPage } from '../service-details/service-details.page';
import { MenuController } from '@ionic/angular'
import { CallNumber } from '@ionic-native/call-number/ngx'
import { LoadingController } from '@ionic/angular'
import { Router, NavigationExtras } from '@angular/router'
import { RESTService } from '../rest.service'


import { Geolocation } from '@ionic-native/geolocation/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  palabraBuscada: any
  cmasCercanos:any = []

  constructor(
    private openPageAsModal : ModalController,
    private menu: MenuController,
    private llamada: CallNumber,
    private loading: LoadingController,
    private router: Router,
    private api:RESTService,
    private alert: AlertController,
    private gps: Geolocation,
    private events: Events,
  )
  {
    this.menu.enable(true)


    //Cuando cambia el rango de búsqueda
    events.subscribe('range:change', (a,b) => {
      this.load(false)
    })
  }
  ionViewDidEnter()
  {
    this.menu.enable(true)
    const auth_token = localStorage.getItem('auth_token')
    if(!auth_token)
    {
      this.router.navigateByUrl('')
    }
    else
    {
      this.load(true)
    }
  }

  /**
   * Abrir la vista donde se ven los detalles de un servicio
   *
   * @param   {number}  id  ID del servicio
   *
   * @return  {Modal}      Modal con una vista previa del servicio
   */
  async openServiceDetails(id)
  {
    let cma = null
    await this.api.getCmaInfo({
      id: id,
      token: localStorage.getItem('auth_token')
    })
    .subscribe(
      async (info) => {
        info.cma.forEach(async element => {
          const modal = await this.openPageAsModal.create({
            component: ServiceDetailsPage,
            componentProps: {
              modal: this.openPageAsModal,
              id: id,
              cma: element
            }
          })
          try{
            return await modal.present()
          }
          catch(errr){
            this.showAlert(errr)
          }
        });
      },
      (error) => {
        this.showAlert(this.objToString(error))
      }
    )
  }

  // Llamar al 911
  call911()
  {
    this.llamada.callNumber('911', true)
    .then(
      res => console.log(res)
    )
    .catch(
      err => console.error(err)
    )
  }

  //Llamar a un contato de emergencia
  callEmergencyContact()
  {
    const numero = '9611319085'
    this.llamada.callNumber(numero, true)
    .then(
      res => console.log(res)
    )
    .catch(
      err => console.error(err)
    )
  }

  //Obtener los datos desde la API
  async load(showLoading)
  {
    this.cmasCercanos = []
    const loading = await this.loading.create({
      message: 'Estamos buscando talleres cerca de tí...',
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true
    });
    if(showLoading)
      await loading.present()

    // Cambiar por obtener los cma's cercanos
    this.gps.getCurrentPosition().then(
      (pos) => {
        loading.dismiss()
        this.api.getNearCMAS({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          token: localStorage.getItem('auth_token'),
          distance: localStorage.getItem('max_distance')
        })
        .subscribe(
          (data) => {
            // Regresa algo así
            // {
            //   "id": 3,
            //   "name": "Taller de prueba 1",
            //   "grade_average": 0.9,
            //   "address": "Carretera a Suchiapa entre 2da. y 3ra. Sur Pte.",
            //   "latitude": "16.702634",
            //   "longitude": "-93.107404",
            //   "neighborhood": "Colonia El Jobo",
            //   "city": "Tuxtla Gutiérrez",
            //   "state": "Chiapas",
            //   "country": "México",
            //   "cmv_type_id": 1,
            //   "cmv_image_url": null,
            //   "notes": null,
            //   "active": 1,
            //   "created_at": null,
            //   "updated_at": null,
            //   "distance": 191
            // },
            data.cmas.forEach(taller => {
              this.cmasCercanos.push(taller)
            });
            if(showLoading)
              loading.dismiss()
          },
          (error) => {
            this.showAlert(this.objToString(error.error))
            if(showLoading)
              loading.dismiss()
          }
        )
      },
      (error) => {
        this.showAlert(`
          No pudimos acceder a tu ubicación, verifica lo siguiente:
          <ol>
            <li>¿Está encendido el GPS de tu dispositivo?</li>
            <li>¿Nos otorgaste acceso a usar tu GPS?</li>
          </ol>
          `)
        loading.dismiss()
      }

    )

    return Promise.resolve(this.cmasCercanos)
  }

  /**
   * Buscar un servicio, taller
   *
   * @param   {Event}  e
   *
   * @return  {redirect}     Vista de búsqueda
   */
  async buscar(e)
  {
    if(e.target.value.trim().length > 0)
    {
      this.palabraBuscada = e.target.value
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "busco": this.palabraBuscada
        }
      }
      this.palabraBuscada = null
      await this.router.navigate(["busqueda"], navigationExtras)
    }
    else
    {
      this.showAlert('Ingresa una palabra válida')
    }
  }

  /**
   * Mostrar una alerta, ya sea de error o de success
   *
   * @param   {String}  text  Texto a mostrar
   *
   * @return  {Alert}     Alerta
   */
  async showAlert(text:any)
  {
    let alert = await this.alert.create({
      header: "Mechanicapp",
      message: text,
      buttons: ['Ok'],
      translucent: true
    });
    return await alert.present();
  }

  /**
   * Mostrar las propiedades de un objeto
   * @param  obj Objeto
   * @return String [Estructura del objeto]
   */
  objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
  }



  refresh(e)
  {
    this.cmasCercanos = []
    this.load(true)
    e.target.complete()
  }
}
