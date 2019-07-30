import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController, Events, PickerController, AlertController, LoadingController } from '@ionic/angular';
import { FiltrosPage } from '../filtros/filtros.page'
import { PickerOptions } from '@ionic/core';
import { RESTService } from '../rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ServiceDetailsPage } from '../service-details/service-details.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  
  busqueda:any = ''
  filtro_categoria:any = 'Todos'
  filtro_valoracion:any = 'Todos'
  filtro_ubicacion:any = 'Todos'
  showingFiltersBar:boolean = false
  hasDone:boolean = false
  lat:any = null
  lng:any = null


  coincidencias:any = []

  _loading:any

  constructor(
    private param:ActivatedRoute,
    private modalFiltros : ModalController,
    private events: Events,
    private picker: PickerController,
    private alert: AlertController,
    private api: RESTService,
    private gps: Geolocation,
    private loading: LoadingController,
    private openPageAsModal : ModalController,
    private keyboard:Keyboard,
    )
    {
      this.param.queryParams.subscribe(params => {
        const busco = params['busco']
        this.busqueda = busco
      })

      setTimeout(() => {
        this.keyboard.hideFormAccessoryBar(false)
        this.gps.getCurrentPosition().then(
          (pos) => {
            this.lat = pos.coords.latitude
            this.lng = pos.coords.longitude

            this.api.searchServicesOrWorkshops({
              token: localStorage.getItem('auth_token'),
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              search: this.busqueda
            })
            .subscribe(
              (data) => {
                this.hasDone = true
                this._loading.dismiss()
                data.cmas.forEach(cma => {
                  this.coincidencias.push({
                    taller: 1,//Si es servicios irá 0
                    distance: cma.distance,
                    id: cma.id,
                    name: cma.name,
                    cmv_image_url: cma.cmv_image_url,
                    rate: Math.round(cma.grade_average)
                  })
                });
              },
              (error) => {
                this.hasDone = true
                this._loading.dismiss()
                console.log(error)
                this.showAlert(this.objToString(error.error))
              }
            )
          }
        )

        return Promise.resolve(this.coincidencias)
      }, 1000);

    }
    
    async ngOnInit() {
      //Pedir a la API los resultados de búsqueda
      this._loading = await this.loading.create({
        message: 'Buscando...',
        translucent: true,
        backdropDismiss: false,
        showBackdrop: true
      });
  
      await this._loading.present()
      this.showingFiltersBar = false
      return Promise.resolve(this.showFiltersBar)
    }

    showFiltersBar()
    {
      if(!this.showingFiltersBar)
        this.showingFiltersBar = true
      else
      this.showingFiltersBar = false
    }
    
    /**
    * Abrir el Popup con las opciones de filtros para
    * las categorías
    */
    async openCatPopup()
    {
      const options: PickerOptions = {
        backdropDismiss: false,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: (value: any): void => {}
          },
          {
            text: 'OK',
            handler: (selected: any): void => {
              this.filtro_categoria = selected.categorias.value
              this.filterByCategory(selected.categorias.value)
            }
          }
        ],
        columns: [
          {
            name: 'categorias',
            options: [
              {
                text: 'Todos',
                value: 'Todos'
              },
              {
                text: 'Talleres',
                value: 'Talleres'
              },
              {
                text: 'Servicios',
                value: 'Servicios'
              },
            ]
          }
        ]
      }
      
      const picker = await this.picker.create(options)
      picker.present()
    }
    
    /**
    * Abrir el Popup con las opciones de filtros para
    * las valoraciones
    */
    async openRatePopup()
    {
      
      const options: PickerOptions = {
        backdropDismiss: false,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: (value: any): void => {}
          },
          {
            text: 'OK',
            handler: (selected: any): void => {
              this.filtro_valoracion = selected.valoracion.value
              this.filterByRate(selected.valoracion.value)
            }
          }
        ],
        columns: [
          {
            name: 'valoracion',
            options: [
              {
                text: 'Todos',
                value: 'Todos'
              },
              {
                text: 'Los mejores',
                value: 'Los mejores'
              },
              {
                text: 'Los poco conocidos',
                value: 'Los poco conocidos'
              },
            ]
          }
        ]
      }
      
      const picker = await this.picker.create(options)
      picker.present()
      
    }
    /**
    * Abrir el Popup con las opciones de filtros para
    * las opciones de ubicación
    */
    async openLocPopup()
    {
      const options: PickerOptions = {
        backdropDismiss: false,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: (value: any): void => {}
          },
          {
            text: 'OK',
            handler: (selected: any): void => {
              this.filtro_ubicacion = selected.ubicacion.value
              this.filterByDistance(selected.ubicacion.value)
            }
          }
        ],
        columns: [
          {
            name: 'ubicacion',
            options: [
              {
                text: 'Todos',
                value: 'Todos'
              },
              {
                text: 'Cerca de mí',
                value: 'Cerca de mí'
              },
              {
                text: 'Lejos de mí',
                value: 'Lejos de mí'
              },
            ]
          }
        ]
      }
      
      const picker = await this.picker.create(options)
      picker.present()
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


    /**
   * Abrir la vista donde se ven los detalles de un servicio
   *
   * @param   {number}  id  ID del servicio
   *
   * @return  {Modal}      Modal con una vista previa del servicio
   */
  async showMeThisWorkshop(id)
  {
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


  /**
   * Filtrar por categoría
   *
   * @param   {String}  value  'Todos', 'Talleres', 'Servicios'
   *
   * @return  Array ordenado según `value`
   */
  filterByCategory(value:any)
  {
    switch (value) {
      case 'Todos':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'taller', 1)
        Promise.resolve(this.coincidencias)
        break;
      
      case 'Talleres':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'taller', 1)
        Promise.resolve(this.coincidencias)
        break;
      
      case 'Servicios':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'taller', 0)
        Promise.resolve(this.coincidencias)
        break;
    }
  }


  /**
   * Filtrar por valoración
   *
   * @param   {String}  value  'Todos', 'Los mejores', 'Los poco conocidos'
   *
   * @return  Array ordenado
   */
  filterByRate(value:any)
  {
    switch (value) {
      case 'Todos':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'rate', 1)
        Promise.resolve(this.coincidencias)
        break;
      case 'Los mejores':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'rate', 0)
        Promise.resolve(this.coincidencias)
        break;
      case 'Los poco conocidos':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'rate', 1)
        Promise.resolve(this.coincidencias)
        break;
    }
  }


  /**
   * Filtrar según la distancia
   *
   * @param   {String}  value  'Todos', 'Cerca de mí', 'Lejos de mí'
   *
   * @return  Array ordenado
   */
  filterByDistance(value:any)
  {
    switch (value) {
      case 'Todos':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'distance', 1)
        Promise.resolve(this.coincidencias)
        break;
      case 'Cerca de mí':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'distance', 1)
        Promise.resolve(this.coincidencias)
        break;
      case 'Lejos de mí':
        this.coincidencias = this.sortArrayOfObjects(this.coincidencias, 'distance', 0)
        Promise.resolve(this.coincidencias)
        break;
        
    }
  }


  /**
   * Ordenar un array
   *
   * @param arr => Arreglo
   * @param key => Pivote
   * @param type => Mayor o menor (1 o 0)
   */
  sortArrayOfObjects = (arr, key, type) => {
    try{
      if(type == 1)
      {
        return arr.sort((a, b) => {
          return a[key] - b[key];
        })
      }
      else
      {
        return arr.sort((a, b) => {
          return b[key] - a[key];
        })
      }
    }catch(err){
      this.showAlert(err)
    }
  }
    
}
  