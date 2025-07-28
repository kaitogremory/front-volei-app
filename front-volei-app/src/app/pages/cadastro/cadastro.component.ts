import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  form: FormGroup;
  erro = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      role: ['jogador']
    });
  }

  public async cadastrar() {
    if (this.form.invalid) {
      alert("verifique os campos");
      return;
    }

    const request = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.senha,
      role: this.form.value.role
    };

    try {
      const response = await this.auth.registrar(request);

      if(response) {
        this.router.navigate(['/login'])
        alert("usuario cadastrado com sucesso");
      }
    } catch (err: any) {    
      alert(err.message);
      //this.baseService.processError(err);
    } finally {      
      //this.loadingService.hideLoading('getSalesDashboardData');
    }
  }
}
