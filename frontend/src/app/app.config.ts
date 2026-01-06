import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsIntreceptor } from './core/intreceptors/credentials.intreceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([credentialsIntreceptor])),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideClientHydration(withEventReplay()),
  ],
};
