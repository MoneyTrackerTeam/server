import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { IError } from '../../interfaces';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  public alerts: Array<IAlert> = [];
  constructor(private msgs: MessagesService) {
    msgs.errorOccured$.subscribe((error: IError) => this.addAlert(error));
  }

  ngOnInit() {
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  private addAlert(alert: IAlert) {
    const id = this.alerts.length + 1;
    alert.id = id;
    this.alerts.push(alert);
    setTimeout(() => {
      this.alerts.pop();
    }, 2000);
  }
}
export interface IAlert {
  id?: number;
  severity: string;
  text: string;
}
