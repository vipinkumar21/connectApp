import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FbLoginComponent } from './fb-login/fb-login.component';
import { GoogleConnectComponent } from './google-connect/google-connect.component';

export const routes: Routes = [
    {
        path: 'home',
        component:HomeComponent
    },
    {
        path:'login',
        component:FbLoginComponent
    },
    {
        path:'',
        component:GoogleConnectComponent
    },
    {
        path:'google',
        component:GoogleConnectComponent
    }

];
