import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user-manager/registration/registration.component';
import { LoginComponent } from './user-manager/login/login.component';
import { DashRootComponent } from './dashboard/dash-root.component';
import { RedVoznjeComponent } from './dashboard/korisnik/red-voznje/red-voznje.component';
import { MrezaLinijaComponent } from './dashboard/korisnik/mreza-linija/mreza-linija.component';
import { TrenutnaLokacijaComponent } from './dashboard/korisnik/trenutna-lokacija/trenutna-lokacija.component';
import { CenovnikComponent } from './dashboard/korisnik/cenovnik/cenovnik.component';
import { ProfilComponent } from './shared/profil/profil.component';
import { UrediLinijeComponent } from './dashboard/admin/uredi-linije/uredi-linije.component';
import { UrediStaniceComponent } from './dashboard/admin/uredi-stanice/uredi-stanice.component';
import { KarteComponent } from './dashboard/kontrolor/karte/karte.component';
import { PutniciComponent } from './dashboard/kontrolor/putnici/putnici.component';
import { AuthGuard } from './auth/auth.guard';
import { KupovinaKarteComponent } from './dashboard/korisnik/kupovina-karte/kupovina-karte.component';
import { RoleAdminGuard } from './auth/auth.roleAdmin.guard';
import { RoleControllerGuard } from './auth/auth.roleController.guard';
import { UrediCenovnikComponent } from './dashboard/admin/uredi-cenovnik/uredi-cenovnik.component';

const routes: Routes = [
    {
      path: "",
      redirectTo: "login",
      pathMatch: "full",
      canActivate: [AuthGuard],
    },
    {
      path: "register",
      component: RegistrationComponent
    },
    {
      path: "login",
      component: LoginComponent
    },
    {
      path: "dashboard",
      component: DashRootComponent,
      children: [
        {
          path: "red-voznje",
          component: RedVoznjeComponent
        },
        {
          path: "mreza-linija",
          component: MrezaLinijaComponent
        },
        {
          path: "kupovina-karte",
          component: KupovinaKarteComponent,
          canActivate:[AuthGuard]
        },
        {
          path: "trenutna-lokacija",
          component: TrenutnaLokacijaComponent
        },
        {
          path: "cenovnik",
          component: CenovnikComponent
        },
        {
          path: "profile",
          component: ProfilComponent,
          canActivate:[AuthGuard]
        },
        {
          path: "uredi-linije",
          component: UrediLinijeComponent,
          canActivate: [RoleAdminGuard],
        },
        {
          path: "uredi-stanice",
          component: UrediStaniceComponent,
          canActivate: [RoleAdminGuard],
        },
        {
          path: "uredi-cenovnik",
          component: UrediCenovnikComponent,
          canActivate: [RoleAdminGuard],
        },
        {
          path: "validiraj-karte",
          component: KarteComponent,
          canActivate:[RoleControllerGuard]
        },
        {
          path: "verifikuj-putnike",
          component: PutniciComponent,
          canActivate:[RoleControllerGuard]
        }
      ]
    },
    {
      path: "dashboard/register",
      redirectTo: "register",
      pathMatch: "full"
    },
    {
      path: "dashboard/login",
      redirectTo: "login",
      pathMatch: "full"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
