import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {InviteService, User} from '../service/invite.service';
import { StoreService } from '../service/store.service';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' }
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  loading$ = new BehaviorSubject(false);
  
  constructor(
    private readonly inviteService: InviteService,
    private readonly storeService: StoreService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.storeService.clear();
  }

  onSubmit(): void {
    const services: Observable<any>[] = [];
    this.loading$.next(true);
    users.forEach(user => {
      services.push(this.inviteService.invite(user).pipe(
        catchError((err) =>  of({email: user.email, error: err})),
      ))
    })
    zip(...services).subscribe(res => {
      this.storeService.save(res);
      this.loading$.next(false);
      this.router.navigate(['/']);
    });
  }
}
