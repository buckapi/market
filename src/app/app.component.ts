import { Component, EventEmitter,AfterViewInit,  Output, ViewChild ,ElementRef,HostListener,ChangeDetectorRef} from '@angular/core'
import { DemoFilePickerAdapter } from  './file-picker.adapter';
import { FilePickerComponent, FilePreviewModel } from 'ngx-awesome-uploader';
import { AuthRESTService } from '@services/authREST.service';
import { isError } from "util";
import { Observable, of } from 'rxjs';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { HttpClient } from  '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ValidationError } from 'ngx-awesome-uploader';
import { delay, map } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BikersService } from './services';
import { Butler } from './services/butler.service';
import { Router } from '@angular/router';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { DeviceDetectorService } from 'ngx-device-detector'
// import { DataService } from '@app/services/data.service';
import { DataApiService } from '@app/services/data-api.service';
import {VEHICLES} from '@services/vehicles.service';
import {CATEGORIES} from '@services/categories.service';
import { UserInterface } from '@interfaces/user-interface';
import * as $ from 'jquery';
import{NgxUiLoaderService} from 'ngx-ui-loader';

import { Apollo, gql } from 'apollo-angular';
import { MESSAGE_ADDED } from './subscriptions';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { stringify } from 'querystring';
export interface Car {
	//car?:Array<string>;	
	
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  results: Car[] = [];
  searchTerm: string = '';
  searchResults$: Observable<any>;

  carTypeSelected:any="";
  isLog:any=false;
  messages: any[] = [];
  isLogged = !!localStorage.getItem('isLoggedin');
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMoveHandler(event: MouseEvent | TouchEvent) {
    this.cargarProductos();
  }
  private cargarProductos() {
    if (!this.readyLoaded){

      this.calculate();
      this.readyLoaded=true;
      // console.log("Movimiento o toque detectado!!");
    }
  
    // Aquí va la lógica para cargar los productos
  }
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
  readyLoaded:any=false;
  vehicles: any;
  idChat:any="";
  deviceInfo:any=null
  branchsSelected:any=false;
  usuarioLogueado:any=false;
  message="Error en los datos de acceso, verifiquelos y vuelva a intentarlo";
  loginFlag:any=true;
  registerFlag:any=false;
  branchs$:any;
  members$: any;
  cards$: any;
  checkOne$:any;
  checkTwo$:any;
  checkThree$:any;
  carType:any;
  categories: any;
  public user : any={};
  public messageToSend:any={};
  // public customer : CustomerInterface ={
  //   name:"",
  //   email:"",
  //   password:""
  // };
  customer:any={};
  public adapter = new DemoFilePickerAdapter(this.http,this._butler);
  public myFiles: FilePreviewModel[] = [];
  public product:any={};
  loginSubmitted = false; registerSubmitted = false;
  public images:any=
  [
    'assets/assetsryal/work.png'
  ] 
  chatMessages:any = [];
  public options:any=[];
  public specialtyToDelete :any={};
  public chatMessage :any={};
  public chat:any={};
  public stylistToDelete :any={};
  public serviceToDelete :any={};
  public itemSpecialty :any={};
  public itemStylisty :any={};
  public itemService :any={};
  submittedStylist = false;
  chatClear=true;
  sendStylistFlag = false;
  submittedSpecialty = false;
  submittedService = false;
  submittedMessage = false;
  showB=false;
  category="Seleccione una!";
  branchSelected="";
  mensaje="Salida registrada!";
  randomSerial=0;
  fuelType:any="";
   specialty: FormGroup = new FormGroup({
    name: new FormControl('')
  });
   stylist: FormGroup = new FormGroup({
    name: new FormControl('')
  });
   service: FormGroup = new FormGroup({
    name: new FormControl(''),
    basePrice: new FormControl('')
  });
  loginForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    passwordReg: new FormControl(''),
  });
  new: FormGroup = new FormGroup({
    description: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
  });
  messageForm: FormGroup = new FormGroup({
    text: new FormControl(''),
  });
 i=1;
