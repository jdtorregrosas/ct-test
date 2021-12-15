import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InviteService, UserWithError } from '../service/invite.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {
  users$: Observable<UserWithError[]>;

  constructor(private inviteService: InviteService, private readonly storeService:StoreService) {
    this.users$ = this.inviteService.get().pipe(map(users => {
      const results = this.storeService.load();
      const usersWithError = users.map(user => {
        const result = results?.find(r=> r.email === user.email);
        return {...user, error: result?.error}
      });
      return usersWithError;
    }));
  }

  ngOnInit(): void {}
}
