import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryOverviewComponent } from './gallery-overview/gallery-overview.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { GalleryUploadComponent } from './gallery-upload/gallery-upload.component';
import { GalleryResourceDirective } from './shared/gallery-resource.directive';
import { GalleryExpandedComponent } from './shared/gallery-expanded/gallery-expanded.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
const routes: Routes = [
	{
		path: '',
		redirectTo: 'overview',
	},
	{
		path: 'overview',
		component: GalleryOverviewComponent,
		data: {
			breadcrumb: 'Overview',
		},
	},
	{
		path: 'upload',
		component: GalleryUploadComponent,
		data: {
			breadcrumb: 'Upload File',
		},
	},
];

@NgModule({
	declarations: [GalleryOverviewComponent, GalleryUploadComponent, GalleryResourceDirective, GalleryExpandedComponent],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes), DynamicFormsPrimeNGUIModule, ReactiveFormsModule],
	exports: [RouterModule],
})
export class GalleryModule {
	constructor(private breadcrumbService: BreadcrumbService) {
		this.breadcrumbService.addFriendlyNameForRoute('/gallery', 'Gallery');
		this.breadcrumbService.addFriendlyNameForRoute('/gallery/overview', 'Overview');
		this.breadcrumbService.addFriendlyNameForRoute('/gallery/upload', 'Upload');
	}
}
