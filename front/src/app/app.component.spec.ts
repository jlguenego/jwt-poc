import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as isConnected 'false'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isConnected).toEqual(false);
  });

  it('should show the secret button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.secret').textContent).toContain(
      'Access to the secret'
    );
  });

  it('should submit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.submit();
    const http = TestBed.inject(HttpTestingController);
    const req = http.expectOne('/ws/login');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    http.verify();
    expect(component.isConnected).toBeTrue();
  });

  it('should submit in error', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.submit();
    const http = TestBed.inject(HttpTestingController);
    const req = http.expectOne('/ws/login');
    expect(req.request.method).toEqual('POST');
    req.flush(null, { status: 500, statusText: 'internal error' });
    http.verify();
    expect(component.isConnected).toBeFalse();
  });
});
