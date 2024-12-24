import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({ "projectId": "drug-calendar-app", "appId": "1:512383401207:web:37984e4cd5c3278dcce7f2", "storageBucket": "drug-calendar-app.firebasestorage.app", "apiKey": "AIzaSyASNGnDUq8Jvqv1hF7kJNzz2oK-lAu-1uM", "authDomain": "drug-calendar-app.firebaseapp.com", "messagingSenderId": "512383401207" })),
    provideFirestore(() => getFirestore()),
    provideNativeDateAdapter(),]
};
