import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'home',
        loadComponent:()=>import('./components/home/home.component').then(c=>c.HomeComponent)
    },
    {
        path:'detalle/:seleccionado',
        loadComponent:()=>import('./components/detalle/detalle.component').then(c=>c.DetalleComponent)
    },
    
    {
        path:'',
        redirectTo: "/home",
        pathMatch: 'full',
    },

];
