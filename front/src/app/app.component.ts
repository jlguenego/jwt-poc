import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Secret } from './interfaces/secret';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isConnected = false;

  f = new FormGroup({
    login: new FormControl('jlouis'),
    password: new FormControl('toto'),
  });

  secret: Secret;

  constructor(private http: HttpClient) {}

  submit(): void {
    console.log('submit');
    this.http.post<void>('/ws/login', this.f.value).subscribe({
      next: () => {
        this.isConnected = true;
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });
  }

  getSecret(): void {
    this.http.get<Secret>('/ws/secret').subscribe({
      next: (secret) => {
        console.log('secret: ', secret);
        this.secret = secret;
      },
      error: (err) => {
        console.log('err: ', err);
        this.secret = undefined;
        alert('cannot have the secret');
      },
    });
  }

  logout(): void {
    this.http.post<void>('/ws/logout', undefined).subscribe({
      next: () => {
        this.isConnected = false;
        this.secret = undefined;
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });
  }
}
