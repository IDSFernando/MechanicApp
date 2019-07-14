import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController, ModalController } from '@ionic/angular'


// Importación necesaria para poder realizar llamadas telefónicas
import { CallNumber } from '@ionic-native/call-number/ngx'

import { ActionSheetController } from '@ionic/angular'
import { FormGroup, FormBuilder , Validators} from '@angular/forms';

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

import { LoadingController } from '@ionic/angular'
import { resolve } from 'q';


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

  constructor(
    private nav: NavParams,
    private llamada: CallNumber,
    private actionSheetController: ActionSheetController,
    private formBuilder:FormBuilder,
    private loading: LoadingController
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
      this.comentarios.push({
        autor: 'Bot 1',
        mensaje: 'Excelente servicio',
        valoracion: 5
      })

      this.comentarios.push({
        autor: 'Bot 2',
        mensaje: 'Te atienden muy bien',
        valoracion: 5
      })

      this.comentarios.push({
        autor: 'Bot 3',
        mensaje: 'Pésimo servicio',
        valoracion: 1
      })

      setTimeout(() => {
        //this.showMap()
      }, 1000);
    }


    showMap()
    {
      var map = new mapboxgl.Map({
        container: 'taller-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 15,
        center: [-93.0993909, 16.7421112]
      });
      map.addControl(new mapboxgl.NavigationControl());
      var marker = new mapboxgl.Marker();
      marker.setLngLat([
        -93.0993909,
        16.7421112
      ]);
      marker.addTo(map);
    }
    ionViewDidLoad()
    {
    }
    ionViewDidEnter()
    {
      this.load()
      this.showMap()
    }

    //Obtener los datos desde la API
  async load()
  {
    const loading = await this.loading.create({
      message: 'Espere...',
      translucent: true,
      backdropDismiss: false,
      showBackdrop: true
    });

    await loading.present()

    setTimeout(() => {
      loading.dismiss()
    }, 1000);
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
    }
