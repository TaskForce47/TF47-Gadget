import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from './theme/theme.module';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor } from './interceptor/APIInterceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';

export function minlengthValidationMessage(err, field) {
	return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
	return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
	return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
	return `This value should be less than ${field.templateOptions.max}`;
}

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'account',
		data: {
			breadcrumb: 'Account',
		},
		loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule),
	},
	{
		path: 'servercontrol',
		data: {
			breadcrumb: 'Server Control',
		},
		loadChildren: () => import('./modules/servercontrol/servercontrol.module').then((m) => m.ServercontrolModule),
	},
	{
		path: 'administration',
		data: {
			breadcrumb: 'Administration',
		},
		loadChildren: () => import('./modules/administration/administration.module').then((m) => m.AdministrationModule),
	},
	{
		path: 'missions',
		data: {
			breadcrumb: 'Missions',
		},
		loadChildren: () => import('./modules/missions/missions.module').then((m) => m.MissionsModule),
	},
	{
		path: 'gallery',
		data: {
			breadcrumb: 'Gallery',
		},
		loadChildren: () => import('./modules/gallery/gallery.module').then((m) => m.GalleryModule),
	},
];
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		RouterModule.forRoot(routes),
		ThemeModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormlyModule.forRoot({
			extras: { lazyRender: true },
			validationMessages: [
				{ name: 'required', message: 'This field is required' },
				{ name: 'minlength', message: minlengthValidationMessage },
				{ name: 'maxlength', message: maxlengthValidationMessage },
				{ name: 'min', message: minValidationMessage },
				{ name: 'max', message: maxValidationMessage },
			],
		}),
		FormlyPrimeNGModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIInterceptor,
			multi: true,
		},
		AuthService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
