import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './user-manager/registration/registration.component';
import { LoginComponent } from './user-manager/login/login.component';
import { RouterModule } from '@angular/router';
import { DashRootComponent } from './dashboard/dash-root.component';
import { MrezaLinijaComponent } from './dashboard/mreza-linija/mreza-linija.component';
import { RedVoznjeComponent } from './dashboard/red-voznje/red-voznje.component';
import { CenovnikComponent } from './dashboard/cenovnik/cenovnik.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TrenutnaLokacijaComponent } from './dashboard/trenutna-lokacija/trenutna-lokacija.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashRootComponent,
    SidebarComponent,
    HeaderComponent,
    MrezaLinijaComponent,
    RedVoznjeComponent,
    CenovnikComponent,
    TrenutnaLokacijaComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
