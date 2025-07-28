import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // fade in
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [ // fade out
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ])
    ])
  ]
})
export class AppComponent {
  title = 'front-volei-app';  
}
