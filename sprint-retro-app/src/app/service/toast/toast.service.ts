import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {
  }

  successTitle(message: string){
    this.toastr.success(null, message, {positionClass: 'toast-center-center'});
  }

  success(message: string){
    this.toastr.success(message)
  }

  errorTitle(message: string){
    this.toastr.error(null, message, {positionClass: 'toast-center-center'});
  }

  error(message: string){
    this.toastr.error(message)
  }
}
