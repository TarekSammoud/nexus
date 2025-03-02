/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { enableProdMode } from '@angular/core';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVtpR2Nbek5zflFDal9ZVBYiSV9jS3tTdUViWHpadXddQGNYVw==');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));