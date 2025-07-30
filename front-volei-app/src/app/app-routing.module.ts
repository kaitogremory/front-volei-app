import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './pages/players/players.component';
import { ActiveSessionComponent } from './pages/active-session/active-session.component';
import { SessionHistoryComponent } from './pages/session-history/session-history.component';
import { GenerateTeamsComponent } from './pages/generate-teams/generate-teams.component';

const routes: Routes = [  
  { path: 'jogadores', component: PlayersComponent },
  { path: 'sessao-ativa', component: ActiveSessionComponent },
  { path: 'sessoes-passadas', component: SessionHistoryComponent },
  { path: 'gerar-times', component: GenerateTeamsComponent },
  { path: '**', redirectTo: 'jogadores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
