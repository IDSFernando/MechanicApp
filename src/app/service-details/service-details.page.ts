import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController, ModalController } from '@ionic/angular'


// Importación necesaria para poder realizar llamadas telefónicas
import { CallNumber } from '@ionic-native/call-number/ngx'

import { ActionSheetController } from '@ionic/angular'


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  
  currentModal: ModalController
  
  currentSegment: string = "map"
  phoneNumbers:string[] = []
  
  constructor(
    private nav: NavParams,
    private llamada: CallNumber,
    private actionSheetController: ActionSheetController,
    )
    {
      this.currentModal = this.nav.get('modal')
      this.phoneNumbers = [
        '9611319085',
        '9612387823'
      ]
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
      
    }
    