two=false;
one=true;
three=false;
public captions: UploaderCaptions = {
  dropzone: {
    title: 'Foto del estilista',
    or: '',
    browse: 'Cargar',
  },
  cropper: {
    crop: 'Cortar',
    cancel: 'Cancelar',
  },
  previewCard: {
    remove: 'Remover',
    uploadError: 'Error en la carga',
  },
};
public isError = false;
  // public images:any[]=[];
public cropperOptions = {
  minContainerWidth: '300',
  minContainerHeight: '300',
};
@ViewChild('modal1')  modal1: ElementRef ;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  title = 'restaurant';
  color = 'azul';
element:any;
public quantity : number=1;
public sent : boolean=false;
public subTotalGral : number=0;
public preview :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",
}; 
public tixToAdd :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",
};
  constructor(
    private apollo: Apollo,
    public AuthRESTService:AuthRESTService,
    private ngxService: NgxUiLoaderService,
    private  http: HttpClient,
    private formBuilder: FormBuilder,
    private readonly toastSvc: ToastrService,
    public script:ScriptService,
    public bikersScript:BikersService,
    public _butler:Butler,
    public router:Router,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private deviceService: DeviceDetectorService,
    // public dataApi: DataService,
    public dataApiService: DataApiService
  ){
//     const newCar: Car = {make: 'Toyota', model: 'Corolla', year: 2021};
// this.results.push(newCar);
//      this.categories=CATEGORIES
//      this.vehicles=VEHICLES
//     document.getElementById('modal1');
//     this.script.load(

//       'bundle',
//       'main',
//       'color-scheme',
//       'chart',
//       'progressbar',
//       'swiper',
//       'daterangepicker',
//       'nouislider',
//       'app'
//       )
//       .then(data => {
//       })
//       .catch(error => console.log(error));
    

this.script.load(

         'bundle'
         )
         .then(data => {
         })
         .catch(error => console.log(error));


  }
  setAll(){
    this.carTypeSelected="";
    this._butler.carTypeSelected=false;
    this._butler.carType=[];
    this._butler.carTypeSeted=false;
    
  }
login(){}
  iniciarChat(){
    this._butler.menuDeployed=true;
    this._butler.chating=true;
    $('body').addClass('filter-open');
    setTimeout(() => {
     
    }, 1000);


  };
  // onSearch(term: string): void {
  //   this.dataApiService.search(term)
  //     .pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       switchMap(response => response),
  //     )
  //     .subscribe(
  //       (data) => {
  //         this.results = data;
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  // }
  // onSearch(event: KeyboardEvent): void {
  //   const term = (event.target as HTMLInputElement)?.value;
  //   this.dataApiService.search(term)
  //     .pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       switchMap(response => response),
  //     )
  //     .subscribe(
  //       (data: any[]) => {
  //         this.results = data;
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

// onSearch(event: KeyboardEvent): void {
//   const term = (event.target as HTMLInputElement)?.value;
//   this.dataApiService.search(term)
//     .pipe(
//       debounceTime(300),
//       distinctUntilChanged(),
//       switchMap(response => response),
//     )
//     .subscribe(
//       (data: { name: string, description: string }[]) => {
//         this.results = data;
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
// }
onSearch2() {
  console.log("hola, "+this._butler.searchTerm);
  this._butler.nameFiltering=true;
  // Agrega aquí la lógica que deseas ejecutar cuando el usuario escriba en el input
}
onSearch(term: string): void {
  this.dataApiService.search(term)
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(response => response as Car[]),
    )
    .subscribe(
      (data) => {
        this.results = data as Car[];
        console.log(JSON.stringify(this.results));
        // this.results = data;
      },
      (error) => {
        console.log(error);
      }
    )
}

setCategory(selected:any){
    this.category=this.categories[selected].name;
    this._butler.categorySelected=this.category;
    this._butler.filtered=true;
    
    // console.log("selected: "+this.categories[selected].name);
  }
