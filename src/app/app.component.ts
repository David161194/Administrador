import { Component, OnInit } from '@angular/core';
import { MessagingService } from "./shared/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin';

  message;

  constructor(public msg: MessagingService) { }

  ngOnInit() {
    const user = 'user001';
    user
      if (user) {
        this.msg.getPermission(user)
        this.msg.monitorRefresh(user)
        this.msg.receiveMessages()
      }
  }
}

