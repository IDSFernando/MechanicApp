import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController, Events, PickerController, AlertController } from '@ionic/angular';
import { FiltrosPage } from '../filtros/filtros.page'
import { PickerOptions } from '@ionic/core';
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

  constructor(
    private param:ActivatedRoute,
    private modalFiltros : ModalController,
    private events: Events,
    private picker: PickerController,
    private alert: AlertController
    )
    {
      this.param.queryParams.subscribe(params => {
        const busco = params['busco']
        this.busqueda = busco
      })
    }
    
    ngOnInit() {
      //Pedir a la API los resultados de búsqueda
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
    
  }
  