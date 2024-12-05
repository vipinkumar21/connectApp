import { Component, ElementRef, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Router } from '@angular/router';  // Import Router for navigation


@Component({
  selector: 'app-google-connect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-connect.component.html',
  styleUrl: './google-connect.component.css'
})
export class GoogleConnectComponent implements AfterViewInit {

  @ViewChild('googleButton') googleButtonRef!: ElementRef;

  @Output() loginSuccess = new EventEmitter<any>();
  @Output() loginFailure = new EventEmitter<any>();

  clientId: string = '526785782542-bca5qng39oj34o2r2c16uf6i759os7e8.apps.googleusercontent.com';  // Replace with your Google Client ID

  constructor(
    private router: Router  // Inject the Router into the constructor
  ) {}

  ngAfterViewInit(): void {
    this.renderGoogleButton();
  }

  renderGoogleButton() {
    // Load Google Script if not already loaded
    
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = 'google-jssdk';
      document.body.appendChild(script);
    

    script.onload = () => {
      // After the script loads, initialize the Google login button
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this)
      });
      google.accounts.id.renderButton(
        this.googleButtonRef.nativeElement, 
        { theme: 'outline', size: 'large' }
      );
    };
  }

  handleCredentialResponse(response: any) {
    if (response.credential) {
      console.log('Login successful', response);
      this.loginSuccess.emit(response);
      this.router.navigate(['/home']);  // Redirect to home page if logged in
    } else {
      console.error('Login failed', response);
      this.loginFailure.emit(response);
    }
  }

}
