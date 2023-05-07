import { Component, OnInit,AfterViewInit ,ChangeDetectorRef} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Butler } from '@services/butler.service';
import { DataApiService } from '@services/data-api.service'; 
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { HttpClient } from  '@angular/common/http';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {
  isLoading = false;
  loadedAll = false;
  isFirstLoad = true;
  showSwipper = false;
  estadoImg = 'noCrece';

  esSeleccionado = false;
indexSelected:any=9999999;
memberSeted:any=false;
members$:any=[];
parts$:any=[];
memberSelected:any={};
cars$:any=[];
originalCars$:any=[];
  constructor( private  http: HttpClient,private cdr: ChangeDetectorRef,
    private readonly router: Router,
    public _butler:Butler,
    public dataApiService: DataApiService,
    ) {

      // this.http.get('https://db.buckapi.us:9001/api/infos').subscribe((results: any) => {
      //   const firstResult = results[0];
      //   // console.log(firstResult);
      //   this._butler.defaultRate=results[0].defaultRate;
      // })

     }



 config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: true,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };  
  seleccionar() {  this.estadoImg = this.estadoImg === 'noCrece' ? 'crece' : 'noCrece';
    this.esSeleccionado = true;
    setTimeout(() => {
      this.estadoImg = this.estadoImg === 'noCrece' ? 'crece' : 'noCrece';
      this.esSeleccionado = false;
    

    }, 500);
  }
  public getParts(){
    this.dataApiService.getAllParts().subscribe(response=>{
  this.isFirstLoad = false;
  this.isLoading = false;

        this.parts$=response;
      });
  }
  public getCars(){
    this.dataApiService.getAllCars().subscribe(response=>{
        this._butler.cars$=response;
        this._butler.originalCars$=response;
         this.isFirstLoad = false;
  this.isLoading = false;
      });
  }
  public getMembers(){
    this.dataApiService.getAllMembers().subscribe(response=>{
        this.members$=response;
     
      
      });
  }
  setAll(){
    
    this.isLoading=true;
    this.isFirstLoad=true;
    this.indexSelected=null;
    this._butler.userdFiltered=!this._butler.userdFiltered;
    this.memberSeted=false;
    // this.getMembers();
    this.getParts();
    this.getCars();
    this.estadoImg = this.estadoImg === 'noCrece' ? 'crece' : 'noCrece';
    setTimeout(() => {
   
      this.estadoImg = this.estadoImg === 'noCrece' ? 'crece' : 'noCrece';
      
      this.esSeleccionado = false;
    

    }, 500);

  }
  public setPreview(part:any){ 

    this._butler.preview=part;
    this.router.navigate(['/detail']);
  }
  public setUserd(member:any,i:any){
    this._butler.carType=[];
    this._butler.carTypeSeted=false;
    this._butler.carTypeSelected=false;
    this.memberSeted=true;
    this.memberSelected=member;
    this.indexSelected=i;
    this._butler.userdSelected=member.userd;
    this._butler.userdFiltered=true;
  }
  ngAfterViewInit(): void {
//     if (this._butler.deviceType === 'Escritorio') {
//       this.config.slidesPerView = 7;
//       this.showSwipper=true;
//       // console.log("esc: "+JSON.stringify(this.config));
     
//       this.cdr.detectChanges();
//   }
//   if (this._butler.deviceType === 'Tablet') {
//     this.config.slidesPerView = 7;
//     this.showSwipper=true;
//     // console.log("esc: "+JSON.stringify(this.config));
   
//     this.cdr.detectChanges();
// }
//   else if (this._butler.deviceType === 'Celular') {
//       this.config.slidesPerView = 5;
//       this.showSwipper=true;
//       // console.log("movil: "+JSON.stringify(this.config));
//        this.cdr.detectChanges();
//   }
//     this.getMembers();
//     this.getParts();
//     this.getCars();
  }

}
