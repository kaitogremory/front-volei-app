import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();    
  }

  public async listarUsuarios() {    
    try {
        //const response = await this.usuarioService.listar();             
      // if(response) {
      //   this.usuarios = response;
      // }
    } catch (err: any) {    
      alert(err.message);
      //this.baseService.processError(err);
    } finally {      
      //this.loadingService.hideLoading('getSalesDashboardData');
    }
  }
}
