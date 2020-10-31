import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { SquadCardComponent } from './squad-card/squad-card.component';

@NgModule({
	declarations: [SquadCardComponent],
	exports: [SquadCardComponent],
	imports: [CommonModule, UiModule],
})
export class UiComponentsModule {}
