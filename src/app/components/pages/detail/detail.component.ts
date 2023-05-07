import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector'
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements AfterViewInit {
   galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  deviceInfo:any=null
  quantity=1;
  constructor(    private  http: HttpClient,
    private deviceService: DeviceDetectorService,
    private readonly router: Router,
    public _butler:Butler
    ) { 
      
if(this._butler.preview.rate===undefined){
      this.http.get('https://db.buckapi.us:9001/api/infos').subscribe((results: any) => {
        const firstResult = results[0];
        // console.log(firstResult);
        this._butler.defaultRate=results[0].defaultRate;
      })
    }
    if(this._butler.preview.rate!==undefined){
      
        this._butler.defaultRate=this._butler.preview.rate;
    
    }
  }
 
    config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: false,
    spaceBetween: 5,
    navigation: false
  }; 
  imagesArray:any=[];
  plus(){
    this.quantity=this.quantity+1;
    // console.log("quantity: "+this.quantity);
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
  minus(){
    if(this.quantity>1){      
    this.quantity=this.quantity-1;
    // console.log("quantity: "+this.quantity);
    }
  }

  addToCar(type:any){
    this._butler.preview.quantity=this.quantity;
    if (this._butler.preview.rate!==undefined){
      // console.log("tiene porcenjate!");
      let rate = this._butler.preview.rate;
      // console.log("rate" +rate);
      this._butler.subTotalGralNoRate=this._butler.subTotalGralNoRate+(this._butler.preview.quantity*this._butler.preview.price);
      this._butler.subTotalGral=(this._butler.subTotalGral
        +(this._butler.preview.quantity*this._butler.preview.price))
        +((((this._butler.preview.quantity*this._butler.preview.price)))*rate/100);
      this._butler.numProd=this._butler.numProd+1;
      this._butler.preview.rate=rate;
      this.quantity=1;

      // console.log("sub total: "+
      // this._butler.subTotalGral);
      this._butler.car.push(this._butler.preview);
 
    }
    if (this._butler.preview.rate===undefined){
      // console.log("no tiene porcenjate!");
      let rate = this._butler.defaultRate;
      // console.log("rate" +rate);
      this._butler.subTotalGralNoRate=this._butler.subTotalGralNoRate+(this._butler.preview.quantity*this._butler.preview.price);
    
      this._butler.subTotalGral=(this._butler.subTotalGral
        +(this._butler.preview.quantity*this._butler.preview.price))
        +((((this._butler.preview.quantity*this._butler.preview.price)))*rate/100);   
      // console.log("sub total: "+
      // this._butler.subTotalGral);
       this._butler.numProd=this._butler.numProd+1;
      this._butler.preview.rate=rate;
      this.quantity=1;
      this._butler.car.push(this._butler.preview);
 
    };
    if(type==2){
      this._butler.preview={};
      this.router.navigate(['cart']);
    }
    else{
    this.router.navigate(['welcome']);
    }
  }
  ngAfterViewInit(): void {


    this.epicFunction();

    if(this._butler.preview.name==undefined){
      this.router.navigate(['welcome'])
    }


    // if(this._butler.preview.name!=undefined){
    //   let size = this._butler.preview.images.length;
    //   for(let i = 0;i<size;i++ ){
    //     this.imagesArray.push({
    //       small: ''+this._butler.preview.images[i],
    //       medium: ''+this._butler.preview.images[i],
    //       big: ''+this._butler.preview.images[i]
    //     })
    //   }
    // }
    this.quantity=1;
  }
  ngOnInit() {
    this.galleryOptions = [
      {
        width: '50%',
        height: '400px',
        thumbnailsColumns: 4,
        previewCloseOnEsc:true,
        previewKeyboardNavigation:true,
        previewArrows:true,
        thumbnailsSwipe: true,
        previewSwipe:true,
        previewZoom:true,
        previewZoomStep:1.5,
        previewZoomMax:5,
        // previewCloseOnClick:true,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: false,  thumbnailsArrows: true
      },
      // max-width 800
      {
        previewArrows:true,
        arrowPrevIcon: "fa fa-arrow-circle-o-left", arrowNextIcon: "fa fa-arrow-circle-o-right", 
        breakpoint: 800,
        width: '100%',
        height: '300px',
        imageSize: 'contain',
         imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      previewSwipe:true,
      previewCloseOnEsc:true,
      previewKeyboardNavigation:true,
      thumbnailMargin: 20
        
      },
      // imagePercent: 100,
      //   imageSize: 'contain',
      //   thumbnailsPercent: 20,
      //   imageArrows:true,
      //   thumbnailsMargin: 20,
      //   previewCloseOnEsc:true,
      //   previewCloseOnClick:true,
      //   previewKeyboardNavigation:true,
      //   thumbnailMargin: 20,
      //   previewSwipe:true,


      
      // max-width 400
      {
        width: '100%',
        breakpoint: 400,
        imagePercent: 100,
        thumbnailsSwipe:true,
        previewZoom: true,
        previewCloseOnEsc:true,
        previewCloseOnClick:true,
        previewKeyboardNavigation:true,
        previewFullscreen:true
      }
    ];

    this.galleryImages = [
    
    ];
    if(this._butler.preview.name!=undefined){
      let size = this._butler.preview.images.length;
      for(let i = 0;i<size;i++ ){
        this.galleryImages.push({
          small: ''+this._butler.preview.images[i],
          medium: ''+this._butler.preview.images[i],
          big: ''+this._butler.preview.images[i]
        })
      }
    }
  }
}
