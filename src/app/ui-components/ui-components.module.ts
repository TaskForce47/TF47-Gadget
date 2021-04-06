import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { SquadCardComponent } from './squad-card/squad-card.component';
import { ServerCardComponent } from './server-card/server-card.component';
import { MapComponent } from './map/map.component';

@NgModule({
	declarations: [SquadCardComponent, ServerCardComponent, MapComponent],
	exports: [SquadCardComponent, ServerCardComponent, MapComponent],
	imports: [CommonModule, UiModule],
})
export class UiComponentsModule {}
