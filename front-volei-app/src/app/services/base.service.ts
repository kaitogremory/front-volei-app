import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private toastService: ToastService) { }

  processError(error: any) {    
    let message = '';
    
    if (error?.error?.erro) {
      message = error.error.erro;
    } else if (error?.error?.error) {
      message = error.error.error;
    } else if (error?.message) {
      message = error.message;
    }
    
    this.toastService.show(message, 'error');
    console.log(error);
      
    return throwError(() => {
      message;
    });
  }
}
