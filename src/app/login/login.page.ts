import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
//  Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
//  Loading, Menu y Alert
import { LoadingController, MenuController, AlertController, NavController } from '@ionic/angular'
import { StatusBar } from '@ionic-native/status-bar/ngx'


const urlLogin = "assets/video/background.mp4"
const urlRegister = "assets/video/background_register.mp4"

import { RESTService } from '../rest.service'
import { Events } from '@ionic/angular'

import { Keyboard } from '@ionic-native/keyboard/ngx'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  listFormGroup:FormGroup
  registerFormGroup: FormGroup
  isRegister:boolean = false
  videoURL:any = null

  constructor(
    private router: Router,
    private formBuilder:FormBuilder,
    private sbar: StatusBar,
    private menu: MenuController,
    private alert: AlertController,
    private loading: LoadingController,
    private api: RESTService,
    private navCtrl: NavController,
    private events: Events,
    private keyboard:Keyboard,
  )
  {
    //this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT)
    this.menu.enable(false)
    this.sbar.hide()
    this.videoURL = urlLogin
    setTimeout(() => {
      this.keyboard.hideFormAccessoryBar(false)
    }, 1000);
  }

  ngOnInit() {
    this.menu.enable(false)
    this.listFormGroup = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'password': ['', Validators.required]
    })

    this.registerFormGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'password': ['', Validators.required],
      'password_again': ['', Validators.required],
      'name': ['', Validators.required],
      'lastname': ['', Validators.required],
    })
  }


  /**
   * Intentar iniciar sesión
   */
  async login()
  {
    let loader = await this.loading.create({
      message: 'Iniciando sesión...',
      backdropDismiss: false,
      keyboardClose: true,
      translucent: true
    })

    let hasErrors = false

    const mail = this.listFormGroup.get('email').value
    const pass = this.listFormGroup.get('password').value
    
    if(mail.trim().length == 0)
    {
      await this.showAlert('El correo no es válido')
      hasErrors = true
    }
    
    if(pass.trim().length == 0)
    {
      await this.showAlert('La contraseña no es válida')
      hasErrors = true
    }

    if(!hasErrors)
    {
      await loader.present()
      this.api.login(
        {
          email: this.listFormGroup.get('email').value,
          password: this.listFormGroup.get('password').value,
        }
      )
      .subscribe(
        response => 
        {
          if(response['status'] == "error")
          {
            loader.dismiss()
            this.showAlert(`
              No pudimos encontrar esta cuenta.
              <ol>
                <li>Verifica tus credenciales.</li>
                <li>¿Solicitaste la eliminación de tu cuenta?</li>
              </ol>
            `)
          }
          else
          {
            loader.dismiss()
            localStorage.setItem('auth_token', response['data'].token)
            this.events.publish('user:logged', null, null)
            this.navCtrl.navigateRoot(['home'])
          }
        },
        error => {
          loader.dismiss()
          this.showAlert('No pudimos encontrar un usuario con esas credenciales')
        }
      )
    }
    // this.router.navigateByUrl('home')
  }


  async register()
  {

    let hasErrors = false

    let loader = await this.loading.create({
      message: 'Estamos creando tu cuenta...',
      backdropDismiss: false,
      keyboardClose: true,
      translucent: true
    })

    // Validar que los campos no lleven espacios al inicio y al final
    const _name = this.registerFormGroup.get('name').value
    const _lastname = this.registerFormGroup.get('lastname').value
    const _usrname = this.registerFormGroup.get('username').value
    const _mail = this.registerFormGroup.get('email').value
    const _pass = this.registerFormGroup.get('password').value
    const pass_same = this.registerFormGroup.get('password_again').value

    if(_name.trim().length == 0)
    {
      await this.showAlert('El nombre no es válido')
      hasErrors = true
    }

    if(_lastname.trim().length == 0)
    {
      await this.showAlert('El apellido no es válido')
      hasErrors = true
    }

    if(_usrname.trim().length == 0)
    {
      await this.showAlert('El nombre de usuario no es válido')
      hasErrors = true
    }

    if(_mail.trim().length == 0)
    {
      await this.showAlert('El correo no es válido')
      hasErrors = true
    }

    if(_pass.trim().length == 0)
    {
      await this.showAlert('La contraseña no es válida')
      hasErrors = true
    }

    if(pass_same.trim() != _pass.trim())
    {
      await this.showAlert('Las contraseñas no coinciden')
      hasErrors = true
    }

    if(!hasErrors)
    {
      await loader.present()
      this.api.register({
        username: this.registerFormGroup.get('username').value,
        email: this.registerFormGroup.get('email').value,
        password: this.registerFormGroup.get('password').value,
        name: _name,
        lastname: _lastname
      })
      .subscribe(
        response => {
          this.showAlert(this.objToString(response))
          console.log(response['token'])
          loader.dismiss()
          localStorage.setItem('auth_token', response['token'])
          this.events.publish('user:logged', null, null)
          this.navCtrl.navigateRoot(['home'])
        }
        ,
        error => {
          console.log(error)
          loader.dismiss()
          this.showAlert(error.message)
        }
      )
    }
  }

  /**
   * Mostrar el formulario de registro
   */
  showRegisterForm()
  {
    this.isRegister = true
    this.videoURL = urlRegister
    return Promise.resolve(this.isRegister).then(() => {
      return Promise.resolve(this.videoURL)
    })
  }

  /**
   * Mostrar el formulario de Inicio de sesión
   */
  showLoginForm()
  {
    this.isRegister = false
    this.videoURL = urlLogin
    return Promise.resolve(this.isRegister).then(() => {
      return Promise.resolve(this.videoURL)
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
