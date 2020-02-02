import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './user-manager/registration/registration.component';
import { LoginComponent } from './user-manager/login/login.component';
import { RouterModule } from '@angular/router';
import { DashRootComponent } from './dashboard/dash-root.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TimetableService } from './services/timetable.service';
import { AuthGuard } from './auth/auth.guard';
import { EditLinesComponent } from './dashboard/admin/edit-lines/edit-lines.component';
import { EditStationsComponent } from './dashboard/admin/edit-stations/edit-stations.component';
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

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashRootComponent,
    SidebarComponent,
    HeaderComponent,
    ProfileComponent, // shared
    NetworkComponent,
    TimetableComponent,
    PricelistComponent,
    CurrentLocationComponent,
    TicketBuyComponent, // passenger
    TicketsComponent,
    PassengersComponent, // controller
    EditPricelistComponent,
    EditTimetableComponent,
    EditLinesComponent,
    EditStationsComponent, // admin
  ],
  imports: [
    BrowserModule,
    ShowHidePasswordModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPayPalModule,
    RouterModule.forRoot([])
  ],
  providers: [
    UserService,
    TimetableService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
