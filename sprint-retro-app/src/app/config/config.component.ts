import { Component, OnInit } from '@angular/core';
import { BrowserStorageServiceService } from '../storage/browser-storage-service.service';

@Component({
  selector: 'mle-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private browserStorageServiceService: BrowserStorageServiceService) {

  }

  ngOnInit(): void {
  }

  resetLocalData() {
    this.browserStorageServiceService.removeLocal();
  }
}
