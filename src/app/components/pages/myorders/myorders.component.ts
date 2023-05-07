import { Component, OnInit , AfterViewInit} from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
import {LOCATIONS} from '@app/services/locations.service';
import { AuthRESTService } from '@services/authREST.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import{NgxUiLoaderService} from 'ngx-ui-loader';
import { DataApiService } from '@services/data-api.service'; 

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  public orders:any=[];
  indiceSeleccionado: number = -1;
  preview:any={};
  showDetail:any=false;
  constructor(
    public dataApiService: DataApiService,
    private ngxService: NgxUiLoaderService,
    private readonly router: Router,
    public _butler:Butler,
    private formBuilder: FormBuilder,
    public AuthRESTService:AuthRESTService
  ) { 

    let userd= localStorage.getItem("userd")
    if (userd){
      this.ngxService.start("loader-01");
      this.orders=this.dataApiService.getOrdersByUserId(userd!).subscribe(response=>{

        this.ngxService.stop("loader-01");
        this.orders=response;
      });
    }
  }
  seleccionarDiv(indice: number) {
    this.indiceSeleccionado = indice;
  }
  atras(){
    this.showDetail=false;
    this._butler.orderShowDetail=false;
  }
  viewDetail(i:any){
    this.preview=this.orders[i];
    console.log(JSON.stringify(this.preview));
    this.showDetail=true;
    this._butler.orderShowDetail=true;
  }

  ngOnInit(): void {
  }

}
