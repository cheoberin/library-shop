import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {CurrentUserService} from "../../services/current-user.service";
import {Cart, CartItem} from "../../models/cart.model";
import {Router} from "@angular/router";
import {Order, OrderItem} from "../../models/order";
import {UserService} from "../../services/user.service";
import {AddressService} from "../../services/address.service";
import {catchError, forkJoin, tap, throwError} from "rxjs";
import {Address} from "../../models/address.model";
import {OrderService} from "../../services/order.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit{
  order!:Order;
  customerId!:string;
  customerName!:string;
  status!:string;
  phone!:string;
  addresses!:Address[];
  orderItemsList!:[];
  selectedAddressId!: string ;
  cart: Cart = { items:[]};
  creditCard!:FormGroup;

  constructor(private cartService:CartService,
              private formBuilder: NonNullableFormBuilder,
              private currentUser:CurrentUserService,
              private userService:UserService,
              private addressService:AddressService,
              private orderService:OrderService,
              private messageServ: MessageService,
              private router:Router) {}


  ngOnInit(): void {
    this.getCartItems();
    if(!this.cart.items.length){
     this.router.navigate(['cart'])
    }
    this.creditCard = this.formBuilder.group({
        cardNumber:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern('[0-9]*')]],
        expirationMonth:['',[Validators.required]],
        expirationYear:['',[Validators.required]],
        cvv:['',[Validators.required,Validators.minLength(3),Validators.maxLength(4),
        Validators.pattern('[0-9]*')]],
        nameCard:['',[Validators.required]]
    })
    this.getOrderInfos();
  }

  getCartItems(){
    this.cartService.cart.subscribe((_cart:Cart)=>{
      this.cart = _cart;
    })
  }
  getTotal(items :Array<CartItem>):number{
    return this.cartService.getTotal(items);
  }
  onAddressSelected(id: string) {
        this.selectedAddressId = id;
  }

  getOrderInfos() {
    forkJoin([
      this.userService.getUserProfile(this.currentUser.getUserId()),
      this.addressService.findByUserId(this.currentUser.getUserId())
    ]).pipe(tap(([respUser,respAddress]) => {
          this.customerId = this.currentUser.getUserId();
          this.customerName = respUser.name;
          this.status = "CREATED";
          this.phone = respUser.phone;
          this.addresses = respAddress;
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
    ).subscribe();
  }


  private getOrderItemsList() {
    const orderItemsList: OrderItem[] = [];
    this.cart.items.forEach((item) => {
      const orderItem = new OrderItem(item.id, item.name, item.price, item.quantity);
      orderItemsList.push(orderItem);
    });
    return orderItemsList;
  }

  placeOrder(){
    if(this.creditCard.valid) {
        this.order = new Order(this.customerId, this.customerName, this.status, this.phone, this.selectedAddressId, this.getOrderItemsList())
        this.orderService.placeOrder(this.order).subscribe((resp) => {
            this.cartService.clearCart();
            this.messageServ.add({
                severity:`success`,
                summary:`Compra realizada com sucesso!`,
                life:1000
            })
            this.router.navigate(['user-orders']);
        })
    }else{
        this.messageServ.add({
            severity:`error`,
            summary:`Cartão invalido!`,
            life:1000
        })
    }
  }

}



