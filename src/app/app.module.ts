import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { ThemeModule } from './theme/theme.module';
import { AuthService } from './core/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor } from './core/interceptor/APIInterceptor.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './modules/account/account.module';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { MessageService } from 'primeng/api';
import { ForbiddenComponent } from './core/forbidden/forbidden.component';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { BreadcrumbService } from './core/services/breadcrumb.service';
import { PwaService } from './core/services/pwa.service';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
	},
	{
		path: 'account',
		data: {
			breadcrumb: 'Account',
		},
		canActivate: [AuthGuardGuard],
		loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule),
	},
	{
		path: 'servercontrol',
		data: {
			breadcrumb: 'Server Control',
		},
		canActivate: [AuthGuardGuard],
		loadChildren: () => import('./modules/servercontrol/servercontrol.module').then((m) => m.ServercontrolModule),
	},
	{
		path: 'administration',
		data: {
			breadcrumb: 'Administration',
		},
		canActivate: [AuthGuardGuard],
		loadChildren: () => import('./modules/administration/administration.module').then((m) => m.AdministrationModule),
	},
	{
		path: 'campaigns',
		data: {
			breadcrumb: 'Campaigns',
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
	{
		path: 'community',
		data: {
			breadcrumb: 'Community',
		},
		loadChildren: () => import('./modules/community/community.module').then((m) => m.CommunityModule),
	},
	{ path: '**', redirectTo: 'forbidden' },
	{
		path: 'forbidden',
		data: {
			breadcrumb: 'Forbidden',
		},
		component: ForbiddenComponent,
	},
];
@NgModule({
	declarations: [AppComponent, ForbiddenComponent],
	imports: [
		BrowserModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		RouterModule.forRoot(routes),
		ThemeModule,
		HttpClientModule,
		ReactiveFormsModule,
		AccountModule,
		ReactiveFormsModule,
		DynamicFormsPrimeNGUIModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIInterceptor,
			multi: true,
			deps: [MessageService, Router, ActivatedRoute],
		},
		AuthService,
		MessageService,
		PwaService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(private breadcrumbService: BreadcrumbService, private pwaService: PwaService) {
		this.breadcrumbService.addFriendlyNameForRoute('/', 'Dashboard');
		this.breadcrumbService.addFriendlyNameForRoute('/forbidden', 'Forbidden');
	}
}
