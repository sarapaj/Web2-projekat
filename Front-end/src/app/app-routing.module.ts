import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user-manager/registration/registration.component';
import { LoginComponent } from './user-manager/login/login.component';
import { DashRootComponent } from './dashboard/dash-root.component';
import { EditLinesComponent } from './dashboard/admin/edit-lines/edit-lines.component';
import { EditStationsComponent } from './dashboard/admin/edit-stations/edit-stations.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleAdminGuard } from './auth/auth.roleAdmin.guard';
import { RoleControllerGuard } from './auth/auth.roleController.guard';
import { EditPricelistComponent } from './dashboard/admin/edit-pricelist/edit-pricelist.component';
import { EditTimetableComponent } from './dashboard/admin/edit-timetable/edit-timetable.component';
import { TicketsComponent } from './dashboard/controller/tickets/tickets.component';
import { PassengersComponent } from './dashboard/controller/passengers/passengers.component';
import { CurrentLocationComponent } from './dashboard/user/current-location/current-location.component';
import { PricelistComponent } from './dashboard/user/pricelist/pricelist.component';
import { TicketBuyComponent } from './dashboard/user/ticket-buy/ticket-buy.component';
import { TimetableComponent } from './dashboard/user/timetable/timetable.component';
import { NetworkComponent } from './dashboard/user/network/network.component';
import { ProfileComponent } from './shared/profile/profile.component';

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
          path: "timetable",
          component: TimetableComponent
        },
        {
          path: "network",
          component: NetworkComponent
        },
        {
          path: "ticket-buy",
          component: TicketBuyComponent,
          canActivate:[AuthGuard]
        },
        {
          path: "current-location",
          component: CurrentLocationComponent
        },
        {
          path: "pricelist",
          component: PricelistComponent
        },
        {
          path: "profile",
          component: ProfileComponent,
          canActivate:[AuthGuard]
        },
        {
          path: "edit-lines",
          component: EditLinesComponent,
          canActivate: [RoleAdminGuard],
        },
        {
          path: "edit-timetable",
          component: EditTimetableComponent,
          canActivate: [RoleAdminGuard],
        },
        {
          path: "edit-stations",
          component: EditStationsComponent,
          canActivate: [RoleAdminGuard],
        },
        {
          path: "edit-pricelist",
          component: EditPricelistComponent,
          canActivate: [RoleAdminGuard],
        },
        {
          path: "validate-tickets",
          component: TicketsComponent,
          canActivate:[RoleControllerGuard]
        },
        {
          path: "verify-passengers",
          component: PassengersComponent,
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
