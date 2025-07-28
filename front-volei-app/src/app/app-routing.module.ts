import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IniciarSessaoComponent } from './pages/iniciar-sessao/iniciar-sessao.component';
import { PresencaComponent } from './pages/presenca/presenca.component';
import { GerarTimesComponent } from './pages/gerar-times/gerar-times.component';
import { PlayersComponent } from './pages/players/players.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'cadastro', component: CadastroComponent },
  { path: 'jogadores', component: PlayersComponent },
  { path: 'iniciar-sessao', component: IniciarSessaoComponent },
  { path: 'presenca', component: PresencaComponent },
  { path: 'gerar-times', component: GerarTimesComponent },
  { path: '**', redirectTo: 'jogadores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
