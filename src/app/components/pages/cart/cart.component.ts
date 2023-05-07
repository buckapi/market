import { Component, OnInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  deviceInfo:any=null;
  constructor(
    private deviceService: DeviceDetectorService,
  private readonly router: Router,
    public _butler:Butler
    ) { }
  public minus(index:any){
    let quantityFLAG=this._butler.car[index].quantity;
    if (quantityFLAG>1){
     // quantityFLAG=quantityFLAG--1;
      this._butler.car[index].quantity=this._butler.car[index].quantity-1;
    this.calculate();
    }
  }
  public plus(index:any){
    this._butler.car[index].quantity=this._butler.car[index].quantity+1;
    this.calculate();
  }
   public remove(index:any){
    this._butler.numProd=this._butler.numProd-1;
    this._butler.car.splice(index,1);
    this.calculate();
  }

  public calculate(){
    this._butler.subTotalGral=0;

    this._butler.subTotalGralNoRate=0;
    if (this._butler.numProd==0){
        this._butler.subTotal=0;
        this.router.navigate(['']);
    }
    let subTotalFLAG=this._butler.subTotal
    subTotalFLAG=0;
    let indice = this._butler.car.length;
      for (let i = 0; i < indice; i++){
        this._butler.car[i].subTotal=this._butler.car[i].quantity*this._butler.car[i].price;
       
          // console.log("tiene rate");
          this._butler.car[i].subTotalRate=this._butler.car[i].subTotalRate+((this._butler.car[i].subTotalRate)*this._butler.car[i].rate/100);         
          subTotalFLAG=subTotalFLAG+this._butler.car[i].subTotal;
          this._butler.subTotal=subTotalFLAG;    
          let rate = this._butler.car[i].rate;
          this._butler.subTotalGral=(this._butler.subTotalGral
            +(this._butler.car[i].quantity*this._butler.car[i].price))
            +((((this._butler.car[i].quantity*this._butler.car[i].price)))*rate/100);  
      
            this._butler.subTotalGralNoRate=this._butler.subTotalGralNoRate+(this._butler.car[i].quantity*this._butler.car[i].price);
   
     
      }
      //this.sent=true;
        // this.router.navigate(['/shop']);
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
    if (this._butler.car[0]===undefined)
    {  this.router.navigate(['']);}
    this.epicFunction();
  }

}
