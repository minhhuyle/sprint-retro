import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../service/storage/browser-storage.service';

@Component({
  selector: 'mle-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})
export class ViewConfigComponent implements OnInit {

  constructor(private browserStorageServiceService: BrowserStorageService) {

  }

  ngOnInit(): void {
  }

  resetLocalData() {
    this.browserStorageServiceService.removeLocal();
  }
}
