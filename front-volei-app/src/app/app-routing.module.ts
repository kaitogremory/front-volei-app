import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './pages/players/players.component';
import { ActiveSessionComponent } from './pages/active-session/active-session.component';
import { GenerateTeamsComponent } from './pages/generate-teams/generate-teams.component';
import { MatchRegisterComponent } from './pages/match-register/match-register.component';

const routes: Routes = [  
  { path: 'jogadores', component: PlayersComponent },
  { path: 'sessao-ativa', component: ActiveSessionComponent },  
  { path: 'gerar-times', component: GenerateTeamsComponent },
  { path: 'partidas', component: MatchRegisterComponent },
  { path: '**', redirectTo: 'jogadores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
