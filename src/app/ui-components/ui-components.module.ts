import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { SquadCardComponent } from './squad-card/squad-card.component';
import { ServerCardComponent } from './server-card/server-card.component';
import { MapComponent } from './map/map.component';
import { WebsocketPanelComponent } from './websocket-panel/websocket-panel.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { Tf47ChatComponent } from './tf47-chat/tf47-chat.component';
import { SlotGroupComponent } from './slot-group/slot-group.component';

@NgModule({
	declarations: [
		SquadCardComponent,
		ServerCardComponent,
		MapComponent,
		WebsocketPanelComponent,
		NotificationPanelComponent,
		Tf47ChatComponent,
		SlotGroupComponent,
	],
	exports: [
		SquadCardComponent,
		ServerCardComponent,
		MapComponent,
		WebsocketPanelComponent,
		NotificationPanelComponent,
		Tf47ChatComponent,
		SlotGroupComponent,
	],
	imports: [CommonModule, UiModule],
})
export class UiComponentsModule {}
