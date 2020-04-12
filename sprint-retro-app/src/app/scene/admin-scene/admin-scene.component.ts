import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin/admin.service';

@Component({
  selector: 'mle-admin-scene',
  templateUrl: './admin-scene.component.html',
  styleUrls: ['./admin-scene.component.scss']
})
export class AdminSceneComponent implements OnInit {

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
  }

  resetAllPostIts() {
    this.adminService.resetAllPostIts().subscribe(() => {})
  }

  resetAllVotes() {
    this.adminService.resetAllVotes().subscribe(() => {});
  }
}
