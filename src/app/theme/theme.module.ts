import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GadgetLayoutComponent } from './gadget-layout/gadget-layout.component';
import { UiModule } from '../ui/ui.module';
import { GadgetNavigationComponent } from './gadget-navigation/gadget-navigation.component';
import { GadgetNavigationItemComponent } from './gadget-navigation-item/gadget-navigation-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [GadgetLayoutComponent, GadgetNavigationComponent, GadgetNavigationItemComponent],
	imports: [CommonModule, UiModule, BrowserAnimationsModule],
	exports: [GadgetLayoutComponent],
})
export class ThemeModule {}
