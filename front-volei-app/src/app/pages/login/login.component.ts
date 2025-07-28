import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  erro = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['kaito.mendonca@gmail.com', [Validators.required, Validators.email]],
      senha: ['zelda917', Validators.required],
    });
  }

  public async login() {
    if (this.form.invalid) return;
    const request = { email: this.form.value.email, senha: this.form.value.senha};

    try {
        const response = await this.auth.login(request);     
        this.auth.armazenarToken(response.token);        
      if(response) {
        this.router.navigate(['/dashboard'])
      }
    } catch (err: any) {    
      alert(err.message);
      //this.baseService.processError(err);
    } finally {      
      //this.loadingService.hideLoading('getSalesDashboardData');
    }
  }
}
