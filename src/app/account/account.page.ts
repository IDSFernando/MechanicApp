import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController, MenuController, NavController, Events } from '@ionic/angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { RESTService } from '../rest.service';
import { ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';


interface userData {
  email: string,
  lastname: string,
  id: number,
  name: string,
  username: string,
  userImage: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  
  currentModal: ModalController
  userdata: userData
  updateFormGroup:FormGroup
  updatePasswordFormGroup:FormGroup
  rangoBusqueda:number = 0

  isEditing: boolean = false

  constructor(
    private nav: NavParams,
    private router: Router,
    private menu: MenuController,
    private navCtrl: NavController,
    private api: RESTService,
    private alert: AlertController,
    private formBuilder:FormBuilder,
    private events: Events,
    public tostadora: ToastController,
    public loadingController: LoadingController
  )
  {
    this.currentModal = this.nav.get('modal')
    this.userdata = this.nav.get('userdata')

    this.updateFormGroup = this.formBuilder.group({
      'username': [
        this.userdata.username,
        Validators.required,
      ],
      'name': [
        this.userdata.name,
        Validators.required
      ],
      'lastname': [
        this.userdata.lastname,
        Validators.required
      ],
      
    })

    this.updatePasswordFormGroup = this.formBuilder.group({
      'password': ['thisisnotyourpassword', Validators.required],
      'newpassword': ['', [Validators.required, Validators.minLength(8)]],
    })

    const rangeLS = localStorage.getItem('max_distance')
    if(!rangeLS)
    {
      this.rangoBusqueda = 500//mts
      localStorage.setItem('max_distance', '500')
    }
    else
    {
      this.rangoBusqueda = parseInt(rangeLS)
    }
  }

  ngOnInit() {
  }

  leave()
  {
    this.currentModal.dismiss()
  }

  cerrarSesion()
  {
    localStorage.setItem('max_distance', '500')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('emergency_number')
    this.menu.close()
    this.menu.enable(false)
    this.navCtrl.navigateRoot([''])
    this.leave()
  }

  async updateMyData()
  {
    this.isEditing = false
    const passwordPrompt = await this.alert.create({
      header: 'Para actualizar tus datos necesitas ingresar tu contraseña',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingresa tu contraseña actual',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //Cancelado
          }
        },
        {
          text: 'Actualizar mis datos',
          handler: (input) => {
            if(input.password.trim().length > 0)
            {
              //API y validaciones
              let hasErrors:boolean = false
              let errors = `
              Tienes los siguientes errores:
              <ol>
              `
              if(this.updateFormGroup.get('username').value.trim().length <= 3)
              {
                errors += `<li>El nombre de usuario no es válido</li>`
                hasErrors = true
              }


              if(this.updateFormGroup.get('name').value.trim().length <= 3)
              {
                errors += `<li>El nombre no es válido</li>`
                hasErrors = true
              }

              if(this.updateFormGroup.get('lastname').value.trim().length <= 3)
              {
                errors += `<li>Tus apellidos no son válidos</li>`
                hasErrors = true
              }


              errors += `
                </ol>
                Por favor llénalos correctamente.
              `
              if(hasErrors)
              {
                this.showAlert(errors)
              }
              else
              {
                const _token = localStorage.getItem('auth_token')
                this.presentLoading()
                this.api.updateMyData({                  
                  name: this.updateFormGroup.get('name').value.trim(),
                  lastname: this.updateFormGroup.get('lastname').value.trim(),
                  username: this.updateFormGroup.get('username').value.trim(),
                  password: input.password.trim(),
                  token: _token
                })
                .subscribe(
                  (data) => {
                    this.showAlert(`Tus datos se han actualizado`)
                    this.events.publish('user:logged', null, null)
                    this.currentModal.dismiss()
                  },
                  (error) => {
                    if(error.status == 403)
                    {
                      this.showAlert(`Upss, la contraseña no es correcta, intenta de nuevo.`)
                    }
                    else
                    {
                      this.showAlert(this.objToString(error))
                    }
                  }
                )
              }
            }
            else
            {
              this.showAlert('El campo de contraseña es necesario')
            }
          }
        }
      ]
    })
    
    await passwordPrompt.present()
    
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();    
  }

  async deleteAccount()
  {
    const alert = await this.alert.create({
      header: '¿Estás seguro?',
      translucent: true,
      message: 'Esta acción no se podrá revertir',
      buttons: [
        {
          text: 'No, no quiero 😣',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Borrar mi cuenta 🥺',
          handler: () => {
            this.api.deleteMyAccount(localStorage.getItem('auth_token'))
            .subscribe(
              (response) => {
                this.currentModal.dismiss()
                localStorage.removeItem('auth_token')
                this.navCtrl.navigateRoot([''])
              },
              (error) => {
                this.showAlert(this.objToString(error))
              }
            )
          }
        }
      ]
    });

    await alert.present();
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


  updateDistance()
  {
    localStorage.setItem('max_distance', `${this.rangoBusqueda}`)
    this.events.publish('range:change', null, null)
    this.PutToast("Tu distancia ha sido actualizada a "+ this.rangoBusqueda + " metros."  , 2000)
  }

  async PutToast(msj:string, time:number){
    const toast = await this.tostadora.create({
      message: msj,
      duration: time
    });
    toast.present();
  }

  

  edit()
  {
    this.isEditing = true
  }


  async changePassword()
  {
    const np = this.updatePasswordFormGroup.get('newpassword').value.trim()
    if(np.length > 0)
    {
      const passwordPrompt = await this.alert.create({
        header: 'Para proceder necesitas ingresar tu contraseña actual',
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Ingresa tu contraseña actual',
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              //Cancelado
            }
          },
          {
            text: 'Cambiar mi contraseña',
            handler: (input) => {
              if(input.password.trim().length > 0)
              {
                //API y validaciones
                this.api.changeMyPassword({
                  password: input.password.trim(),
                  newpassword: this.updatePasswordFormGroup.get('newpassword').value,
                  token: localStorage.getItem('auth_token')
                })
                .subscribe
                (
                  (response) => {
                    this.updatePasswordFormGroup.get('newpassword').setValue('')
                    this.showAlert('Contraseña actualizada correctamente')
                  },
                  (error) => {
                    this.showAlert('La contraseña que ingresaste no es la correcta')
                  }
                )
                
              }
              else
              {
                this.showAlert('El campo de contraseña es necesario')
              }
            }
          }
        ]
      })
      await passwordPrompt.present()
    }
    else
    {
      this.showAlert('La contraseña nueva no es válida')
    }

  }

}
