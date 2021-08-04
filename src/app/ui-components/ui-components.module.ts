import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { SquadCardComponent } from './squad-card/squad-card.component';
import { ServerCardComponent } from './server-card/server-card.component';
import { MapComponent } from './map/map.component';
import { WebsocketPanelComponent } from './websocket-panel/websocket-panel.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { Tf47ChatComponent } from './tf47-chat/tf47-chat.component';
import { Tf47FormComponent } from './tf47-form/tf47-form.component';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		SquadCardComponent,
		ServerCardComponent,
		MapComponent,
		WebsocketPanelComponent,
		NotificationPanelComponent,
		Tf47ChatComponent,
		Tf47FormComponent,
	],
	exports: [
		SquadCardComponent,
		ServerCardComponent,
		MapComponent,
		WebsocketPanelComponent,
		NotificationPanelComponent,
		Tf47ChatComponent,
		Tf47FormComponent,
	],
	imports: [CommonModule, UiModule, DynamicFormsPrimeNGUIModule, ReactiveFormsModule],
})
export class UiComponentsModule {}
