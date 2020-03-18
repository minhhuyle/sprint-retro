import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageServiceService {

  constructor() { }

  getSession(key: string): any {
    const data = window.sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  setSession(key: string, value: any): void {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  removeSession(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  removeAllSessions(): void {
    for (const key in window.sessionStorage) {
      if (window.sessionStorage.hasOwnProperty(key)) {
        this.removeSession(key);
      }
    }
  }

  getLocal(): any {
    //todo should refactor
    const data = window.localStorage.getItem("MLE_RETRO");
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  setLocal(value: any): void {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem("MLE_RETRO", data);
  }

  removeLocal(): void {
    window.localStorage.removeItem("MLE_RETRO");
  }
}
