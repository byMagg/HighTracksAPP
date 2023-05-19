import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(),
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  importProvidersFrom(IonicModule.forRoot({})),
  provideRouter(routes),
  importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
  ],
});

defineCustomElements(window); 