import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../service/storage/browser-storage.service';

@Component({
  selector: 'mle-config-scene',
  templateUrl: './config-scene.component.html',
  styleUrls: ['./config-scene.component.scss']
})
export class ConfigSceneComponent implements OnInit {

  constructor(private browserStorageServiceService: BrowserStorageService) {

  }

  ngOnInit(): void {
  }

  resetLocalData() {
    this.browserStorageServiceService.removeLocal();
  }
}
