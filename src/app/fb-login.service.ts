import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FbLoginService {

  constructor() { }

    // Load Facebook SDK script dynamically
  loadFbSdk(): Promise<any> {
      return new Promise((resolve, reject) => {
        // Check if FB is already loaded
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          if (typeof FB !== 'undefined') {
            resolve(FB); // If the Facebook SDK is already loaded, resolve immediately
            return;
          }

        // Dynamically add the Facebook SDK script to the document
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=3293835107413984&autoLogAppEvents=1';
        script.async = true;

        // Once the script is loaded, initialize the FB SDK
        script.onload = () => {
          // Initialize the SDK with the app ID and other options
          FB.init({
            appId: '3293835107413984',  // Your Facebook App ID
            cookie: true,
            xfbml: true,  // Parse social plugins on this page
            version: 'v18.0'  // Set the Facebook Graph API version you're using
          });
          resolve(FB);  // Resolve the promise once the SDK is initialized
        };

        // Handle script load error
        script.onerror = (error) => reject('Error loading Facebook SDK: ' + error);

        // Append the script to the body of the document
        document.body.appendChild(script);
      } else {
        reject('Facebook SDK can only be loaded in the browser.');
      }
    });
  }
}