noDeploy(){
  this._butler.menuDeployed=false;
  this._butler.chating=false;
}
onLogin(){
  this.loginSubmitted = true;
  if (this.loginForm.invalid) {
    this.isError = true;
    // console.log("no entra: "  +JSON.stringify(this.loginForm.value));
    return;
  }
  // console.log("entra con : " +JSON.stringify(this.loginForm.value));
   this.ngxService.start("loader-02");
  return this.AuthRESTService.loginUser(
    this.loginForm.value.email,
    this.loginForm.value.password
  )
  .subscribe(
    data => {
      //console.log(data);
      this.AuthRESTService.setUser(data.user);
      const token = data.id;
      this.AuthRESTService.setToken(token);
      this._butler.userd="c"+data.userId;
      this._butler.isLogged=true;
      this.dataApiService.getCustomerByUserId(this._butler.userd).subscribe(
        data =>{
          this.loginFlag=false;
          this.registerFlag=false;
       
          this._butler.userActive=data;
            //  console.log(JSON.stringify(this._butler.userActive));
          this._butler.userId=this._butler.userActive[0].id;
          // this._butler.infoProfile=this._butler.userActive[0];
          this._butler.type=this._butler.userActive[0].userType;
          this._butler.userType=this._butler.userActive[0].userType;
          this._butler.images=this._butler.userActive[0].images;
          this._butler.name=this._butler.userActive[0].name;
          this._butler.email=this._butler.userActive[0].email;
          this._butler.usuarioLogueado=true;
          localStorage.setItem("userd",this._butler.userd);
        });
      this._butler.name=data.name;
      this.isError = false;
       this.ngxService.stop("loader-02");
      localStorage.setItem('isLoggedin', 'true');
      // console.log("profile status: "+this._butler.profileStatus);

    },

     error => {this.onIsError();   this.ngxService.stop("loader-02");}
  );
}
  setFuelType(type:any){
    if(type=="Bencina"){
      $('body').removeClass('filter-open');
      this._butler.bencinaFlag=!this._butler.bencinaFlag;
    }
    if(type=="Diesel"){
      $('body').removeClass('filter-open');
      this._butler.dieselFlag=!this._butler.dieselFlag;
    }
    this.loader();
  }
  setTransmisionType(type:any){
    if(type=="Manual"){
      $('body').removeClass('filter-open');
      this._butler.manualFlag=!this._butler.manualFlag;
    }
    if(type=="Automatica"){
      $('body').removeClass('filter-open');
      this._butler.automaticFlag=!this._butler.automaticFlag;
    }
    this.loader();
  }
  setVehicleStatus(type:any){
    if(type=="New"){
      $('body').removeClass('filter-open');
      this._butler.newFlag=!this._butler.newFlag;
    }
    if(type=="Used"){
      $('body').removeClass('filter-open');
      this._butler.usedFlag=!this._butler.usedFlag;
    }
    this.loader();
  }

  loader(){
    this.checkOne$=[];
    this.checkTwo$=[];
    this.checkThree$=[];
    this._butler.cars$=[];

    let size =this._butler.originalCars$.length;
    if(this._butler.bencinaFlag){
      for(let i =0;i<size;i++){
        if(this._butler.originalCars$[i].fuelType.name=="Bencina"){
          this.checkOne$.push(this._butler.originalCars$[i]);
        }
      }
    }
    if(this._butler.dieselFlag){
      for(let i =0;i<size;i++){
        if(this._butler.originalCars$[i].fuelType.name=="Diesel"){
          this.checkOne$.push(this._butler.originalCars$[i]);
        }
      }
    }
    let sizeOne = this.checkOne$.length;
    if(this._butler.manualFlag){
      for(let i =0;i<sizeOne;i++){
        if(this.checkOne$[i].transmision.name=="Manual"){
          this.checkTwo$.push(this.checkOne$[i]);
        }
      }
    }
    if(this._butler.automaticFlag){
      for(let i =0;i<sizeOne;i++){
        if(this.checkOne$[i].transmision.name=="Automatica"){
           this.checkTwo$.push(this.checkOne$[i]);
        }
      }
    }
    let sizeTwo = this.checkTwo$.length;
     if(this._butler.newFlag){
      for(let i =0;i<sizeTwo;i++){
        if(this.checkTwo$[i].vehicleStatus.name=="Nuevo"){
          this.checkThree$.push(this.checkTwo$[i]);
        }
      }
    }
    if(this._butler.usedFlag){
      for(let i =0;i<sizeTwo;i++){
        if(this.checkTwo$[i].vehicleStatus.name=="Usado"){
          this.checkThree$.push(this.checkTwo$[i]);
        }
      }
    }
    this._butler.cars$=this.checkThree$;
  }


  get M ():{ [key: string]: AbstractControl } {
    return this.messageForm.controls;
  }

  get s ():{ [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  get U(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
    get f(): { [key: string]: AbstractControl } {
      return this.specialty.controls;
    }
    get g(): { [key: string]: AbstractControl } {
      return this.stylist.controls;
    }
    get h(): { [key: string]: AbstractControl } {
      return this.service.controls;
    }


public setVehicle(selected:any){

  $('body').removeClass('filter-open');
  this._butler.carTypeSeted=true;
  
  this._butler.carType=this.vehicles[selected];
    // console.log("selected: "+this._butler.carType.name);
}
setDeveloper(){
  this._butler.developer++;
}
public setVehicleB(selected:any){
// console.log("selected: "+JSON.stringify( selected))
  $('body').removeClass('filter-open');
  this._butler.carTypeSeted=true;
   this._butler.carTypeSelected=true;
  this._butler.carType=selected;
  this.carTypeSelected=selected.name;
  // console.log("SEL: "+this.carTypeSelected);
    // console.log("selected: "+this._butler.carType.name);
}
public openModal(i:any){
this._butler.modalOption=i;

}
setView(option:any){
  if(option=='cars'){this._butler.viewSelected='cars';
// console.log("viewSelected: "+this._butler.viewSelected);
}
  if(option=='parts'){this._butler.viewSelected='parts';
// console.log("viewSelected: "+this._butler.viewSelected);
}
}
    onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
public minus(){
  if (this.quantity>1){
    this.quantity=this.quantity-1;
  }
}
public plus(){
  this.quantity=this.quantity+1;
}
// public calculate(){
//   this.subTotalGral=0;
//   let indice = this._butler.car.length;
//     for (let i = 0; i < indice; i++){
//       this.subTotalGral=this.subTotalGral+this._butler.car[i].subTotal;
//       this._butler.subTotalGral=this.subTotalGral;
//     }
//   this.sent=true;
//   this.router.navigate(['/shop']);
// }
  public addToBag(quantity:any){
    this._butler.numProd=this._butler.numProd+1;
    this.tixToAdd.onCar=true;
    if(this._butler.numProd>=3){
      this.tixToAdd.onCar=false;
      this._butler.hidden=true;
    }
    this.tixToAdd.quantity=quantity;
    this.tixToAdd.name=this._butler.preview.name;
    this.tixToAdd.price=this._butler.preview.price;
    this.tixToAdd.images=this._butler.preview.images;
    this._butler.subTotal=this._butler.subTotal+(quantity*this._butler.preview.price);
     this._butler.car.push(this.tixToAdd);
    $('#modal1').removeClass("is-visible");
    this.preview.product=this._butler.preview;
    this.preview.quantity=this.quantity;
    this.preview.image=this._butler.imagePreviewProduct;
    this.preview.subTotal=this.quantity*this.preview.product.price;
    this.calculate();
    this.tixToAdd={};
    this.quantity=1;
  }

  onSearchInput() {
    this.searchResults$ = this.dataApiService.search(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((results: any) => results)
    );
  }


close(){
  $('body').removeClass('menu-open');

  $('html').removeClass('menu-open');

}
  public sendService(){
    this.submittedService=true;
    if(this.service.invalid){
      return
    }
    this.itemService=this.service.value;name;
     this.itemService.status="active";
       this.dataApiService.saveService(this.itemService)
   .subscribe((res:any) => {
       this.toastSvc.success("servicio agregado con exito!" );
       this.router.navigate(['/sumary']);
     });
}
public deleteSpecialty(){
  this.specialtyToDelete=this._butler.specialtyToDelete;;
  this.specialtyToDelete.status="deleted";
  this.toastSvc.info("Especialidad borrada con exito!" );
  this.dataApiService.deleteSpecialty( this.specialtyToDelete.id)
        .subscribe(
           tix => this.router.navigate(['/sumary'])
      );
}

public deleteService(){
  this.serviceToDelete=this._butler.serviceToDelete;;
  this.serviceToDelete.status="deleted";
  this.toastSvc.info("Servicio borrado con exito!" );
  this.dataApiService.deleteService( this.serviceToDelete.id)
        .subscribe(
           tix => this.router.navigate(['/sumary'])
      );
}
public deleteStylist(){
  this.stylistToDelete=this._butler.stylistToDelete;;
  this.stylistToDelete.status="deleted";
  this.toastSvc.info("Estilista borrado con exito!" );
  this.dataApiService.deleteStylist(this.stylistToDelete.id)
        .subscribe(
           tix => this.router.navigate(['/sumary'])
      );
}
  public sendStylist(){
    this.submittedStylist=true;
    if(this.stylist.invalid){
      return
    }
    this.itemStylisty=this.stylist.value;name;
    this.itemStylisty.images=this.images;
    this.itemStylisty.status="active";
    this.itemStylisty.categoria=this.branchSelected;
       this.dataApiService.saveStylist(this.itemStylisty)
   .subscribe((res:any) => {

       this.toastSvc.success("Estilista agregado con exito!" );
       this.router.navigate(['/sumary']);
     });
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
      this.cdr.detectChanges();

    }

   public myCustomValidator(file: File): Observable<boolean> {
    if (!file.name.includes('uploader')) {
      return of(true).pipe(delay(2000));
    }

    return of(false).pipe(delay(2000));
  }

   public onValidationError(error: ValidationError): void {
    alert(`Validation Error ${error.error} in ${error.file.name}`);
  }

  public onUploadSuccess(e: FilePreviewModel): void {
    // console.log(e);
      this.images=this._butler.file;
    // console.log(this.myFiles);
  }

public  setOption(){
    this.product.categoria=this._butler.userActive.categories[this.category];
    this.showB=true;
  }
// public  setCategory(){
//     this.product.categoria=this._butler.userActive.categories[this.category];
//     this.showB=true;
//   }
  public onRemoveSuccess(e: FilePreviewModel) {
    // console.log(e);
  }
  public onFileAdded(file: FilePreviewModel) {
    this.myFiles.push(file);
  }
public aleatorio(a:any,b:any) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }
  public sendSpecialty(){
    this.submittedSpecialty=true;
    if(this.specialty.invalid){
      return
    }
    this.itemSpecialty=this.specialty.value;name;

     this.itemSpecialty.status="active";
       this.dataApiService.saveSpecialty(this.itemSpecialty)
   .subscribe((res:any) => {
       this.toastSvc.success("Especialidad guardada con exito!" );
       this.router.navigate(['/sumary']);
     });
}
public calculate(){
   this.loadMembers();
   this.loadCards();
   this.loadBranchs();
}
public loadMembers(){
  this.members$=this.dataApiService.getAllMembers();
    this.members$.subscribe((data:any) => {
      let size = data.length;
      this._butler.especialistasSize=size;
    });
}
public loadCards(){
  this.cards$=this.dataApiService.getAllCategories();
    this.cards$.subscribe((data:any) => {
      let size = data.length;
      this._butler.cardsSize=size;
    });
}
public loadBranchs(){
  this.branchs$=this.dataApiService.getAllBranchs();
    this.branchs$.subscribe((data:any) => {
    let size = data.length;
    this._butler.especialidadesSize=size;
    this._butler.branchs=[];
   for (let i=0;i<size;i++){
      this._butler.branchs.push(data[i]);
      }
    });
}

public colorChange(color:any)
  {
    if (color=='azul'){
      this.color='azul';
     $('#body').removeClass("body-scroll theme-orange bg-theme transform-page-scale");
     $('#body').addClass("body-scroll theme-blue bg-theme transform-page-scale");

    }
    if (color=='naranja'){
      this.color='naranja';
     $('#body').removeClass("body-scroll theme-blue bg-theme transform-page-scale");
      $('#body').addClass("body-scroll theme-orange bg-theme transform-page-scale");

    }
    console.log("cabiando color");

    }
    onRegister(){}
    loginOn(){this.loginFlag=true;
      this.registerFlag=false;}
    registerOn(){this.registerFlag=true;this.loginFlag=false;}

    public register(): void {
      this.registerSubmitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      this.user.email=this.registerForm.value.email;
      this.user.password=this.registerForm.value.passwordReg;
      this.customer.name=this.user.name;
      this.registerGo();
    }
    islogF(){

    this.isLog=localStorage.getItem('isLoggedin');
  
    if(this.isLog){
      this.dataApiService.getCustomerByUserId(localStorage.getItem('userd')!).subscribe(
        data =>{
          this._butler.isLogged=true;
          this.loginFlag=false;
          this.registerFlag=false;
       
          this._butler.userActive=data;
            //  console.log(JSON.stringify(this._butler.userActive));
          this._butler.userId=this._butler.userActive[0].id;
          // this._butler.infoProfile=this._butler.userActive[0];
          this._butler.type=this._butler.userActive[0].userType;
          this._butler.userType=this._butler.userActive[0].userType;
          this._butler.images=this._butler.userActive[0].images;
          this._butler.name=this._butler.userActive[0].name;
          this._butler.email=this._butler.userActive[0].email;
          this._butler.usuarioLogueado=true;
          localStorage.setItem("userd",this._butler.userd);
        });
    }

    
    }

    public registerGo(){
       this.ngxService.start("loader-01");
      this.AuthRESTService.registerUser(
        this.user.email,
        this.user.password
      ).subscribe(
          user => {
            this.AuthRESTService.setUser(user);
             const token = user.id;
             this.customer.userd='c'+token;
             this.customer.name=this.registerForm.value.name;
             this.customer.email=this.registerForm.value.email;
             this.customer.status="activated";
             this.customer.userType="customer";
             this.customer.profileStatus="activated";
            // this.customer.images=["assets/images/default.jpg"];
            this._butler.userd=this.customer.userd;
             this.AuthRESTService.setToken(token);
            this.dataApiService.saveCustomer(this.customer).subscribe(response =>{
            // this._butler.userId=''+response.id;
               this.ngxService.stop("loader-01");
              localStorage.setItem('isLoggedin', 'true');
              if (localStorage.getItem('isLoggedin')) {
                // this.router.navigate([this.returnUrl]);
              }
              this._butler.images=["assets/images/default.jpg"];
              this._butler.name=this.registerForm.value.name;
              this._butler.email=this.registerForm.value.email;
              this._butler.type='member';
              this._butler.isLogged=true;
              // this._butler.profileStatus="pending";
              // this._butler.infoProfile.status="pending",
              this.router.navigate(['general/profile']);
            });
          },
          error => {
              if(error.status==422){
              this.isError = true;
              // this.ngxService.stop("loader-01");
            }
          }
        );
    }

    loadMessages(id:any){
      this.dataApiService.getMessages(id).subscribe(response=>{
        let chatMessages=response;
        this.chatMessages=chatMessages;
      });
    }
sendMessage(){
  this.submittedMessage = true;
  if (this.messageForm.invalid) {
    this.isError = true;
    
    return;
  }


  let randomNumber = Math.floor(Math.random() * 900000) + 100000;
  this.chatMessage.sender=randomNumber;
  this.chat.identificador=randomNumber;
  this.chat.firstMessage=this.messageForm.value.text;
  this.chat.sender="";
  this.chat.suportist="";

  if (this.chatClear){
    this.dataApiService.saveChat(this.chat).subscribe(response=>{
     let data=response;
    //  console.log("esto fue: "+JSON.stringify(data));
     this.chatClear=false;
     let text=this.messageForm.value.text;
     this.messageToSend.text=text;
    let identificador=data.id;
    this.idChat="m"+identificador;
      this.messageToSend.idChat= this.idChat;
      this.messageToSend.sender="customer";4
      this.messageToSend.identificador=  this.chat.identificador;
     this.dataApiService.saveMessage(this.messageToSend).subscribe(response=>{
      this.messageForm = this.formBuilder.group(
        {
          text: ['', Validators.required],
        }
      );
      // console.log("mensaje");
      setInterval(() => {
        this.loadMessages(this.messageToSend.idChat);
         }, 1000);
      })
    });
  }
  if (!this.chatClear){
    this.messageToSend.idChat=this.idChat;
    let text=this.messageForm.value.text;
    this.messageToSend.text=text;
    this.messageToSend.sender="customer";
    this.messageToSend.identificador=  this.chat.identificador;
    this.dataApiService.saveMessage(this.messageToSend).subscribe(response=>{
      this.messageForm = this.formBuilder.group(
        {
          text: ['', Validators.required],
        }
      );
    });
  }

  // localStorage.setItem("nChat",randomNumber.toString());

// console.log("message: "  +JSON.stringify(this.messageForm.value));

}
    async onLogout(): Promise<void> {
      try {
        await this.AuthRESTService.logoutUser();
        this._butler.isLogged=false;
         this._butler.userId="";
         this._butler.car=[];
         this._butler.subTotalGral=0;
         this._butler.numProd=0;
         this._butler.totalProducts=0;
         this.isLog=false;
         $('body').removeClass('menu-open');

         $('html').removeClass('menu-open');
        this._butler.usuarioLogueado=false;
        this.loginFlag=true;
        this.registerFlag=false;
         this.router.navigate(['/welcome']);
      } catch (error) {
        console.log(error);
      }
    }

  ngAfterViewInit(): void {
//     this.epicFunction();
// this.islogF();
//     setTimeout(() => {
//       this.cdr.detectChanges();
//     }, 2000);
//     // this.apollo
//     //   .subscribe({
//     //     query: MESSAGE_ADDED,
//     //     variables: { ticketId: '123' },
//     //   })
//     //   .subscribe((result) => {
//     //    this.messages.push(result.data.messageAdded);
//     //   });
//     const currentUser = this.AuthRESTService.getCurrentUser();
//     const accessToken = this.AuthRESTService.getToken();

//     if(currentUser !== null && accessToken !== null) {
//       this._butler.usuarioLogueado = true;
//       // console.log(""+this._butler.usuarioLogueado);
//       this.loginFlag=false;
//       this.registerFlag=true;
//     }
//     else{
//       this.registerFlag=false;
//       this.loginFlag=true;
//       // console.log("no logueado");
//     }

//     this.messageForm = this.formBuilder.group(
//       {
//         text: ['', Validators.required],
//       }
//     );
//     this.loginForm = this.formBuilder.group(
//       {
//         name: ['', ],
//         email: ['', Validators.required],
//         password: ['', Validators.required]
//       }
//     );
//     this.registerForm = this.formBuilder.group(
//       {
//         name: ['', ],
//         email: ['', Validators.required],
//         passwordReg: ['', Validators.required]
//       }
//     );


//      $('#body').addClass("body-scroll theme-blue bg-theme transform-page-scale");
//     this.stylist = this.formBuilder.group(
//       {
//         name: ['', Validators.required],
//       }
//     );
//     this.specialty = this.formBuilder.group(
//       {
//         name: ['', Validators.required],
//       }
//     );
//     this.service = this.formBuilder.group(
//       {
//         name: ['', Validators.required],
//         basePrice: [0, Validators.required]
//       }
//     );

    

  }
}
