import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController, ModalController } from '@ionic/angular'


// Importación necesaria para poder realizar llamadas telefónicas
import { CallNumber } from '@ionic-native/call-number/ngx'

import { ActionSheetController } from '@ionic/angular'
import { FormGroup, FormBuilder , Validators} from '@angular/forms';

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

import { LoadingController } from '@ionic/angular'
import { resolve } from 'q';
import { Geolocation } from '@ionic-native/geolocation/ngx'

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  
  currentModal: ModalController
  currentSegment: string = "map"
  phoneNumbers:string[] = []
  comentarios:any = []
  commentFormGroup:FormGroup
  currentCMA:any = null
  roundedRate:number = 0


  userLat:any = ''
  userLng:any = ''
  
  constructor(
    private nav: NavParams,
    private llamada: CallNumber,
    private actionSheetController: ActionSheetController,
    private formBuilder:FormBuilder,
    private loading: LoadingController,
    private alert: AlertController,
    private gps: Geolocation,
    )
    {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaWRzZmVybmFuZG8iLCJhIjoiY2p4NHhzZjQ3MDJyNzQzdXJxYW01cGE4NSJ9.703KpAMi7SCviDt79F_Y1g'
      this.currentModal = this.nav.get('modal')
      this.phoneNumbers = [
        '9611319085',
        '9612387823'
      ]
      this.commentFormGroup = this.formBuilder.group({
        'rate': ['', Validators.required],
        'comment': ['', Validators.required]
      })
    }
    
    
    async showMap()
    {
      //Obtener la ubicación del cliente
      await this.gps.getCurrentPosition().then(
        (pos) => {
          this.userLng = pos.coords.longitude
          this.userLat = pos.coords.latitude
        },
        (error) => {
          this.showAlert('No pudimos acceder a tu ubicación, verifica lo siguiente:\n1. ¿Está encendido el GPS de tu dispositivo?\n2. ¿Nos otorgaste acceso a usar tu GPS?')
        }
      )

      var map = new mapboxgl.Map({
        container: 'taller-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 15,
        center: [
          parseFloat(this.userLng),
          parseFloat(this.userLat)
        ]
      });
      var marker = new mapboxgl.Marker()
      marker.setLngLat([
        parseFloat(this.currentCMA.longitude),
        parseFloat(this.currentCMA.latitude)
      ])
      marker.setPopup(new mapboxgl.Popup({
        offset: 25
      }) // add popups
      .setHTML('<h3>' + this.currentCMA.name + '</h3><p>' + this.currentCMA.address + '</p>'))
      marker.addTo(map)


      var marker_user = new mapboxgl.Marker()
      marker_user.setLngLat([
        parseFloat(this.userLng),
        parseFloat(this.userLat)
      ])
      marker_user.setPopup(new mapboxgl.Popup({
        offset: 25
      }) // add popups
      .setHTML('<h3>' + 'Aquí estás' + '</h3>'))
      marker_user.addTo(map)
    }
    ionViewDidLoad()
    {
    }
    async ionViewDidEnter()
    {
      try{
        await this.load()
        this.showMap()
      }
      catch(er){
        this.showAlert(er)
      }
      return Promise.resolve(this.currentCMA)
    }
    
    //Obtener los datos desde la API
    async load()
    {
      const loading = await this.loading.create({
        message: 'Cargando datos del taller...',
        translucent: true,
        backdropDismiss: false,
        showBackdrop: true
      });
      // await loading.present()
      try{
        this.currentCMA = await this.nav.get('cma')
        this.roundedRate = Math.round(this.currentCMA.grade_average)
      }
      catch(e){
        this.showAlert('Ocurrió un error mientras se obtenían los datos')
      }
      // loading.dismiss()
    }
    
    ngOnInit() {
    }
    
    /**
    * Llamar al CMA
    *
    * @param   {number}  number  Número telefónico del CMA
    *
    */
    async call()
    {
      if(this.phoneNumbers.length > 1)
      {
        let _buttons = []
        
        this.phoneNumbers.forEach(number => {
          _buttons.push(
            {
              text: number,
              handler: () => {
                this.tryCall(number)
              }
            }
            )
          })
          _buttons.push({
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          })
          const actionSheet = await this.actionSheetController.create({
            header: 'Elige una opción',
            translucent: true,
            buttons: _buttons
          })
          await actionSheet.present();
        }
        else
        {
          this.tryCall(this.phoneNumbers[0])
        }
        
      }
      
      tryCall(number)
      {
        const numero = ''+number
        this.llamada.callNumber(numero, true)
        .then(res => {
          // En este punto la GUI de la llamada se encuentra en curso
        })
        .catch(err => {
          alert(`La llamada no se pudo realizar,\n ${err}`)
        })
      }
      /**
      * Salir de la vista actual
      *
      */
      leave()
      {
        this.currentModal.dismiss()
      }
      
      
      eval()
      {
        this.comentarios.unshift({
          autor: 'Luis Fernando',
          mensaje: this.commentFormGroup.get('comment').value,
          valoracion: this.commentFormGroup.get('rate').value
        })
        return resolve(this.comentarios).then(()=>{
          this.commentFormGroup.reset()
        })
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
}
    