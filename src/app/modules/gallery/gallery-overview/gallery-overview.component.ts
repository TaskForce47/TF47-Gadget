import { Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild } from '@angular/core';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { GalleryResourceDirective } from '../shared/gallery-resource.directive';
import { GalleryExpandedComponent } from '../shared/gallery-expanded/gallery-expanded.component';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './gallery-overview.component.html',
	styleUrls: ['./gallery-overview.component.scss'],
})
export class GalleryOverviewComponent implements OnInit {
	constructor(
		private formService: DynamicFormService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private http: HttpClient
	) {}
	public chunked = [];
	public rowSize = 12;
	public images;
	public selectedImg;
	public loading: boolean = true;
	@ViewChild(GalleryResourceDirective, { static: true }) galleryResource: GalleryResourceDirective;
	private chunk = (arr, size) =>
		Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
	ngOnInit(): void {
		this.http.get('/GalleryImage/recent').subscribe((res) => {
			this.images = res;
			this.calcRows();
			this.loading = false;
		});
	}
	@HostListener('window:resize', ['$event'])
	onResize() {
		const anchor = document.getElementById('expanded-resource');
		document.body.append(anchor);
		this.galleryResource.viewContainerRef.clear();
		this.calcRows();
	}
	private calcRows() {
		this.rowSize = Math.floor(document.getElementById('galleryContainer').clientWidth / 128);
		this.chunked = this.chunk(this.images, this.rowSize);
	}

	public maxImg(element, imgObj) {
		const anchor = document.getElementById('expanded-resource');
		element.target.parentElement.parentElement.parentElement.append(anchor);
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GalleryExpandedComponent);
		const viewContainerRef = this.galleryResource.viewContainerRef;
		viewContainerRef.clear();
		if (imgObj !== this.selectedImg) {
			this.selectedImg = imgObj;
			const comRef = viewContainerRef.createComponent<GalleryExpandedComponent>(componentFactory);
			comRef.instance.imgObj = imgObj;
		} else {
			this.selectedImg = null;
		}
	}
}
