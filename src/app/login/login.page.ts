import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
//  Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
//  Loading
import { LoadingController } from '@ionic/angular'
import { StatusBar } from '@ionic-native/status-bar/ngx'


const urlLogin = "assets/video/background.mp4"
const urlRegister = "assets/video/background_register.mp4"


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
  )
  {
    //this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT)
    this.sbar.hide()
    this.videoURL = urlLogin
  }

  ngOnInit() {
    this.listFormGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })

    this.registerFormGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'telefono': ['', Validators.required],
      'password': ['', Validators.required],
    })
  }


  login()
  {
    this.router.navigateByUrl('home')
  }

  showRegisterForm()
  {
    this.isRegister = true
    this.videoURL = urlRegister
    return Promise.resolve(this.isRegister).then(() => {
      return Promise.resolve(this.videoURL)
    })
  }

  showLoginForm()
  {
    this.isRegister = false
    this.videoURL = urlLogin
    return Promise.resolve(this.isRegister).then(() => {
      return Promise.resolve(this.videoURL)
    })
  }

  register()
  {

  }

}
