import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  fechar() {
    this.close.emit();
  }
}
