import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./components/header/header.component";
import {ToolbarModule} from "primeng/toolbar";
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {OverlayPanelModule} from "primeng/overlaypanel";
import { HomeComponent } from './pages/home/home.component';
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import { ProductBoxComponent } from './pages/home/components/prodcut-box/product-box.component';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import {CartItemComponent} from "./pages/cart/cart-item/cart-item.component";
import {CartService} from "./services/cart.service";
import {MessageService} from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from './components/footer/footer.component';
registerLocaleData(localePt)
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
    FooterComponent

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
        ToastModule

    ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, CartService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
