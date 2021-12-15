import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.css']
})
export class ResponseMessageComponent implements OnInit {
  response = this.storeService.load();
  succeedCounter: undefined | number = undefined;
  errors: string[] = [];
  
  constructor(
    private readonly storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.succeedCounter = this.response?.reduce((counter, entry) =>  {
        if (!entry.error) {
          counter++;
        }
        if (entry.error) {
          this.errors?.push(mapError(entry.email, entry.error));
        }
        return counter;
    }, 0);
  }
}

const mapError = (email:string, error: HttpErrorResponse) => {
  if(error.status === 409) {
    return `${email} already exists.`;
  }
  return `${email} couldn't be saved.`;
}
