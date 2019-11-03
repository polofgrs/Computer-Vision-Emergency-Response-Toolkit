import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-server-tab',
  templateUrl: './server-tab.component.html',
  styleUrls: ['./server-tab.component.scss']
})
export class ServerTabComponent implements OnInit {

  constructor(private server: ServerService) {
  }

  ngOnInit() {
  }

  sendParameters() {
    this.server.send('testAlgo', 'sourcePath', 'targetPath');
  }

  reset() {
    this.server.reset();
  }

}
