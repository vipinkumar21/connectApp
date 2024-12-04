import { Component,OnInit } from '@angular/core';
import { FbLoginService } from '../fb-login.service';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Router } from '@angular/router';  // Import Router for navigation


interface FbLoginResponse {
  status: string;  // "connected", "not_authorized", or "unknown"
  authResponse: {
    accessToken: string;
    userID: string;
    expiresIn: number;
  };
}


@Component({
  selector: 'app-fb-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fb-login.component.html',
  styleUrl: './fb-login.component.css'
})
export class FbLoginComponent implements OnInit {

  isLoggedIn = false;  // Track if the user is logged in

  constructor(
    private fbLoginService: FbLoginService,
    private router: Router  // Inject the Router into the constructor
  ) { }

  ngOnInit(): void {
    // Load the Facebook SDK when the component initializes
    this.fbLoginService.loadFbSdk().then(FB => {
      this.checkLoginStatus();
    }).catch(err => {
      console.error('Error loading Facebook SDK', err);
    });
  }

  // Check if the user is logged in to Facebook
  checkLoginStatus(): void {
    FB.getLoginStatus((response: FbLoginResponse) => {  // Specify the response type here
      if (response.status === 'connected') {
        this.isLoggedIn = true;  // Set logged-in status to true
        this.router.navigate(['/home']);  // Redirect to home page if logged in
      } else {
        this.isLoggedIn = false; // Set logged-in status to false
      }
    });
  }

  // Login user to Facebook
  loginWithFacebook(): void {
    FB.login((response: FbLoginResponse) => {  // Specify the response type here
      if (response.authResponse) {
        console.log('Logged in successfully:', response);
        this.isLoggedIn = true;  // Set logged-in status to true after successful login
        this.router.navigate(['/home']);  // Redirect to the home page
      } else {
        this.isLoggedIn = false;  // Set logged-in status to false if login is unsuccessful
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  logout(): void {
    FB.logout((response: any) => {
      this.isLoggedIn = false;  // Update the login status
      this.router.navigate(['/login']);  // Redirect to the home page
    });
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

}
