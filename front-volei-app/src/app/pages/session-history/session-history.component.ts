import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/interfaces/Session';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.component.html'
})
export class SessionHistoryComponent implements OnInit {
  sessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  async ngOnInit() {
    this.sessions = await this.sessionService.getSessions();
  }
}
