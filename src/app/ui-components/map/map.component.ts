import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GradMap } from '@gruppe-adler/maps-frontend-utils/lib/mapbox';
import { Marker as MapboxGLMarker } from 'mapbox-gl';
import { ReplayFrame } from '../../models/Replay';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
	@Input() private worldName!: string;
	@Input() private satShown!: boolean;
	@Input() private gridShown!: boolean;
	@Input() private frame!: ReplayFrame | null;
	@ViewChild('mapRef', { static: true }) mapRef: ElementRef;
	private loading = false;
	private map: GradMap | null = null;
	private errorText = '';
	private errorBtn = true;
	private layers: MapboxGLMarker[] = [];
	constructor() {}

	ngOnInit(): void {
		this.loadMap();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.map) {
			this.map.satShown = this.satShown;
			this.map.gridShown = this.gridShown;
		}
	}
	private async loadMap() {
		this.loading = true;
		this.map = new GradMap(this.worldName, {
			container: this.mapRef.nativeElement as HTMLDivElement,
			loadElevation: false,
			satShown: this.satShown,
			gridShown: this.gridShown,
		});

		this.map.on('grad-load', () => {
			this.loading = false;
		});

		this.map.on('error', (err) => {
			if (this.errorText.length > 0) return;

			this.errorText = 'An error occured while loading the map.';
			this.errorBtn = false;
			console.error(err);
		});

		this.map.on('error:mapnotfound', () => {
			this.errorText = `Couldn't find map with worldname "${this.worldName}"`;
			this.errorBtn = false;
		});
	}
}
