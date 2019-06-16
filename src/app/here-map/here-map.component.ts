import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})
export class HereMapComponent implements OnInit {
  
  @ViewChild("map")
  public mapElement: ElementRef;
  
  @Input()
  public appId: any;
  
  @Input()
  public appCode: any;
  
  @Input()
  public lat: any;
  
  @Input()
  public lng: any;
  
  private platform: any;
  private map: any;
  private router: any;
  constructor() { }
  
  ngOnInit()
  {
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
    this.router = this.platform.getRoutingService();
  }
  
  public ngAfterViewInit() {
    
    setTimeout(() => {
      let defaultLayers = this.platform.createDefaultLayers();
      this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom: 30,
          center: { lat: this.lat, lng: this.lng }
        }
        );
		let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
		this.showMarker()
      }, 100);
    }
    
    showMarker()
    {
		let Marker = new H.map.Marker({
			lat: this.lat,
			lng: this.lng
		})
		this.map.addObject(Marker)
    }
    
  }
  