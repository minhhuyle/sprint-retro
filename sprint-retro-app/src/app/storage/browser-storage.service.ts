import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BrowserStorage } from './browser-storage.model';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

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

  private getLocal(): BrowserStorage {
    const data = window.localStorage.getItem("MLE_RETRO");
    if (data) {
      const parsedData: BrowserStorage = JSON.parse(data);
      if (!parsedData.dateRecorded) {
        this.removeLocal();
        return null
      }

      const nowDate = moment();
      if (nowDate.diff(parsedData.dateRecorded, 'days') > 0) {
        this.removeLocal();
        return null;
      }

      return parsedData;
    } else {
      return null;
    }
  }

  getPostItsContainer() {
    const browserStorage = this.getLocal();
    if(browserStorage) {
      return browserStorage.postItsContainer;
    }

    return null;
  }

  // todo diff user to delete
  setPostItsContainer(postItsContainer: any) {
    let browserStorage = this.getLocal();

    if(!browserStorage) {
      browserStorage = new BrowserStorage();
    }

    browserStorage.dateRecorded = moment();
    browserStorage.postItsContainer = postItsContainer;
    this.setLocal(browserStorage);
  }

  private setLocal(value: any): void {
    if(value) {
      const data = JSON.stringify(value);
      window.localStorage.setItem("MLE_RETRO", data);
    }
  }

  removeLocal(): void {
    window.localStorage.removeItem("MLE_RETRO");
  }
}
