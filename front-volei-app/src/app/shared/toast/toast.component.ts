import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: ToastMessage[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast) => {
      this.toasts.push(toast);

      setTimeout(() => {
        this.removeToastByRef(toast);
      }, toast.duration || 3000);
    });
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }

  private removeToastByRef(toast: ToastMessage) {
    const index = this.toasts.indexOf(toast);
    if (index !== -1) {
      this.removeToast(index);
    }
  }
}
