import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Response {
  error?: HttpErrorResponse;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly STORE_KEY = 'STORE';

  constructor() {}

  save(data: Response[]) {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(data));
  }

  load(): undefined | Response[] {
    const response = localStorage.getItem(this.STORE_KEY);
    if (!!response){
      return JSON.parse(response);
    }
    return undefined;
  }

  clear() {
    localStorage.removeItem(this.STORE_KEY);
  }
}
