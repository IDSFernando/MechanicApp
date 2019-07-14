import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  busqueda:any = ''
  constructor(
    private param:ActivatedRoute,
    private router:Router,
  )
  {
    this.param.queryParams.subscribe(params => {
      const busco = params['busco']
      this.busqueda = busco
    })
  }

  ngOnInit() {
  }

}
