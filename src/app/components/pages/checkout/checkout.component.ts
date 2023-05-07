import { Component, OnInit , AfterViewInit} from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
import {LOCATIONS} from '@app/services/locations.service';
import { AuthRESTService } from '@services/authREST.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import{NgxUiLoaderService} from 'ngx-ui-loader';
import { DataApiService } from '@services/data-api.service'; 
import { DeviceDetectorService } from 'ngx-device-detector'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements AfterViewInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    passwordLog: new FormControl(''),
  });

  presentation: FormGroup = new FormGroup({
    rut: new FormControl(''),
    phone: new FormControl(''),
    region: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
  });
  loginFlag:any=false;
  registerFlag:any=false;
  order:any={};
  customers:any=[];
  fee:any=0;
  public isError2 = false;

  usuarioLogueado=false;
  loginSubmitted = false;
  submitted = false;
  submitted2 = false; 
  region:any=[
    {  region:"region",cities:[]}
  ];
  locations: any = [
    {
      region: '',
      cities: [{city:'',tax:0}]
    }
  ]; 

  deviceInfo:any=null
  public recienLogeado=false;
  public isError = false;
  public state = "register";
  public waiting = false;
  public message = '';
  public citiesList:any=[];
  public user:any={};
  public citySelected:any=[];
  public indexProvincia:any=999; 
  provSelected:any=false;
  cityObjSelected:any=false;
  constructor(
    private deviceService: DeviceDetectorService,
    public dataApiService: DataApiService,
    private ngxService: NgxUiLoaderService,
    private readonly router: Router,
    public _butler:Butler,
    private formBuilder: FormBuilder,
    public AuthRESTService:AuthRESTService
    ){
      this.locations=LOCATIONS
     }
  get U(): { [key: string]: AbstractControl } {
      return this.loginForm.controls;
    }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get g(): { [key: string]: AbstractControl } {
    return this.presentation.controls;
  }
  public setProv(index:any){
    this.provSelected=true;
    let size = this.locations[index].cities.length;
    this.indexProvincia=index;
    for (let j =0;j<size;j++){
      this.citiesList.push(this.locations[index].cities[j]);
    }
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
  goRegister(){
    this.state="register";
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
      this._butler.usuarioLogueado=true;
      this.AuthRESTService.setUser(data.user);
      const token = data.id;
      this.AuthRESTService.setToken(token);
      this._butler.userd="c"+data.userId;
      localStorage.setItem('userd', "c"+data.userId);
      this._butler.isLogged=true;
      this.dataApiService.getCustomerByUserId(this._butler.userd).subscribe(
        data =>{
          this.loginFlag=false;
          this.registerFlag=false;
          
          this._butler.userActive=data;
          console.log(JSON.stringify(this._butler.userActive));
          this._butler.userId=this._butler.userActive[0].id;
          this._butler.type=this._butler.userActive[0].userType;
          this._butler.userType=this._butler.userActive[0].userType;
          this._butler.images=this._butler.userActive[0].images;
          this._butler.name=this._butler.userActive[0].name;
          this._butler.email=this._butler.userActive[0].email;
          this._butler.recentMember.email=this._butler.userActive[0].email;
          this.setState("shipping");
        });
      this._butler.name=data.name;
      this.isError = false;
       this.ngxService.stop("loader-02");
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('userd', this._butler.userd);
      // console.log("profile status: "+this._butler.profileStatus);

    },

     error => {this.onIsError();   this.ngxService.stop("loader-02");}
  );
}
onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}
  goLogin(){
    this.state="login";
  }
  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log("falla antes de enviar");
      return;
    }
    this.user.name=this.form.value.name;
    this.user.email=this.form.value.email;
    this.user.password=this.form.value.passwordLog; 
    this.register();
  }
  sendPresentation(){}

  setRegion(regionT:any){
    let regionSet=regionT;
    this.user.region=regionSet;
    console.log(""+JSON. stringify(regionT));
    console.log(""+JSON. stringify(this.user.region));
  }

  public register(){ 
    this._butler.name=this.user.name;
    this.AuthRESTService
        .registerUser( 
          this.user.email, 
          this.user.password 
          )
        .subscribe(
          user => {    
          this.user.userd="c"+user.id;
          this.AuthRESTService.setUser(user);
          const token = user.id;
          console.log("user: "+JSON. stringify(this.user));

          this.AuthRESTService.setToken(token);
          this.state="presentation";
          this._butler.recentMember=user;
          localStorage.setItem('userd', "c"+user.id);
          this._butler.isLogged=true;
          
          localStorage.setItem('isLoggedin', 'true');
          this.recienLogeado=true;
          console.log("recien registrado: "+JSON.stringify(this._butler.recentMember));
          }, 
          error => {
                if(error.status==422){
                this.isError = true;
                this.waiting=false;
                this.message="La dirección de correo ya se encuentra registrada";
              }
          }
        );
}
setCity(i:any){
  this.cityObjSelected=true;
  this.citySelected=this.locations[this.indexProvincia].cities[i];
  this.fee=this.locations[this.indexProvincia].cities[i].tax;
}
enviarOrden(orden:any){
  this.dataApiService.saveOrder(orden).subscribe(response =>{
    this._butler.recentMember={};
    console.log("orden guardada!");
    
this._butler.car=[];
if(this._butler.deviceType=="Escritorio"){
  this._butler.numProd=0;
  this._butler.subTotalGral=0;
  window.location.href = 'https://www.zofricars.com/tbk/integrator_webpay_rest_api.php?amount='+this._butler.subTotalGral+'&buy_order='+this.order.orderNumber;
  }
else{
  this._butler.numProd=0;
  this._butler.subTotalGral=0;
  this.router.navigate(['/payment']);
}  
});
}
enviarCustomer(orden:any){

  this.dataApiService.saveCustomer(orden.customer).subscribe(response=>{
  this.enviarOrden(this.order);
  });

}
setState(state:any){
this.order={};
if(state=='presentation'){
  this.state='presentation';
  }
if(state=='shipping'){
  this.state='shipping';  


  if (localStorage.getItem("isLoggedin") && this.recienLogeado ){
    this.user={...this.user,...this._butler.recentMember};
    let customer= this.user;
    customer.id=null;
    customer={...this.user,...this.presentation.value};
    
    console.log("customer registrado y compuesto"+JSON.stringify(customer));
    const userd = this.AuthRESTService.getUserd();
    console.log("userd no logueado "+userd)
    customer.userd=userd;
    this.order.customer=customer; 
    console.log("para guardar: "+JSON.stringify(customer));
    this.enviarCustomer(this.order);
    customer.userd=this.AuthRESTService.getUserd();
    this.order.customer=customer;
    this.order.userd=localStorage.getItem("userd");
    this.order.car=this._butler.car;
    this.order.email=this._butler.recentMember.email;
    this.order.amount=this._butler.subTotalGral;
    
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    localStorage.setItem("nOrder",randomNumber.toString());this._butler.usuarioLogueado=true;

    this.order.orderNumber=randomNumber;
    this.order.status='complete';


    // this.enviarOrden(this.order);
  }
  if (localStorage.getItem("isLoggedin") && !this.recienLogeado){
   this.registerFlag=false;
    // const actual:any =this.AuthRESTService.getCurrentUser();
    // this.user={...this.user,...this.dataApiService.getCustomerByUserId(actual.id)}
    // console.log("compuesto:" + JSON.stringify(this.user));
    // console.log("el que traifo: "+JSON.stringify(this._butler.recentMember));
    let pass = localStorage.getItem("userd");
this.dataApiService.getCustomerByUserId(pass!).subscribe(response=>{
  this.customers=response;
  this._butler.recentMember=this.customers[0];
  console.log("el que traigo: "+JSON.stringify(this._butler.recentMember));


    this.user={...this.user,...this._butler.recentMember};

    let customer= this.user;
    customer.id=null;
    customer.userd=this.AuthRESTService.getUserd();
    this.order.customer=customer;
    this.order.userd=localStorage.getItem("userd");
    this.order.car=this._butler.car;
    this.order.email=this._butler.recentMember.email;
    this.order.amount=this._butler.subTotalGral;
    
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    localStorage.setItem("nOrder",randomNumber.toString());
    this._butler.usuarioLogueado=true;
    this.order.orderNumber=randomNumber;
    this.order.status='complete';


    this.enviarOrden(this.order);
});


    
  }
 
  
 
 
}



if(state=='presentation'){
  this.state='presentation';
  }
}
public userLoginCheck(){  
  const currentUser = this.AuthRESTService.getCurrentUser();
  const accessToken = this.AuthRESTService.getToken();
  console.log(JSON.stringify(accessToken));
  if(currentUser !== null && accessToken !== null) {
    this.usuarioLogueado = true;
    
    this.setState("shipping");
    let abuscar=localStorage.getItem("userd");
    console.log("a buscar: "+abuscar);
    this.customers=this.dataApiService.getCustomerByUserId(abuscar!).subscribe(response=>{
      this.customers=response;
       console.log("encontrados: "+JSON.stringify(this.customers));
      this._butler.recentMember=this.customers[0];
       console.log("el elejido: "+JSON.stringify(this._butler.recentMember));
       this.state="shipping"; 
      });
 
  }
  else{
    this.registerFlag=true;
    this.state="login"; 
    console.log("no logueado");
  }
}

public logCheck(){  
  const currentUser = this.AuthRESTService.getCurrentUser();
  const accessToken = this.AuthRESTService.getToken();
  if(currentUser !== null && accessToken !== null) {
    this.usuarioLogueado = true;
        this.setState("shipping");
     }
  else{
    this.registerFlag=true;
    this.state="login"; 
    console.log("no logueado");
  }
}

ngAfterViewInit(): void {
  this.epicFunction();

  // this.userLoginCheck();
this.logCheck();
  this.loginForm = this.formBuilder.group(
    {       
      email: ['', Validators.required],
      password: ['', Validators.required]
    }    
  );
      this.form = this.formBuilder.group(
      {    
        name: ['', Validators.required],    
        email: ['', Validators.required],
        passwordLog: ['', Validators.required]
      }    
    );
    this.presentation = this.formBuilder.group(
      {        
        rut: ['', Validators.required],
        phone: ['', Validators.required],
        region: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required]
      }    
    );
  }
}
