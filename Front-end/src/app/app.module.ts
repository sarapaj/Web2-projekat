import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './user-manager/registration/registration.component';
import { LoginComponent } from './user-manager/login/login.component';
import { RouterModule } from '@angular/router';
import { DashRootComponent } from './dashboard/dash-root.component';
import { MrezaLinijaComponent } from './dashboard/korisnik/mreza-linija/mreza-linija.component';
import { RedVoznjeComponent } from './dashboard/korisnik/red-voznje/red-voznje.component';
import { CenovnikComponent } from './dashboard/korisnik/cenovnik/cenovnik.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TrenutnaLokacijaComponent } from './dashboard/korisnik/trenutna-lokacija/trenutna-lokacija.component';
import { ProfilComponent } from './shared/profil/profil.component';
import { MyTableComponent } from './shared/my-table/my-table.component';
import { UrediLinijeComponent } from './dashboard/admin/uredi-linije/uredi-linije.component';
import { UrediStaniceComponent } from './dashboard/admin/uredi-stanice/uredi-stanice.component';
import { MyDropdownComponent } from './shared/my-dropdown/my-dropdown.component';
import { KarteComponent } from './dashboard/kontrolor/karte/karte.component';
import { PutniciComponent } from './dashboard/kontrolor/putnici/putnici.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

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
    TrenutnaLokacijaComponent,
    ProfilComponent,
    MyTableComponent,
    UrediLinijeComponent,
    UrediStaniceComponent,
    MyDropdownComponent  ,
    KarteComponent,
    PutniciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
