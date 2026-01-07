import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { credentialsIntreceptor } from './core/intreceptors/credentials.intreceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './core/routes/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([credentialsIntreceptor]), withFetch()),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideCharts(withDefaultRegisterables()),
    provideClientHydration(withEventReplay()),
  ],
};
