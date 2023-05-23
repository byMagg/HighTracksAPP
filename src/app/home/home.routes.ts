import { Routes } from '@angular/router';
import { HomePage } from './home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'tracks',
    loadChildren: () => import('./tracks/tracks.routes').then(m => m.routes)
  },
  {
    path: 'recommendations',
    loadComponent: () => import('./recommendations/recommendations.page').then(m => m.RecommendationsPage)
  },
];