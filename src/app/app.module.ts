import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoundsListComponent } from './components/rounds-list/rounds-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RoundDetailsComponent } from './components/round-details/round-details.component';
import { RoundHandicapChartComponent } from './components/round-handicap-chart/round-handicap-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoundsListComponent,
    WelcomeComponent,
    RoundDetailsComponent,
    RoundHandicapChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
