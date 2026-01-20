import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
// Fix: `provideExperimentalZonelessChangeDetection` is deprecated and has been replaced by `provideZonelessChangeDetection`.
import { provideZonelessChangeDetection } from '@angular/core';

import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
