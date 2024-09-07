import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { routes } from './app.routes';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideHttpClient(),
      provideAnimations(),
      provideRouter(routes),
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
};
