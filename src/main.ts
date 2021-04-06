import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angular/compiler';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { setApiUri } from '@gruppe-adler/maps-frontend-utils';
import { WMTS_BASE_URL } from './app/utils/ApiUtils';

if (environment.production) {
	enableProdMode();
}
setApiUri(WMTS_BASE_URL);
platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
