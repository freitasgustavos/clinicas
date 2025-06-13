import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  tap,
  map,
  lastValueFrom,
  catchError,
  of,
} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/token`, credentials).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
        this.router.navigate(['/clinicas']);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }

  checkAuthStatusOnAppInit(): Promise<void> {
    return lastValueFrom(
      this.http.post<User>(`${this.apiUrl}/me`, {}).pipe(
        map((user) => {
          this.currentUserSubject.next(user);
        }),
        catchError(() => {
          this.currentUserSubject.next(null);
          return of(undefined);
        })
      )
    );
  }

  isLoggedIn$(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => !!user));
  }

  isLoggedOut$(): Observable<boolean> {
    return this.isLoggedIn$().pipe(map((loggedIn) => !loggedIn));
  }
}
