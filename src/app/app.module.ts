import { registerLocaleData } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { CartComponent } from './pages/cart/cart.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import { ProductBoxComponent } from './pages/home/components/prodcut-box/product-box.component';
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { HomeComponent } from './pages/home/home.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { AddressRegisterComponent } from './pages/address-register/address-register.component';
import { AddressService } from './services/address.service';
import { AuthInterceptor } from './services/auth-inteceptor.service';
import {JwtService} from "./services/jwt.service";
import {LoginComponent} from "./pages/login/login.component";
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {RippleModule} from "primeng/ripple";

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    CartItemComponent,
    FooterComponent,
    UserRegisterComponent,
    AddressRegisterComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    BadgeModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    OverlayPanelModule,
    CheckboxModule,
    FormsModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaginatorModule,
    ProgressSpinnerModule,
    InputTextModule,
    RippleModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    CartService,
    MessageService,
    UserService,
    AddressService,
    JwtService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
