import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user-manager/registration/registration.component';
import { LoginComponent } from './user-manager/login/login.component';
import { DashRootComponent } from './dashboard/dash-root.component';
import { RedVoznjeComponent } from './dashboard/red-voznje/red-voznje.component';
import { MrezaLinijaComponent } from './dashboard/mreza-linija/mreza-linija.component';
import { TrenutnaLokacijaComponent } from './dashboard/trenutna-lokacija/trenutna-lokacija.component';
import { CenovnikComponent } from './dashboard/cenovnik/cenovnik.component';

const routes: Routes = [
    {
      path: "",
      redirectTo: "login",
      pathMatch: "full"
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
          path: "trenutna-lokacija",
          component: TrenutnaLokacijaComponent
        },
        {
          path: "cenovnik",
          component: CenovnikComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
