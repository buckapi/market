	import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Butler } from "@app/services/butler.service";

export interface CustomerInterface {

}
export interface ChatInterface {
id:string
}
export interface MessageInterface {

}
export interface ServiceInterface {

}
export interface OrderInterface {

}
export interface StylistInterface {

}
export interface SpecialtyInterface {

}
export interface TicketInterface {

}
export interface SerialInterface {
	serialT:string,
}
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
	messages:any;
		order:any;
	cards:any;
	customerss:any;
	branch:any;
	cierre:any;
	serial:any;
	transactions:any;
	url:any="https://db.buckapi.us:9001";
	members:any;
  constructor(
  	public butler:Butler, 
 	 private http: HttpClient
  	) {}
  	headers : HttpHeaders = new HttpHeaders({  		
		  "Content-Type":"application/json"	
	});

	saveCustomer(customer :CustomerInterface){
		const url_api=`${this.url}/api/customers`;
		return this.http
		.post<CustomerInterface>(url_api, customer)
		.pipe(map(data => data));
	}
	getMessages(idchat: string){
		const url_api = `${this.url}/api/messages?filter[where][idChat]=${idchat}`;
		this.messages = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}

	getTransationByBranch(branch: string){
		const url_api = `${this.url}/api/transactions?filter[where][idBranch]=${branch}`;
		this.transactions = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}
	//  charge(amount:any, buy_order:any){
	// 	const headers = new HttpHeaders({
	// 		'Content-Type': 'application/json',
	// 		'Access-Control-Allow-Origin': '*',
	// 		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
	// 		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	// 	  });
	//  	return this.http.post('https://www.zofricars.com/tbk/pay.php',{
	// 		amount: amount,
	//  		buy_order: buy_order
	//  	},{headers}).toPromise();

	//  }
	charge(amount: any, buy_order: any){
		const headers = new HttpHeaders({
			// 'Content-Type': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': 'https://app.zofricars.com',
			'Access-Control-Allow-Methods': 'GET, POST'
		});
		const url = `https://www.zofricars.com/tbk/integrator_webpay_rest_api.php?amount=${amount}&buy_order=${buy_order}`;
		return this.http.get(url).toPromise();
	}
	getAllBranchs(){
		const url_api = this.url+'/api/branchs';
		return this.http.get(url_api);
	}
	getAllParts(){
		const url_api =  this.url+'/api/products';
		return this.http.get(url_api);
	}
	search(searchTerm: any): Observable<any> {
		const url_api = this.url + `/api/cars?filter[where][name][regex]=${searchTerm}`;
		return this.http.get(url_api);
	  }
	getAllCars(){
		const url_api =  this.url+'/api/cars';
		return this.http.get(url_api);
	}
	
	getAllCategories(){
		const url_api =  this.url+'/api/cards';
		return this.http.get(url_api);
	}
	getAllTransactions(){
		const url_api =  this.url+'/api/transactions';
		return this.http.get(url_api);
	}
	getAllMembers(){
		const url_api =  this.url+'/api/cards';
		return this.http.get(url_api);
	}
	updateSpecialty(specialty :SpecialtyInterface, id: string){
		const url_api=`${this.url}/api/branchs/${id}`;
		return this.http
		.put<SpecialtyInterface>(url_api, specialty)
		.pipe(map(data => data));
	}

	saveOrder(order :OrderInterface){
		const url_api=`${this.url}/api/orders`;
		return this.http
		.post<OrderInterface>(url_api, order)
		.pipe(map(data => data));
	}
	saveChat(chat :ChatInterface){
		const url_api=`${this.url}/api/chats`;
		return this.http
		.post<ChatInterface>(url_api, chat)
		.pipe(map(data => data));
	}
	saveMessage(message :MessageInterface){
		const url_api=`${this.url}/api/messages`;
		return this.http
		.post<MessageInterface>(url_api, message)
		.pipe(map(data => data));
	}

	deleteSpecialty( id: string){
		const url_api=`${this.url}/api/branchs/${id}`;
		return this.http
		.delete<SpecialtyInterface>(url_api)
		.pipe(map(data => data));
	}
	deleteService(id: string){
		// let token = this.authService.getToken();
		const url_api=`${this.url}/api/cards/${id}`;
		return this.http
		.delete<ServiceInterface>(url_api)
		.pipe(map(data => data));
	}
	deleteStylist(id: string){
		const url_api=`${this.url}/api/members/${id}`;
		return this.http
		.delete<StylistInterface>(url_api)
		.pipe(map(data => data));
	}
	getProduct(id: string){
		const url_api = `${this.url}/api/products/${id}`;
		return this.http.get(url_api);
	}

	getCierresByBranch(branch: string){
		const url_api = `${this.url}/api/infos?filter[where][idBranch]=${branch}`;
		this.cierre = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}

	getCardByUserId(userId: string){
		const url_api = `${this.url}/api/cards?filter[where][userId]=${userId}`;
		this.cards = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}
	getCustomerByUserId(userId: string){
		const url_api = `${this.url}/api/customers?filter[where][userd]=${userId}`;
		// this.customers = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}
	getSerialT(branch: string){
		const url_api = `${this.url}/api/branchs/${branch}`;
		this.branch = this.http.get(url_api);
		this.butler.serialT=this.branch.serialT;
		return ( this.branch);		
	}
	setSerialT(serial:SerialInterface, branch: string){
		// let token = this.authService.getToken();
		const url_api = `${this.url}/api/branchs/${branch}`;
		return this.http
		.put<SerialInterface>(url_api, serial)
		.pipe(map(data => data));
	}

	saveTicket(ticket :TicketInterface){
		const url_api=`${this.url}/api/transactions`;
		return this.http
		.post<TicketInterface>(url_api, ticket)
		.pipe(map(data => data));
	}
	saveService(service :ServiceInterface){
		const url_api=`${this.url}/api/cards`;
		return this.http
		.post<ServiceInterface>(url_api, service)
		.pipe(map(data => data));
	}
	
	saveSpecialty(specialty :SpecialtyInterface){
		const url_api=`${this.url}/api/branchs`;
		return this.http
		.post<SpecialtyInterface>(url_api, specialty)
		.pipe(map(data => data));
	}
	saveStylist(stylist :StylistInterface){
		const url_api=`${this.url}/api/members`;
		return this.http
		.post<StylistInterface>(url_api, stylist)
		.pipe(map(data => data));
	}

	getOrdersByUserId(userd: string){
		const url_api = `${this.url}/api/orders?filter[where][userd]=${userd}`;
		return ( this.http.get(url_api));		
	}
}