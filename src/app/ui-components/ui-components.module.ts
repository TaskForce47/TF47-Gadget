import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { SquadCardComponent } from './squad-card/squad-card.component';
import { ServerCardComponent } from './server-card/server-card.component';
import { MapComponent } from './map/map.component';
import { WebsocketPanelComponent } from './websocket-panel/websocket-panel.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';

@NgModule({
	declarations: [
		SquadCardComponent,
		ServerCardComponent,
		MapComponent,
		WebsocketPanelComponent,
		NotificationPanelComponent,
	],
	exports: [SquadCardComponent, ServerCardComponent, MapComponent, WebsocketPanelComponent, NotificationPanelComponent],
	imports: [CommonModule, UiModule],
})
export class UiComponentsModule {}
