import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../storage/browser-storage.service';

@Component({
  selector: 'mle-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private browserStorageServiceService: BrowserStorageService) {

  }

  ngOnInit(): void {
  }

  resetLocalData() {
    this.browserStorageServiceService.removeLocal();
  }
}
