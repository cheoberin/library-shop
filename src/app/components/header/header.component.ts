import {Component, Input, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";
import {CurrentUserService} from "../../services/current-user.service";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  items!: MenuItem[];
  initials!: string;
  private _cart: Cart = {items:[]};
  itemsQuantity = 0;
  @Input()
  get cart():Cart{
    return this._cart;
  }
  set cart(cart: Cart){
    this._cart = cart;
    this.itemsQuantity = cart.items.
    map((items)=> items.quantity).
    reduce((prev,current)=> prev + current,0);
  }




  constructor(private cartService:CartService,
              public userService:UserService,
              private currentUserService:CurrentUserService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.currentUserService.getInitials().subscribe(initials => {
      this.initials = initials;
    });
    this.items = [
      {
        label: 'Show Profile',
        icon: 'pi pi-external-link',
        command: () => {

        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-times',
        command: () => {
          this.userService.doLogout();
        }
      }
    ];
  }

  isButtonVisible(){
    const hiddenRoutes =['/register','/login'];
    return !hiddenRoutes.includes(this.router.url);
  }

  getTotal(items :Array<CartItem>):number{
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  checkBadge():boolean{
    return this.itemsQuantity === 0;
  }
}
