import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { AddressRegisterComponent } from './pages/address-register/address-register.component';
import {LoginComponent} from "./pages/login/login.component";

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
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
