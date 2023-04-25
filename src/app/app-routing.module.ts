import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CartComponent} from './pages/cart/cart.component';
import {UserRegisterComponent} from './pages/user-register/user-register.component';
import {AddressRegisterComponent} from './pages/address-register/address-register.component';
import {LoginComponent} from "./pages/login/login.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {UserOrdersComponent} from "./pages/user-orders/user-orders.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  {
    path: 'address-register',
    component: AddressRegisterComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    canActivate:[AuthGuard]
  },
  {path:'user-orders',
  component:UserOrdersComponent,
  canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
