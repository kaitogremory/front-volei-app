import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerarTimesComponent } from './pages/gerar-times/gerar-times.component';
import { PlayersComponent } from './pages/players/players.component';
import { ActiveSessionComponent } from './pages/active-session/active-session.component';
import { SessionHistoryComponent } from './pages/session-history/session-history.component';

const routes: Routes = [  
  { path: 'jogadores', component: PlayersComponent },
  { path: 'sessao-ativa', component: ActiveSessionComponent },
  { path: 'sessoes-passadas', component: SessionHistoryComponent },
  { path: 'gerar-times', component: GerarTimesComponent },
  { path: '**', redirectTo: 'jogadores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
