import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cart, CartItem} from "app/models/cart.model"
import {MessageService} from "primeng/api";
 @Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items:[]});
  constructor( private messageServ: MessageService) { }

   addToCart(item:CartItem):void{
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if(itemInCart){
      itemInCart.quantity += 1;
    }else{
      items.push(item)
    }
    this.cart.next({items})

     this.messageServ.add({
       severity:`info`,
       summary:`1 item added to cart.`,
       life:1000
     })
   }

     getTotal(items :Array<CartItem>):number{
         return items.
         map((item) => item.price * item.quantity).
         reduce((prev,current)=> prev + current,0)
     }


     clearCart():void {
      this.cart.next({items:[]});
         this.messageServ.add({
             severity:`warn`,
             summary:`Cart is cleared.`,
             life:1000
         })
     }

     removeFromCart(item:CartItem,update = true):Array<CartItem>{
      const filteredItems = this.cart.value.items.filter(
          (_item) => _item.id !== item.id
      );

      if(update) {
          this.cart.next({items:filteredItems});
          this.messageServ.add({
              severity: `warn`,
              summary: `1 Item removed from cart.`,
              life: 1000
          })
      }

      return filteredItems;
     }


     removeQuantity(item: CartItem) {
       let itemForRemoval:CartItem | undefined

        let filteredItem = this.cart.value.items.map((_item)=>{
             if(_item.id === item.id){
                 _item.quantity--;

               if(_item.quantity === 0){
                  itemForRemoval = _item;
               }

             }
             return _item
         });

       if(itemForRemoval){
          filteredItem = this.removeFromCart(itemForRemoval,false);
       }

       this.cart.next({items: filteredItem});
       this.messageServ.add({
             severity:`warn`,
             summary:`1 Item removed from cart.`,
             life:1000
       })
     }
 }
