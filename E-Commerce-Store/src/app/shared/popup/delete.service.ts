import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor() { }

  conform(msg: string) {
    const userChoise = window.confirm(msg);

    return Observable.create((observer: any) => {
      observer.next(userChoise);
      observer.complete();
    })
  }
}
