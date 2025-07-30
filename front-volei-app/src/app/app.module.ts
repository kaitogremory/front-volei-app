import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayersComponent } from './pages/players/players.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './shared/modal/modal.component';
import { ToastComponent } from './shared/toast/toast.component';
import { SessionHistoryComponent } from './pages/session-history/session-history.component';
import { ActiveSessionComponent } from './pages/active-session/active-session.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { GenerateTeamsComponent } from './pages/generate-teams/generate-teams.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    ModalComponent,
    ToastComponent,
    SessionHistoryComponent,
    ActiveSessionComponent,
    ConfirmationModalComponent,
    GenerateTeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
