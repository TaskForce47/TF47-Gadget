import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[galleryresource]',
})
export class GalleryResourceDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
