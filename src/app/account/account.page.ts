import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController, MenuController } from '@ionic/angular'
import { Router } from '@angular/router'
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
  constructor(
    private nav: NavParams,
    private router: Router,
    private menu: MenuController,
  )
  {
    this.currentModal = this.nav.get('modal')
    this.userdata = this.nav.get('userdata')
  }

  ngOnInit() {
  }

  leave()
  {
    this.currentModal.dismiss()
  }

  cerrarSesion()
  {
    localStorage.removeItem('auth_token')
    this.menu.close()
    this.menu.enable(false)
    this.router.navigateByUrl('')
    this.leave()
  }

  deleteAccount()
  {

  }

}
