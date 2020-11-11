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
    login: new FormControl(''),
    password: new FormControl(''),
  });

  secret: Secret = {};

  constructor(private http: HttpClient) {}

  submit(): void {
    console.log('submit');
  }

  getSecret(): void {
    this.http.get<Secret>('http://localhost:3000/ws/now').subscribe({
      next: (secret) => {
        console.log('secret: ', secret);
        this.secret = secret;
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });
  }
}
