import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
//  Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
//  Loading, Menu y Alert
import { LoadingController, MenuController, AlertController } from '@ionic/angular'
import { StatusBar } from '@ionic-native/status-bar/ngx'


const urlLogin = "assets/video/background.mp4"
const urlRegister = "assets/video/background_register.mp4"

import { RESTService } from '../rest.service'


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
  )
  {
    //this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT)
    this.menu.enable(false)
    this.sbar.hide()
    this.videoURL = urlLogin
  }

  ngOnInit() {
    this.listFormGroup = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'password': ['', Validators.required]
    })

    this.registerFormGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'telefono': ['', Validators.required],
      'password': ['', Validators.required],
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
        console.log(response)
        loader.dismiss()
      },
      error => {
        loader.dismiss()
        this.showAlert(error.message)
      }
    )
    // this.router.navigateByUrl('home')
  }


  async register()
  {
    let loader = await this.loading.create({
      message: 'Iniciando sesión...',
      backdropDismiss: false,
      keyboardClose: true,
      translucent: true
    })
    await loader.present()
    this.api.register({
      username: this.registerFormGroup.get('username').value,
      email: this.registerFormGroup.get('email').value,
      password: this.registerFormGroup.get('password').value
    })
    .subscribe(
      response => {
        console.log(response)
        loader.dismiss()
      }
      ,
      error => {
        console.log(error)
        loader.dismiss()
        this.showAlert(error.message)
      }
    )
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
      buttons: ['Ok']
    });
    return await alert.present();
  }

}
