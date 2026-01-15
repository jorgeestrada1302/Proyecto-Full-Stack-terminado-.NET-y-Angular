import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // <--- IMPORTANTE

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() // <--- AGREGAR ESTO
  ]
};
