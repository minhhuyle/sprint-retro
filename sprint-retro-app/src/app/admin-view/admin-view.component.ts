import { Component, OnInit } from '@angular/core';
import { AdminViewService } from './admin-view.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mle-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  isLogged: boolean = false;
  adminForm: FormGroup;


  constructor(private adminViewService: AdminViewService, private formBuilder: FormBuilder) {
    this.adminForm =  this.formBuilder.group({
      "password": ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.adminViewService.connect().subscribe(value => {});
  }

  onAuthentication() {
    this.adminViewService.authentication(this.adminForm.value).subscribe(value => {
      this.isLogged = true;
    })
  }

  reset() {
    this.adminViewService.reset(this.adminForm.value).subscribe(() => {})
  }
}
