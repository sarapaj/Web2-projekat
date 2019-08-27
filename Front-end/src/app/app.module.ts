import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
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
import { UrediLinijeComponent } from './dashboard/admin/uredi-linije/uredi-linije.component';
import { UrediStaniceComponent } from './dashboard/admin/uredi-stanice/uredi-stanice.component';
import { KarteComponent } from './dashboard/kontrolor/karte/karte.component';
import { PutniciComponent } from './dashboard/kontrolor/putnici/putnici.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RedVoznjeService } from './services/red-voznje.service';
import { AuthGuard } from './auth/auth.guard';
import { KupovinaKarteComponent } from './dashboard/korisnik/kupovina-karte/kupovina-karte.component';
import { UrediCenovnikComponent } from './dashboard/admin/uredi-cenovnik/uredi-cenovnik.component';

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
    UrediLinijeComponent,
    UrediStaniceComponent,
    KarteComponent,
    PutniciComponent,
    KupovinaKarteComponent,
    UrediCenovnikComponent,
  ],
  imports: [
    BrowserModule,
    ShowHidePasswordModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [UserService, RedVoznjeService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
