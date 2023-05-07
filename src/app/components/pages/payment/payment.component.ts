import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
// import  {iconOk} from '@assets/assetszofri/img/iconOk.json';
// import * as SVG from 'svg.js';
import { HttpClient } from '@angular/common/http';

import { Butler } from '@services/butler.service';

import { DeviceDetectorService } from 'ngx-device-detector'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

// import * as bodymovin from 'bodymovin';
export class PaymentComponent implements OnInit {
  deviceInfo:any=null
  @ViewChild('miGif') miGif: ElementRef;
  isFullscreen = false;
  // @ViewChild('svgContainer') svgContainer!: ElementRef;
  constructor(private http: HttpClient,
    private deviceService: DeviceDetectorService,public _butler:Butler) {  
    this.http.get('assets/assetszofri/img/iconOk.json').subscribe(data => {
    this.jsonData = data; })  }
  jsonData: any;
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }
stopGif() {
    this.miGif.nativeElement.src = 'assets/assetszofri/img/ok.png';
  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
   if(isMobile){this._butler.deviceType="Celular";this._butler.grid=false;this._butler.list=true;};
   if(isTablet){this._butler.deviceType="Tablet";this._butler.grid=false;this._butler.list=false};
   if(isDesktopDevice){
    this._butler.deviceType="Escritorio";
    this._butler.grid=true;
    this._butler.list=false};

  }
  ngOnInit(): void {

    this.epicFunction();
    this.toggleFullscreen();
    setTimeout(() => {
      this.stopGif();
    }, 2000); // 2000 milisegundos = 2 segundos
    // const svg = SVG(this.svgContainer.nativeElement).size(24, 24);
    // const icon = svg.path(iconOk.path);
    // icon.fill(iconOk.fill);


    
  }

}
